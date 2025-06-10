import { Accreditation } from "@/features/accreditations/accreditations.types";
import { DataTable } from "@/shared/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Accreditation, unknown>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
];

export const AdminAccreditationsPage = () => {
  return (
    <div className="container py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Gestión de Recorridos
          </h1>
          <p className="text-gray-600">
            Administra y organiza la información de los recorridos disponibles
            en los museos.
          </p>
        </div>

        <div className="overflow-hidden bg-white rounded-lg">
          <DataTable
            columns={columns}
            data={[]}
            canCreate
            createText="Crear nuevo tour"
            // onCreate={() => {}}
            canEdit
            canDelete
            // onEdit={() => {}}
            // onDelete={(values) => onDelete(values.id)}
          />
        </div>
      </div>
    </div>
  );
};
