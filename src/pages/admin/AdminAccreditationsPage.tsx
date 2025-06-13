import { useGetAllAccreditations } from "@/features/accreditations/accreditations.querys";
import { Accreditation } from "@/features/accreditations/accreditations.types";
import { DataTable, ExportColumn } from "@/shared/components/DataTable";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Accreditation, unknown>[] = [
  {
    accessorKey: "user.name",
    header: "Nombre del Usuario",
  },
  {
    accessorKey: "user.first_lastname",
    header: "Primer Apellido",
  },
  {
    accessorKey: "user.second_lastname",
    header: "Segundo Apellido",
  },
  {
    accessorKey: "user.account_number",
    header: "Número de Cuenta",
  },
  {
    accessorKey: "user.email",
    header: "Correo Electrónico",
  },
  {
    accessorKey: "tour.name",
    header: "Tour",
  },
  {
    accessorKey: "tour.accreditable_hours",
    header: "Horas de Acreditación",
  },
  {
    accessorKey: "expires_at",
    header: "Fecha de procesado",
    cell: ({ row }) => {
      const date = row.getValue("expires_at") as string;
      return (
        <div className="text-gray-600">
          {dateFormatter(date)} a las {timeFormatter(date)}
        </div>
      );
    },
  },
];

const exportColumns: ExportColumn<Accreditation>[] = [
  {
    accessorKey: "user.name",
    header: "Nombre del Usuario",
  },
  {
    accessorKey: "user.first_lastname",
    header: "Primer Apellido",
  },
  {
    accessorKey: "user.second_lastname",
    header: "Segundo Apellido",
  },
  {
    accessorKey: "user.account_number",
    header: "Número de Cuenta",
  },
  {
    accessorKey: "tour.accreditable_hours",
    header: "Horas de Acreditación",
  },
  {
    accessorKey: "user.email",
    header: "Correo Electrónico",
  }
];

export const AdminAccreditationsPage = () => {
  const { data: accreditationsResponse } = useGetAllAccreditations();
  const accreditations = accreditationsResponse?.data || [];

  console.log("accreditations", accreditations);

  return (
    <div className="container py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Gestión de Acreditaciones
          </h1>
          <p className="text-gray-600">
            Administra y organiza la información de las acreditaciones de los
            usuarios.
          </p>
        </div>

        <div className="overflow-hidden bg-white rounded-lg">
          <DataTable
            columns={columns}
            data={accreditations}
            canExport={true}
            exportFileName="acreditaciones"
            exportSheetName="Acreditaciones"
            exportColumns={exportColumns}
            useTableColumnsForExport={false} // Usar configuración personalizada
          />
        </div>
      </div>
    </div>
  );
};
