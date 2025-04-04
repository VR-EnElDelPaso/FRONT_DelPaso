import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/DataTable";
import { Faq } from "@/types/Faq";
import { createFaq, updateFaq, deleteFaq } from "@/services/Faqs";
import { useToast } from "@/hooks/use-toast";
import FaqForm from "@/features/admin/components/FaqForm";
import { useFetchFaqs } from "@/features/admin/queries/useFaqsQuery";
import Loader from "@/shared/components/Loader";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";

const columns: ColumnDef<Faq>[] = [
  {
    accessorKey: "title",
    header: "Pregunta",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <div className="font-medium text-blue-600">{title}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Respuesta",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      // Mostrar el texto completo de la descripción
      return <div className="text-gray-600">{description}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Fecha de creación",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string;
      // Combinar el formateador de fecha y el de hora
      return (
        <div className="text-gray-600">
          {dateFormatter(date)} a las {timeFormatter(date)}
        </div>
      );
    },
  },
];

const AdminFaqs = () => {
  // ----------- Hooks -----------
  const { data: faqs, isFetching, refetch } = useFetchFaqs();
  const { toast } = useToast();
  const [formVisible, setFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<Faq | undefined>(
    undefined
  );

  const onSubmit = async (values: { title: string; description: string }) => {
    try {
      if (initialValues) {
        // Editar FAQ existente
        await updateFaq(initialValues.id, values);
        setFormVisible(false);
        setInitialValues(undefined);
        refetch();
        toast({
          title: "¡Pregunta actualizada!",
          description:
            "La pregunta frecuente ha sido actualizada exitosamente.",
          variant: "default",
        });
      } else {
        // Crear nueva FAQ
        await createFaq(values);
        setFormVisible(false);
        refetch();
        toast({
          title: "¡Pregunta creada!",
          description: "La pregunta frecuente ha sido creada exitosamente.",
          variant: "default",
        });
      }
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description: "Hubo un error en la operación solicitada.",
        variant: "destructive",
      });
    }
  };

  const onDelete = async (id: string) => {
    // Verificar si es el último registro
    if (faqs && faqs.data && faqs.data.length <= 1) {
      toast({
        title: "Operación no permitida",
        description:
          "Debe existir al menos una pregunta frecuente en el sistema.",
        variant: "destructive",
      });
      return;
    }

    try {
      await deleteFaq(id);
      refetch();
      toast({
        title: "¡Pregunta eliminada!",
        description: "La pregunta frecuente ha sido eliminada exitosamente.",
        variant: "default",
      });
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "Hubo un error al intentar eliminar la pregunta frecuente.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setFormVisible(false);
    setInitialValues(undefined);
  };

  if (isFetching) {
    return <Loader />;
  }

  const isLastItem = faqs && faqs.data && faqs.data.length <= 1;

  return (
    <div className="container py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Gestión de Preguntas Frecuentes
          </h1>
          <p className="text-gray-600">
            Administra las preguntas frecuentes que se mostrarán a los usuarios
            de la plataforma.
          </p>
        </div>

        <div className="overflow-hidden bg-white rounded-lg">
          <DataTable
            columns={columns}
            data={faqs?.data || []}
            canCreate
            createText="Crear nueva pregunta"
            onCreate={() => setFormVisible(true)}
            canEdit
            canDelete
            disableDelete={isLastItem} // Deshabilitar el botón de eliminar si solo queda un elemento
            onEdit={(values) => {
              setInitialValues(values as Faq);
              setFormVisible(true);
            }}
            onDelete={(values) => onDelete(values.id)}
          />
        </div>

        {formVisible && (
          <FaqForm
            isOpen={formVisible}
            onClose={handleClose}
            onSubmit={onSubmit}
            initialValues={initialValues}
          />
        )}
      </div>
    </div>
  );
};

export default AdminFaqs;
