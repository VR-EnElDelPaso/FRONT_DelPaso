import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { DataTable } from "@/shared/components/DataTable";
import { Museum } from "@/types/Museums";
import PhotoCellModal from "@/shared/components/PhotoCellModal";
import MuseumForm from "../components/MuseumForm";
import { createMuseum } from "@/services/Museums";
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

  const onSubmit = async (values: Partial<Museum>) => {
    try {
      const response = await createMuseum(values as Museum);
      if (response) {
        setFormVisible(false);
        revalidate();
        toast({
          title: "¡Museo creado!",
          description: "El museo ha sido creado exitosamente.",
          variant: "default",
        });
      }
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description: "Hubo un error al intentar crear el museo.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
            canCreate={true}
            createText="Crear nuevo museo"
            onCreate={() => setFormVisible(true)}
          />
        </div>

        {formVisible && (
          <MuseumForm 
            isOpen={formVisible}
            onClose={() => setFormVisible(false)}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AdminMuseums;