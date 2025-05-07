import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { DataTable } from "@/shared/components/DataTable";
import { Museum } from "@/types/Museums";
import PhotoCellModal from "@/shared/components/PhotoCellModal";
import { createMuseum, deleteMuseum, editMuseum } from "@/services/Museums";
import { useToast } from "@/hooks/use-toast";
import MuseumForm from "@/features/admin/components/MuseumForm";
import HoursDisplay from "@/features/admin/components/HoursDisplay";
import { Clock, MapPin } from "lucide-react";
import { MuseumHours } from "@/types/Museums";
import { useFetchMuseums } from "@/features/admin/queries/useMuseumsQuery";
import Loader from "@/shared/components/Loader";
import { AxiosError } from "axios";

const columns: ColumnDef<Museum>[] = [
  {
    accessorKey: "main_photo",
    header: "Foto",
    cell: ({ row }) => {
      const photo = row.getValue("main_photo") as string;
      return <PhotoCellModal photo={photo} />;
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const id = row.original.id;
      return (
        <Link to={`/museum/${id}`} className="text-blue-500 hover:underline">
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "address_name",
    header: "Dirección",
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => {
      const latitude = row.original.latitude;
      const longitude = row.original.longitude;

      if (!latitude || !longitude) {
        return (
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>No especificada</span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>
            {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "hours",
    header: "Horarios",
    cell: ({ row }) => {
      const hours = row.getValue("hours") as MuseumHours[];
      return hours ? (
        <HoursDisplay hours={hours} />
      ) : (
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span>No especificado</span>
        </div>
      );
    },
  },
];

const AdminMuseums = () => {
  // ----------- Hooks -----------
  const { data: museums, isFetching, refetch } = useFetchMuseums();
  const { toast } = useToast();
  const [formVisible, setFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<Museum | undefined>(
    undefined
  );

  const onSubmit = async (
    values: Partial<
      Omit<Museum, "main_tour_id"> & { main_tour_id?: string | null }
    >
  ) => {
    console.log("Enviando datos:", values);
    try {
      if (initialValues) {
        // Editar museo existente
        const response = await editMuseum(initialValues.id, values as Museum);
        if (response) {
          toast({
            title: "¡Museo actualizado!",
            description: "El museo ha sido actualizado exitosamente.",
            variant: "default",
          });
          setFormVisible(false);
          setInitialValues(undefined);
          // Recargar datos después de operación exitosa
          setTimeout(() => {
            refetch();
          }, 500);
        }
      } else {
        // Crear nuevo museo
        const response = await createMuseum(values as Museum);
        if (response) {
          toast({
            title: "¡Museo creado!",
            description: "El museo ha sido creado exitosamente.",
            variant: "default",
          });
          setFormVisible(false);
          setInitialValues(undefined);
          // Recargar datos después de operación exitosa
          setTimeout(() => {
            refetch();
          }, 500);
        }
      }
    } catch (error: unknown) {
      console.error("Error en operación:", error);

      // Obtener mensaje de error más detallado
      let errorMessage = "Hubo un error en la operación solicitada.";
      if (error && typeof error === "object") {
        // Check if it's an axios error with response data
        const axiosError = error as AxiosError<{ message?: string }>;
        if (
          axiosError.response?.data &&
          "message" in axiosError.response.data
        ) {
          const responseData = axiosError.response.data;
          if (typeof responseData.message === "string") {
            errorMessage = responseData.message;
          }
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteMuseum(id);
      refetch();
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
  };

  const handleClose = () => {
    setFormVisible(false);
    setInitialValues(undefined);
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="container py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Gestión de Museos
          </h1>
          <p className="text-gray-600">
            Administra y organiza la información de los museos en la aplicación
            de manera eficiente.
          </p>
        </div>

        <div className="overflow-hidden bg-white rounded-lg">
          <DataTable
            columns={columns}
            data={museums?.data}
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
