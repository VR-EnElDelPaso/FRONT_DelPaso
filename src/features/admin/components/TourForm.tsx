import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
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
import { DialogDescription } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Museum } from "@/types/Museums";
import { getAllMuseums } from "@/services/Museums";
import { ChevronDown } from "lucide-react";
import ImageUpload from "@/shared/components/ImageUpload";

import { FaTags } from "react-icons/fa";
import { TagManager } from "./TagManager";
import { Tag } from "@/types/tag";

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

interface TourFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<z.infer<typeof formSchema>, "tags"> & { tags: string[] }
  ) => void;
  initialValues?: Partial<z.infer<typeof formSchema>>;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Museum[];
  placeholder: string;
  error?: boolean;
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-10 px-3 rounded-md border bg-background text-sm outline-none 
            focus:outline-none focus:ring-2 focus:ring-ring focus:border-input 
            disabled:cursor-not-allowed disabled:opacity-50 appearance-none
            ${error ? "border-destructive" : "border-input"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
    </div>
  );
};

const TourForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: TourFormProps) => {
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [showTagManager, setShowTagManager] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    initialValues?.tags || []
  );

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      price: "",
      stars: 0,
      url: "",
      image_url: "",
      museum_id: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedValues = {
      ...values,
      tags: values.tags.map((tag) => tag.id), // Solo enviamos los IDs
    };

    onSubmit(formattedValues);
    form.reset();
    onClose();
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
              <DialogDescription className="text-base text-gray-500">
                {initialValues
                  ? "Edite la información del tour seleccionado"
                  : "Complete los campos para agregar un nuevo tour al sistema."}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 pt-4"
              >
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

                {showTagManager && (
                  <TagManager
                    isOpen={showTagManager}
                    onClose={() => setShowTagManager(false)}
                    selectedTags={selectedTags}
                    onSave={(tags) => {
                      setSelectedTags(tags);
                      setShowTagManager(false);
                      // Asegúrate de incluir los tags en el formulario
                      form.setValue("tags", tags);
                    }}
                  />
                )}

                <DialogFooter className="pt-6">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="text-white">
                    Guardar
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
