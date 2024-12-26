import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { DataTable } from "@/shared/components/DataTable";
import { Museum } from "@/types/Museums";
import PhotoCellModal from "@/shared/components/PhotoCellModal";
import MuseumForm from "../components/MuseumForm";
import { createMuseum, deleteMuseum, editMuseum } from "@/services/Museums";
import { useToast } from "@/hooks/use-toast";

interface LoaderData {
  data: Museum[];
}

const columns: ColumnDef<Museum>[] = [
  {
    accessorKey: "main_photo",
    header: "Foto",
    cell: ({ row }) => {
      const photo = row.getValue("main_photo") as string;
      return <PhotoCellModal photo={photo} />;
    }  
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "address_name",
    header: "Dirección",
  },
];

const AdminMuseums = () => {
  const { toast } = useToast();
  const { data } = useLoaderData() as LoaderData;
  const { revalidate } = useRevalidator();
  const [formVisible, setFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<Museum | undefined>(undefined);

  const onSubmit = async (values: Partial<Museum>) => {
    // todo: mejorar esta parte para no repetir lo mismo
    try {
      if (initialValues) {
        const response = await editMuseum(initialValues.id, values as Museum);
        if (response) {
          setFormVisible(false);
          setInitialValues(undefined);
          revalidate();
          toast({
            title: "¡Museo actualizado!",
            description: "El museo ha sido actualizado exitosamente.",
            variant: "default",
          });
        }
      } else {
        const response = await createMuseum(values as Museum);
        if (response) {
          setFormVisible(false);
          setInitialValues(undefined);
          revalidate();
          toast({
            title: "¡Museo creado!",
            description: "El museo ha sido creado exitosamente.",
            variant: "default",
          });
        }
      }
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description: "Hubo un error en la operación solicitada.",
        variant: "destructive",
      });
    }
  }

  const onDelete = async (id: string) => {
    try {
      await deleteMuseum(id);
      revalidate();
      toast({
        title: "¡Museo eliminado!",
        description: "El museo ha sido eliminado exitosamente.",
        variant: "default",
      });
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description: "Hubo un error al intentar eliminar el museo.",
        variant: "destructive",
      });
    }
  }

  const handleClose = () => {
    setFormVisible(false);
    setInitialValues(undefined);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Museos
          </h1>
          <p className="text-gray-600">
            Administra y organiza la información de los museos en la aplicación de manera eficiente.
          </p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <DataTable 
            columns={columns} 
            data={data} 
            canCreate
            createText="Crear nuevo museo"
            onCreate={() => setFormVisible(true)}
            canEdit
            canDelete
            onEdit={(values) => {
              setInitialValues(values);
              setFormVisible(true);
            }}
            onDelete={(values) => onDelete(values.id)}
          />
        </div>

        {formVisible && (
          <MuseumForm 
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

export default AdminMuseums;