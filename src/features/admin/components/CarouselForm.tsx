import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Check, X, RefreshCw } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

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
import { Card, CardContent } from "@/components/ui/card";
import ImageUpload from "@/shared/components/ImageUpload";

// Services
import { uploadImage } from "@/services/upload";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Types
import { Carousel, CarouselFormData } from "@/shared/types/Carousel";

const slideSchema = z.object({
  index: z.number(),
  image_url: z.string().min(1, "La imagen es requerida"),
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
});

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  slides: z.array(slideSchema).min(1, "Debe haber al menos un slide"),
});

type FormValues = z.infer<typeof formSchema>;

interface CarouselFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CarouselFormData) => void;
  initialValues?: Carousel;
}

const CarouselForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: CarouselFormProps) => {
  // Estados
  const [slideConfirmingDelete, setSlideConfirmingDelete] = useState<
    number | null
  >(null);
  const lastSlideRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const initialSlidesCount = useRef(initialValues?.slides.length || 1);

  // Hooks
  const { toast } = useToast();

  // Formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      slides: initialValues?.slides.map((slide) => ({
        index: slide.index,
        image_url: slide.image_url,
        title: slide.title,
        description: slide.description,
      })) || [{ index: 0, image_url: "", title: "", description: "" }],
    },
  });

  // Field array para manejar múltiples slides
  const { fields, append, remove } = useFieldArray({
    name: "slides",
    control: form.control,
  });

  // Efecto para desplazarse al último slide cuando se añade uno nuevo
  useEffect(() => {
    if (lastSlideRef.current && fields.length > initialSlidesCount.current) {
      // Esperar un momento para que el DOM se actualice
      setTimeout(() => {
        lastSlideRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [fields.length]);

  // Manejar cierre del formulario
  const handleDialogClose = () => {
    // Restaurar valores iniciales
    form.reset({
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      slides: initialValues?.slides.map((slide) => ({
        index: slide.index,
        image_url: slide.image_url,
        title: slide.title,
        description: slide.description,
      })) || [{ index: 0, image_url: "", title: "", description: "" }],
    });

    // Cerrar el diálogo
    onClose();
  };

  // Mutación para subir imágenes
  const uploadMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      // Procesar cada slide para subir imágenes si es necesario
      const processedSlides = await Promise.all(
        values.slides.map(async (slide, index) => {
          let finalImageUrl = slide.image_url;

          // Si la imagen es una base64, subirla al servidor
          if (slide.image_url.startsWith("data:image")) {
            const response = await uploadImage(slide.image_url);
            if (!response.ok || !response.data?.url) {
              throw new Error(
                `Error al subir la imagen del slide ${index + 1}`
              );
            }
            finalImageUrl = response.data.url;
          }

          return {
            ...slide,
            index, // Asegurar que el índice sea correcto
            image_url: finalImageUrl,
          };
        })
      );

      // Retornar datos formateados
      return {
        page_id: initialValues?.page_id || "",
        name: values.name,
        description: values.description,
        slides: processedSlides,
      };
    },
    onSuccess: (formattedValues) => {
      onSubmit(formattedValues);
      onClose();
    },
    onError: (error) => {
      console.error("Error al guardar el carrusel:", error);
      toast({
        title: "Error al guardar",
        description:
          "Ocurrió un error al guardar los cambios. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    },
  });

  // Manejar solicitud de eliminación
  const handleDeleteRequest = (index: number) => {
    // Si solo hay un slide, mostrar un mensaje de error
    if (fields.length <= 1) {
      toast({
        title: "Error",
        description: "Debe haber al menos un slide en el carrusel",
        variant: "destructive",
      });
      return;
    }

    // Activar la confirmación para este slide
    setSlideConfirmingDelete(index);
  };

  // Confirmar eliminación
  const confirmDelete = (index: number) => {
    remove(index);
    setSlideConfirmingDelete(null);
  };

  // Cancelar eliminación
  const cancelDelete = () => {
    setSlideConfirmingDelete(null);
  };

  // Añadir nuevo slide
  const handleAddSlide = () => {
    append({
      index: fields.length,
      image_url: "",
      title: "",
      description: "",
    });
  };

  const handleSubmit = (values: FormValues) => {
    if (values.slides.length === 0) {
      toast({
        title: "Error",
        description: "Debe haber al menos un slide",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent
        ref={dialogRef}
        className="max-h-[90vh] overflow-y-auto w-full max-w-2xl p-4 md:p-6"
      >
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            Editar Carrusel Principal
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Modifique la información del carrusel principal y sus slides.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="py-4 space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Carrusel</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Carrusel Principal" {...field} />
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
                        placeholder="Breve descripción del carrusel"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Slides</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSlide}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir Slide
                </Button>
              </div>
              <FormDescription>
                Los slides se mostrarán en el carrusel de la página principal.
                Debe haber al menos uno.
              </FormDescription>

              {fields.length === 0 && (
                <p className="text-sm text-red-500">
                  Debe añadir al menos un slide.
                </p>
              )}

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card
                    key={field.id}
                    className="overflow-hidden relative"
                    ref={index === fields.length - 1 ? lastSlideRef : null}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Slide {index + 1}</h3>

                        {slideConfirmingDelete === index ? (
                          <div className="flex items-center space-x-2 bg-red-50 py-1 px-2 rounded-md">
                            <span className="text-xs text-red-600 font-medium">
                              ¿Eliminar?
                            </span>
                            <div className="flex space-x-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => confirmDelete(index)}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={cancelDelete}
                                className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRequest(index)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`slides.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Título</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Título del slide"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`slides.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descripción</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Descripción breve del slide"
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
                          name={`slides.${index}.image_url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Imagen</FormLabel>
                              <FormControl>
                                <ImageUpload
                                  value={field.value}
                                  onChange={field.onChange}
                                  onClear={() => field.onChange("")}
                                  error={
                                    !!form.formState.errors.slides?.[index]
                                      ?.image_url
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Este campo es oculto, solo para mantener el índice */}
                        <input
                          type="hidden"
                          {...form.register(`slides.${index}.index`)}
                          value={index}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
                disabled={uploadMutation.isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="text-white"
                disabled={uploadMutation.isPending}
              >
                {uploadMutation.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CarouselForm;
