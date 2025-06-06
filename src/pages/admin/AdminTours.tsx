import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/DataTable";
import { Tour } from "@/types/tour";
import PhotoCellModal from "@/shared/components/PhotoCellModal";
import { deleteTour, editTour } from "@/services/tour.services";
import { getAllMuseums } from "@/services/Museums";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Museum } from "@/types/Museums";
import TourForm from "@/features/admin/components/TourForm";
import { TagsCell } from "@/shared/components/TagCell";
import { useCreateTour, useFetchTours } from "@/querys/tour.querys";
import Loader from "@/shared/components/Loader";
import { Tag } from "@/types/tag";
import { Badge } from "@/components/ui/badge";

// Definir una interfaz correcta para los valores del formulario
interface TourFormValues {
  id?: string;
  name?: string;
  description?: string;
  price: string;
  stars?: number;
  url?: string;
  image_url?: string;
  museum_id?: string;
  tags: Array<Tag | string>;
  is_accreditable?: boolean;
  accreditable_hours?: number | null;
  created_at?: string;
  updated_at?: string;
}

const AdminTours = () => {
  // ----------- Hooks -----------
  const { data: tours, isFetching, refetch } = useFetchTours();
  const { mutate: createMutation } = useCreateTour();
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

  const columns: ColumnDef<Tour, unknown>[] = [
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
      accessorKey: "is_accreditable",
      header: "Acreditable",
      cell: ({ row }) => {
        const isAccreditable = row.getValue("is_accreditable") as boolean;
        return (
          <Badge
            className="text-white"
            variant={isAccreditable ? "default" : "secondary"}
          >
            {isAccreditable ? "Sí" : "No"}
          </Badge>
        );
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

  // Refactorized onSubmit function with proper type handling
  const onSubmit = async (values: TourFormValues) => {
    try {
      if (initialValues) {
        // When editing, convert string tags to Tag objects
        const formattedTags: Tag[] = values.tags.map((tag) =>
          typeof tag === "string" ? { id: tag, name: tag } : tag
        );

        const response = await editTour(initialValues.id, {
          ...values,
          price: parseFloat(values.price),
          tags: formattedTags,
          is_accreditable: values.is_accreditable || false,
          accreditable_hours: values.accreditable_hours,
        });

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
        // When creating a new tour, ensure tags are proper Tag objects
        const formattedTags: Tag[] = values.tags.map((tag) =>
          typeof tag === "string" ? { id: tag, name: tag } : tag
        );

        createMutation(
          {
            ...values,
            price: parseFloat(values.price),
            tags: formattedTags,
            is_accreditable: values.is_accreditable || false,
            accreditable_hours: values.accreditable_hours,
          },
          {
            onSuccess: () => {
              setFormVisible(false);
              setInitialValues(undefined);
              refetch();
              toast({
                title: "¡Recorrido creado!",
                description: "El recorrido ha sido creado exitosamente.",
                variant: "default",
              });
            },
            onError: (error: unknown) => {
              console.error(error);
              toast({
                title: "Error",
                description: "Hubo un error en la operación solicitada.",
                variant: "destructive",
              });
            },
          }
        );
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
          title: "Recorrido eliminado!",
          description: "El recorrido ha sido eliminado exitosamente.",
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
            : "Hubo un error al intentar eliminar el recorrido.",
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
            Gestión de Recorridos
          </h1>
          <p className="text-gray-600">
            Administra y organiza la información de los recorridos disponibles en los
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
            onSubmit={(data) => {
              // Convert tags to Tag objects before passing to onSubmit
              const formattedTags: Array<Tag | string> = data.tags.map((tag) =>
                typeof tag === "string" ? { id: tag, name: tag } : tag
              );

              onSubmit({
                ...data,
                tags: formattedTags,
              });
            }}
            initialValues={
              initialValues
                ? {
                    ...initialValues,
                    price: initialValues.price.toString(),
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default AdminTours;
