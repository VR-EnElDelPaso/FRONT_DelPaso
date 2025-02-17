// src/features/admin/components/MuseumForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Pencil, SquareArrowOutUpRight } from "lucide-react";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/shared/components/ImageUpload";
import HoursDialog from "./HoursDialog";

// Services
import { getMuseumTours } from "@/services/Museums";
import { uploadImage } from "@/services/upload";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Types
import { Tour } from "@/shared/types/Tour";
import { MuseumHours } from "@/types/Museums";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  address_name: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres"),
  main_tour_id: z.string().uuid().optional().nullable(),
  main_photo: z.string().min(1, "La imagen es requerida"),
});

type FormValues = z.infer<typeof formSchema>;

const defaultHours: MuseumHours[] = [
  { day: "Domingo", isOpen: false },
  { day: "Lunes", isOpen: false },
  { day: "Martes", isOpen: false },
  { day: "Miércoles", isOpen: false },
  { day: "Jueves", isOpen: false },
  { day: "Viernes", isOpen: false },
  { day: "Sábado", isOpen: false },
];

interface MuseumFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues & { hours?: MuseumHours[] }) => void;
  initialValues?: {
    id?: string;
    name: string;
    description: string;
    address_name: string;
    main_photo: string;
    main_tour_id?: string | null;
    hours?: MuseumHours[];
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
  // States
  const [museumTours, setMuseumTours] = useState<Tour[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [hoursDialogOpen, setHoursDialogOpen] = useState(false);
  const [currentEditingDay, setCurrentEditingDay] = useState<string | null>(null);
  const [museumHours, setMuseumHours] = useState<MuseumHours[]>(
    initialValues?.hours || defaultHours
  );

  // Hooks
  const { toast } = useToast();

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      address_name: initialValues?.address_name || "",
      main_tour_id: initialValues?.main_tour_id || null,
      main_photo: initialValues?.main_photo || "",
    },
  });

  const fetchMuseumTours = useCallback(async () => {
    if (!initialValues?.id) return;
    try {
      const response = await getMuseumTours(initialValues.id);
      if (response.ok) {
        setMuseumTours(response.data);
      }
    } catch (error) {
      console.error("Error fetching museum tours:", error);
      setMuseumTours([]);
    }
  }, [initialValues?.id]);

  useEffect(() => {
    fetchMuseumTours();
  }, [fetchMuseumTours]);

  const handleSubmit = async (values: FormValues) => {
    setIsUploading(true);

    try {
      let finalImageUrl = values.main_photo;
      if (values.main_photo.startsWith("data:image")) {
        const response = await uploadImage(values.main_photo);
        if (!response.ok || !response.data?.url) {
          throw new Error("Error al subir la imagen");
        }
        finalImageUrl = response.data.url;
      }

      const formattedValues = {
        ...values,
        main_photo: finalImageUrl,
        hours: museumHours,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-2xl p-4 md:p-6">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {initialValues ? "Editar museo" : "Crear nuevo museo"}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            {initialValues
              ? "Edite la información del museo seleccionado"
              : "Complete los campos para agregar un nuevo museo al sistema."}
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="py-4 space-y-4"
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
                          className="flex items-center gap-1 text-blue-500 underline hover:text-blue-700"
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

            {/* Horarios */}
            <div className="space-y-4">
              <FormLabel>Horarios</FormLabel>

              <div className="border divide-y rounded-md">
                {museumHours.map((hour) => (
                  <div
                    key={hour.day}
                    className="flex items-center justify-between p-3 hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-700">{hour.day}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">
                        {hour.isOpen
                          ? hour.openTime && hour.closeTime
                            ? `${hour.openTime} - ${hour.closeTime}`
                            : "Abierto 24h"
                          : "Cerrado"}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => {
                          setHoursDialogOpen(true);
                          setCurrentEditingDay(hour.day);
                        }}
                      >
                        <Pencil className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-gray-700"
                  onClick={() => {
                    setHoursDialogOpen(true);
                    setCurrentEditingDay("all");
                  }}
                >
                  Editar todos los horarios
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-gray-700"
                  onClick={() => {
                    setHoursDialogOpen(true);
                    setCurrentEditingDay("weekdays");
                  }}
                >
                  Editar lun–vie
                </Button>
              </div>
            </div>

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

            <DialogFooter className="pt-4">
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

        <HoursDialog
          isOpen={hoursDialogOpen}
          onClose={() => {
            setHoursDialogOpen(false);
            setCurrentEditingDay(null);
          }}
          onSave={(updatedHours) => {
            setMuseumHours((prevHours) =>
              prevHours.map((hour) => {
                const updatedHour = updatedHours.find(
                  (uh) => uh.day === hour.day
                );
                return updatedHour || hour;
              })
            );
            setHoursDialogOpen(false);
            setCurrentEditingDay(null);
          }}
          initialHours={museumHours}
          editingDay={currentEditingDay}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MuseumForm;