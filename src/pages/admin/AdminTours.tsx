import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
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
import { useFetchTours } from "@/features/admin/queries/useToursQuery";
import Loader from "@/shared/components/Loader";

const AdminTours = () => {
  // ----------- Hooks -----------
  const { data: tours, isFetching, refetch } = useFetchTours();
  const { toast } = useToast();
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
      header: "Cuota de recuperación",
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
          refetch();
          toast({
            title: "¡Tour actualizado!",
            description: "El tour ha sido actualizado exitosamente.",
            variant: "default",
          });
        }
      } else {
        const response = await createTour({
          ...values,
          tags: values.tags || [],
        });
        if (response) {
          setFormVisible(false);
          setInitialValues(undefined);
          refetch();
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
        refetch();
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

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="container py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Gestión de Tours
          </h1>
          <p className="text-gray-600">
            Administra y organiza la información de los tours disponibles en los
            museos.
          </p>
        </div>

        <div className="overflow-hidden bg-white rounded-lg">
          <DataTable
            columns={columns}
            data={tours?.data}
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
              onSubmit({
                ...data,
                price: parseFloat(data.price),
                tags: data.tags.map((tag) => ({ id: tag, name: tag })),
              })
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
