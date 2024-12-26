import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { DialogDescription } from "@radix-ui/react-dialog";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  address_name: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  main_photo: z.string(),
})

interface MuseumFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
  initialValues?: {
    id?: string
    name: string
    description: string
    address_name: string
    main_photo: string
    main_tour_id?: string | null
    created_at?: string
    updated_at?: string
  }
}
const MuseumForm = ({ isOpen, onClose, onSubmit, initialValues }: MuseumFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ? {
      name: initialValues.name,
      description: initialValues.description,
      address_name: initialValues.address_name,
      main_photo: initialValues.main_photo,
    } : {
      name: "",
      description: "",
      address_name: "",
      main_photo: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px p-6]" aria-describedby="dialog-description">
        <DialogHeader className="space-y-3 pb-4 border-b">
        <DialogTitle className="text-2xl font-semibold tracking-tight">
          {initialValues ? 'Editar museo' : 'Crear nuevo museo'}
        </DialogTitle>
          <DialogDescription className="text-base text-gray-500" id="dialog-description">
            {initialValues ? 'Edite la información del museo seleccionado' : 'Complete los campos para agregar un nuevo museo al sistema.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

            <FormField
              control={form.control}
              name="main_photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto del museo</FormLabel>
                  <FormControl>
                    <Input placeholder="URL de la foto principal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="text-white">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default MuseumForm