import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  canCreate?: boolean;
  createText?: string;
  onCreate?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  disableDelete?: boolean; // Nueva propiedad para deshabilitar el botón de eliminar
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  canCreate = false,
  createText = "Crear nuevo",
  canEdit,
  canDelete,
  disableDelete = false, // Valor por defecto
  onEdit,
  onDelete,
  onCreate,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Encabezado con botón */}
      {canCreate && (
        <div className="flex justify-end">
          <Button
            onClick={onCreate}
            disabled={!canCreate}
            className="px-4 py-2 text-white"
          >
            <FaPlus />
            {createText}
          </Button>
        </div>
      )}

      {/* Tabla */}
      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-3 px-4 text-left font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                {/* Agregamos el header de acciones */}
                {(canEdit || canDelete) && (
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-700">
                    Acciones
                  </TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  {/* Actions */}
                  {canEdit || canDelete ? (
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {canEdit && (
                          <Button
                            onClick={() => onEdit?.(row.original)}
                            variant={"outline"}
                          >
                            <FaEdit className="text-blue-500" />
                          </Button>
                        )}
                        {canDelete && (
                          <Popover
                            open={openPopoverId === row.id}
                            onOpenChange={(open) => {
                              setOpenPopoverId(open ? row.id : null);
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                disabled={disableDelete} // Usar la nueva propiedad para deshabilitar
                                className={
                                  disableDelete
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }
                              >
                                <FaTrash
                                  className={`${
                                    disableDelete
                                      ? "text-gray-400"
                                      : "text-red-500"
                                  }`}
                                />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              align="center"
                              className="p-4 max-w-xs bg-white border border-gray-300 rounded-md shadow-lg"
                            >
                              <div className="text-sm text-gray-700">
                                ¿Estás seguro de que deseas eliminar este
                                elemento?
                              </div>
                              <div className="flex justify-end gap-2 mt-4">
                                <Button
                                  variant="outline"
                                  className="text-gray-500 border-gray-300"
                                  onClick={() => setOpenPopoverId(null)}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  onClick={() => {
                                    onDelete?.(row.original);
                                    setOpenPopoverId(null);
                                  }}
                                  className="bg-red-500 text-white hover:bg-red-600"
                                >
                                  Confirmar
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (canEdit || canDelete ? 1 : 0)}
                  className="h-24 text-center text-gray-500"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
