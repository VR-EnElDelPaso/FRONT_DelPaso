import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { FaTags } from "react-icons/fa";

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ImageUpload from "@/shared/components/ImageUpload";
import { TagManager } from "./TagManager";
import { CustomSelect } from "@/shared/components/CustomSelect";

// Services
import { getAllMuseums } from "@/services/Museums";
import { uploadImage } from "@/services/upload";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Types
import { Museum } from "@/types/Museums";
import { Tag } from "@/types/tag";

// Schema
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "El precio debe ser un número válido"),
  stars: z.number().min(0).max(5),
  url: z.string().url("Debe ser una URL válida"),
  image_url: z.string().min(1, "La imagen es requerida"),
  museum_id: z.string().uuid("Debes seleccionar un museo válido"),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface TourFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<FormValues, "tags"> & { tags: string[] }) => void;
  initialValues?: Partial<FormValues>;
}

const TourForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: TourFormProps) => {
  // States
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [showTagManager, setShowTagManager] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    initialValues?.tags || []
  );
  const [isUploading, setIsUploading] = useState(false);

  // Hooks
  const { toast } = useToast();

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      price: initialValues?.price || "",
      stars: initialValues?.stars || 0,
      url: initialValues?.url || "",
      image_url: initialValues?.image_url || "",
      museum_id: initialValues?.museum_id || "",
      tags: initialValues?.tags || [],
    },
  });

  // Effects
  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        const response = await getAllMuseums();
        if (response.ok) {
          setMuseums(response.data);
        }
      } catch (error) {
        console.error("Error fetching museums:", error);
      }
    };

    fetchMuseums();
  }, []);

  // Handlers
  const handleSubmit = async (values: FormValues) => {
    setIsUploading(true);

    try {
      // Si la imagen es base64, súbela a Cloudinary
      let finalImageUrl = values.image_url;
      if (values.image_url.startsWith("data:image")) {
        const response = await uploadImage(values.image_url);
        if (!response.ok || !response.data?.url) {
          throw new Error("Error al subir la imagen");
        }
        finalImageUrl = response.data.url;
      }

      // Envía el formulario con la URL de Cloudinary
      const formattedValues = {
        ...values,
        image_url: finalImageUrl,
        tags: values.tags.map((tag) => tag.id),
      };

      await onSubmit(formattedValues);
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error al guardar",
        description:
          "Ocurrió un error al guardar los cambios. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleTagsSave = (tags: Tag[]) => {
    setSelectedTags(tags);
    setShowTagManager(false);
    form.setValue("tags", tags);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 font-inter">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="space-y-3 pb-4 border-b">
              <DialogTitle className="text-2xl font-semibold tracking-tight">
                {initialValues ? "Editar tour" : "Crear nuevo tour"}
              </DialogTitle>
              <p className="text-base text-gray-500">
                {initialValues
                  ? "Edite la información del tour seleccionado"
                  : "Complete los campos para agregar un nuevo tour al sistema."}
              </p>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 pt-4"
              >
                {/* Museum Select */}
                <FormField
                  control={form.control}
                  name="museum_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Museo</FormLabel>
                      <FormControl>
                        <CustomSelect
                          value={field.value}
                          onChange={field.onChange}
                          options={museums}
                          placeholder="Selecciona un museo"
                          error={!!form.formState.errors.museum_id}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tour Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del tour" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descripción del tour"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="29.99"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* URL */}
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL del tour</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://kuula.co/collection/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags */}
                <FormField
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <Button
                        type="button"
                        onClick={() => setShowTagManager(true)}
                        variant="outline"
                        className="w-full"
                      >
                        <FaTags className="mr-2" />
                        Gestionar Tags ({selectedTags.length})
                      </Button>
                    </FormItem>
                  )}
                />

                {/* Image Upload */}
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagen del tour</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          onClear={() => field.onChange("")}
                          error={!!form.formState.errors.image_url}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tag Manager Dialog */}
                {showTagManager && (
                  <TagManager
                    isOpen={showTagManager}
                    onClose={() => setShowTagManager(false)}
                    selectedTags={selectedTags}
                    onSave={handleTagsSave}
                  />
                )}

                {/* Form Actions */}
                <DialogFooter className="pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isUploading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="text-white"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TourForm;
