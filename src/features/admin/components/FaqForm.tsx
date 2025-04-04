import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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

// Hooks
import { useToast } from "@/hooks/use-toast";

// Types
import { Faq } from "@/types/Faq";

const formSchema = z.object({
  title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

interface FaqFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
  initialValues?: Faq;
}

const FaqForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: FaqFormProps) => {
  // States
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const { toast } = useToast();

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      await onSubmit(values);
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
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-2xl p-4 md:p-6">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {initialValues
              ? "Editar pregunta frecuente"
              : "Crear nueva pregunta frecuente"}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            {initialValues
              ? "Edite la información de la pregunta frecuente seleccionada"
              : "Complete los campos para agregar una nueva pregunta frecuente al sistema."}
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="py-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título / Pregunta</FormLabel>
                  <FormControl>
                    <Input placeholder="¿Cómo puedo...?" {...field} />
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
                  <FormLabel>Descripción / Respuesta</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Respuesta detallada a la pregunta..."
                      className="min-h-[150px] resize-none"
                      {...field}
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
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
      </DialogContent>
    </Dialog>
  );
};

export default FaqForm;
