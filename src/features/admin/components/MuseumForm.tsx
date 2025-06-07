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
import { CustomSelect } from "@/shared/components/CustomSelect";

import ImageUpload from "@/shared/components/ImageUpload";
import HoursDialog from "./HoursDialog";

// Services
import { getMuseumTours } from "@/services/Museums";
import { uploadImage } from "@/services/upload";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Types
import { Tour } from "@/shared/types/Tour";
import { MuseumHours } from "@/shared/types/museums.types";

// Validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  address_name: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres"),
  latitude: z
    .union([
      z.literal("").transform(() => undefined),
      z.coerce
        .number()
        .min(-90, "La latitud debe estar entre -90 y 90")
        .max(90, "La latitud debe estar entre -90 y 90"),
    ])
    .optional(),
  longitude: z
    .union([
      z.literal("").transform(() => undefined),
      z.coerce
        .number()
        .min(-180, "La longitud debe estar entre -180 y 180")
        .max(180, "La longitud debe estar entre -180 y 180"),
    ])
    .optional(),
  main_tour_id: z.string().uuid().optional().nullable(),
  main_photo: z.string().min(1, "La imagen es requerida"),
});

type FormValues = z.infer<typeof formSchema>;

const defaultHours: MuseumHours[] = [
  { day: "SUNDAY", isOpen: false },
  { day: "MONDAY", isOpen: false },
  { day: "TUESDAY", isOpen: false },
  { day: "WEDNESDAY", isOpen: false },
  { day: "THURSDAY", isOpen: false },
  { day: "FRIDAY", isOpen: false },
  { day: "SATURDAY", isOpen: false },
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
    latitude?: number;
    longitude?: number;
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
  const [currentEditingDay, setCurrentEditingDay] = useState<string | null>(
    null
  );
  const [museumHours, setMuseumHours] = useState<MuseumHours[]>(
    initialValues?.hours && initialValues.hours.length > 0
      ? initialValues.hours
      : defaultHours
  );
  const [hoursErrors, setHoursErrors] = useState<string[]>([]);

  // Hooks
  const { toast } = useToast();

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      address_name: initialValues?.address_name || "",
      latitude: initialValues?.latitude || undefined,
      longitude: initialValues?.longitude || undefined,
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

  // Función que verifica si hay al menos un día con horario configurado
  const hasConfiguredHours = () => {
    return museumHours.some((hour) => hour.isOpen);
  };

  // Validar los horarios
  const validateHours = (): boolean => {
    const errors: string[] = [];

    // Verificar cada día abierto
    museumHours.forEach((hour) => {
      if (hour.isOpen) {
        const dayName =
          hour.day === "SUNDAY"
            ? "Domingo"
            : hour.day === "MONDAY"
            ? "Lunes"
            : hour.day === "TUESDAY"
            ? "Martes"
            : hour.day === "WEDNESDAY"
            ? "Miércoles"
            : hour.day === "THURSDAY"
            ? "Jueves"
            : hour.day === "FRIDAY"
            ? "Viernes"
            : hour.day === "SATURDAY"
            ? "Sábado"
            : hour.day;

        // Si no es 24h (que estaría representado por openTime y closeTime undefined o vacíos)
        const is24Hours =
          (!hour.openTime && !hour.closeTime) ||
          (hour.openTime === "" && hour.closeTime === "") ||
          (hour.openTime === "00:00" && hour.closeTime === "23:59");

        if (!is24Hours) {
          // Verificar que tenga hora de apertura
          if (!hour.openTime || hour.openTime === "") {
            errors.push(`${dayName}: Falta la hora de apertura`);
          }

          // Verificar que tenga hora de cierre
          if (!hour.closeTime || hour.closeTime === "") {
            errors.push(`${dayName}: Falta la hora de cierre`);
          }

          // Si tiene ambos valores, verificar que cierre sea posterior a apertura
          if (hour.openTime && hour.closeTime) {
            const openMinutes =
              parseInt(hour.openTime.split(":")[0]) * 60 +
              parseInt(hour.openTime.split(":")[1]);
            const closeMinutes =
              parseInt(hour.closeTime.split(":")[0]) * 60 +
              parseInt(hour.closeTime.split(":")[1]);

            if (openMinutes >= closeMinutes) {
              errors.push(
                `${dayName}: La hora de cierre debe ser posterior a la de apertura`
              );
            }
          }
        }
      }
    });

    setHoursErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (values: FormValues) => {
    // Validar horarios si hay al menos un día configurado
    if (hasConfiguredHours() && !validateHours()) {
      toast({
        title: "Error de validación",
        description:
          "Hay errores en los horarios del museo. Por favor, revise los campos marcados.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      let finalImageUrl = values.main_photo;

      // Si la imagen es nueva (formato data:image), subirla
      if (values.main_photo.startsWith("data:image")) {
        const response = await uploadImage(values.main_photo);
        if (!response.ok || !response.data?.url) {
          throw new Error("Error al subir la imagen");
        }
        finalImageUrl = response.data.url;
      }

      // Asegurarse de que los horarios estén correctamente formateados
      const formattedHours = museumHours.map((hour) => ({
        ...hour,
        // Si es 24 horas o cerrado, establecer valores adecuados
        openTime: hour.isOpen ? hour.openTime || "00:00" : null,
        closeTime: hour.isOpen ? hour.closeTime || "23:59" : null,
      }));

      console.log("Horarios formateados antes de enviar:", formattedHours);

      // Crear el objeto con todos los datos
      const formattedValues = {
        ...values,
        main_photo: finalImageUrl,
        hours: formattedHours, // Siempre incluir hours
      };

      console.log("Enviando al servidor:", formattedValues);

      await onSubmit(formattedValues);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
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

            {/* Campos de ubicación: latitud y longitud */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitud</FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Valor entre -90 y 90
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="Ej. 19.4326"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitud</FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Valor entre -180 y 180
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="Ej. -99.1332"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {initialValues && (
              <FormField
                control={form.control}
                name="main_tour_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recorrido Principal</FormLabel>
                    <FormControl>
                      <CustomSelect
                        value={field.value || ""}
                        onChange={field.onChange}
                        options={museumTours} // Pasar directamente los tours como options
                        placeholder={
                          !museumTours.length
                            ? "No hay recorridos disponibles"
                            : "Seleccione un recorrido"
                        }
                        error={!!form.formState.errors.main_tour_id}
                      />
                    </FormControl>
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
              <div className="flex justify-between items-center">
                <FormLabel>Horarios</FormLabel>
                {hoursErrors.length > 0 && (
                  <p className="text-xs text-destructive">
                    Hay errores en los horarios
                  </p>
                )}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                Configura los horarios del museo. Si todos están cerrados, se
                creará el museo sin horarios.
              </div>

              {/* Mostrar errores de horarios */}
              {hoursErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    Por favor, corrija los siguientes errores:
                  </p>
                  <ul className="text-xs text-red-700 list-disc pl-5 space-y-1">
                    {hoursErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border divide-y rounded-md">
                {museumHours.map((hour) => {
                  const dayName =
                    hour.day === "SUNDAY"
                      ? "Domingo"
                      : hour.day === "MONDAY"
                      ? "Lunes"
                      : hour.day === "TUESDAY"
                      ? "Martes"
                      : hour.day === "WEDNESDAY"
                      ? "Miércoles"
                      : hour.day === "THURSDAY"
                      ? "Jueves"
                      : hour.day === "FRIDAY"
                      ? "Viernes"
                      : hour.day === "SATURDAY"
                      ? "Sábado"
                      : hour.day;

                  // Verificar si este día tiene errores
                  const hasError = hoursErrors.some((error) =>
                    error.startsWith(dayName)
                  );

                  return (
                    <div
                      key={hour.day}
                      className={`flex items-center justify-between p-3 hover:bg-gray-50 ${
                        hasError ? "bg-red-50" : ""
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          hasError ? "text-red-700" : "text-gray-700"
                        }`}
                      >
                        {dayName}
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className={
                            hasError ? "text-red-600" : "text-gray-600"
                          }
                        >
                          {hour.isOpen
                            ? hour.openTime &&
                              hour.closeTime &&
                              (hour.openTime !== "00:00" ||
                                hour.closeTime !== "23:59")
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
                          <Pencil
                            className={`w-4 h-4 ${
                              hasError ? "text-red-500" : "text-gray-500"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  );
                })}
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
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-gray-700"
                  onClick={() => {
                    setHoursDialogOpen(true);
                    setCurrentEditingDay("weekend");
                  }}
                >
                  Editar sáb-dom
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
            // Validar horarios después de actualizarlos
            setTimeout(() => validateHours(), 0);
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
