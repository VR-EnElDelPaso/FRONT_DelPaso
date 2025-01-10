import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import ImageUpload from "@/shared/components/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { getMuseumTours } from "@/services/Museums";
import { Tour } from "@/shared/types/Tour";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  address_name: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres"),
  main_tour_id: z.string().uuid().optional().nullable(),
  main_photo: z.string(),
});

interface MuseumFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  initialValues?: {
    id?: string;
    name: string;
    description: string;
    address_name: string;
    main_photo: string;
    main_tour_id?: string | null;
    created_at?: string;
    updated_at?: string;
  };
}
const MuseumForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: MuseumFormProps) => {
  const [museumTours, setMuseumTours] = useState<Tour[]>([]);

  // ---- Form ----
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      address_name: initialValues?.address_name || "",
      main_tour_id: initialValues?.main_tour_id || null,
      main_photo: initialValues?.main_photo || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  // ---- fetch museum tours ----
  const fetchMuseumTours = useCallback(async () => {
    if (!initialValues?.id) return;
    try {
      const tours = await getMuseumTours(initialValues.id);
      setMuseumTours(tours.data);
    } catch (error) {
      console.error(error);
      setMuseumTours([]);
    }
  }, [initialValues?.id]);

  useEffect(() => {
    fetchMuseumTours();
  }, [fetchMuseumTours]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px p-6] font-inter"
        aria-describedby="dialog-description"
      >
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {initialValues ? "Editar museo" : "Crear nuevo museo"}
          </DialogTitle>
          <DialogDescription
            className="text-base text-gray-500"
            id="dialog-description"
          >
            {initialValues
              ? "Edite la información del museo seleccionado"
              : "Complete los campos para agregar un nuevo museo al sistema."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del museo" {...field} />
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
                      placeholder="Descripción del museo"
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
              name="address_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección del museo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {initialValues && (
              <FormField
                control={form.control}
                name="main_tour_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recorrido Principal</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      disabled={!museumTours.length}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              !museumTours.length
                                ? "No hay recorridos disponibles"
                                : "Seleccione un recorrido"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {museumTours.map((tour) => (
                          <SelectItem key={tour.id} value={tour.id}>
                            {tour.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {!museumTours.length && (
                      <FormDescription>
                        <Link
                          to="/admin/tours"
                          className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                        >
                          Agregar recorridos
                          <SquareArrowOutUpRight size="10px" />
                        </Link>
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="main_photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto del museo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      onClear={() => field.onChange("")}
                      error={!!form.formState.errors.main_photo}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="text-white">
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MuseumForm;
