import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { DataTable } from "@/shared/components/DataTable";
import { Tour } from "@/types/tour";
import PhotoCellModal from "@/shared/components/PhotoCellModal";
import { createTour, deleteTour, editTour } from "@/services/Tour";
import { getAllMuseums } from "@/services/Museums";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Museum } from "@/types/Museums";
import TourForm from "@/features/admin/components/TourForm";
import { TagsCell } from "@/shared/components/TagCell";

interface LoaderData {
  data: Tour[];
  ok?: boolean;
  message?: string;
}

const AdminTours = () => {
  const { toast } = useToast();
  const { data } = useLoaderData() as LoaderData;
  const { revalidate } = useRevalidator();
  const [formVisible, setFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<Tour | undefined>(
    undefined
  );
  const [museums, setMuseums] = useState<Museum[]>([]);

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        const response = await getAllMuseums();
        if (response.ok) {
          setMuseums(response.data);
        }
      } catch (error) {
        console.error("Error fetching museums:", error);
      }
    };
    fetchMuseums();
  }, []);

  const getMuseumName = (museumId: string) => {
    const museum = museums.find((m) => m.id === museumId);
    return museum?.name || "N/A";
  };

  const columns: ColumnDef<Tour>[] = [
    {
      accessorKey: "image_url",
      header: "Imagen",
      cell: ({ row }) => {
        const photo = row.getValue("image_url") as string;
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
          <Link to={`/tours/${id}`} className="text-blue-500 hover:underline">
            {name}
          </Link>
        );
      },
    },
    {
      accessorKey: "museum_id",
      header: "Museo",
      cell: ({ row }) => {
        const museumId = row.getValue("museum_id") as string;
        return getMuseumName(museumId);
      },
    },
    {
      accessorKey: "description",
      header: "Descripción",
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ row }) => {
        return `$${row.getValue("price")}`;
      },
    },
    {
      accessorKey: "stars",
      header: "Calificación",
      cell: ({ row }) => {
        return `${row.getValue("stars")} ⭐`;
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.original.tags;
        return <TagsCell tags={tags} />;
      },
    },
  ];

  // Rest of the component remains the same...
  const onSubmit = async (values: Partial<Tour>) => {
    try {
      if (initialValues) {
        const response = await editTour(initialValues.id, values);
        if (response) {
          setFormVisible(false);
          setInitialValues(undefined);
          revalidate();
          toast({
            title: "¡Tour actualizado!",
            description: "El tour ha sido actualizado exitosamente.",
            variant: "default",
          });
        }
      } else {
        const response = await createTour(values);
        if (response) {
          setFormVisible(false);
          setInitialValues(undefined);
          revalidate();
          toast({
            title: "¡Tour creado!",
            description: "El tour ha sido creado exitosamente.",
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
  };

  const onDelete = async (id: string) => {
    try {
      const response = await deleteTour(id);
      if (response.ok) {
        revalidate();
        toast({
          title: "¡Tour eliminado!",
          description: "El tour ha sido eliminado exitosamente.",
          variant: "default",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Hubo un error al intentar eliminar el tour.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setFormVisible(false);
    setInitialValues(undefined);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Tours
          </h1>
          <p className="text-gray-600">
            Administra y organiza la información de los tours disponibles en los
            museos.
          </p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <DataTable
            columns={columns}
            data={data}
            canCreate
            createText="Crear nuevo tour"
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
          <TourForm
            isOpen={formVisible}
            onClose={handleClose}
            onSubmit={(data) =>
              onSubmit({ ...data, price: parseFloat(data.price) })
            }
            initialValues={
              initialValues
                ? { ...initialValues, price: initialValues.price.toString() }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default AdminTours;
