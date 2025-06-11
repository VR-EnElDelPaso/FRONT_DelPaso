// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
import { FaEdit, FaPlus, FaTrash, FaFileExcel } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";
import * as XLSX from "xlsx";

// Tipo para definir columnas de exportación
export interface ExportColumn<TData> {
  accessorKey: string;
  header: string;
  cell?: (row: TData) => string | number | boolean | null | undefined;
  exclude?: boolean; // Para excluir esta columna de la exportación
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  canCreate?: boolean;
  createText?: string;
  onCreate?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  disableDelete?: boolean;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
  // Propiedades para exportación
  canExport?: boolean;
  exportFileName?: string;
  exportSheetName?: string;
  // Nueva propiedad para configurar columnas de exportación
  exportColumns?: ExportColumn<TData>[];
  // Opción para usar solo las columnas visibles de la tabla
  useTableColumnsForExport?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  canCreate = false,
  createText = "Crear nuevo",
  canEdit,
  canDelete,
  disableDelete = false,
  onEdit,
  onDelete,
  onCreate,
  canExport = false,
  exportFileName = "datos",
  exportSheetName = "Hoja1",
  exportColumns,
  useTableColumnsForExport = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  // Función para obtener valor anidado usando dot notation
  const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
    return path.split('.').reduce((current, key) => {
      return current && typeof current === 'object' && key in current
        ? (current as Record<string, unknown>)[key]
        : undefined;
    }, obj);
  };

  // Función para exportar a Excel
  const exportToExcel = (): void => {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    try {
      let columnsToExport: ExportColumn<TData>[] = [];

      if (exportColumns && exportColumns.length > 0) {
        // Usar columnas personalizadas de exportación
        columnsToExport = exportColumns.filter(col => !col.exclude);
      } else if (useTableColumnsForExport) {
        // Usar columnas de la tabla, convertirlas al formato de exportación
        columnsToExport = columns
          .filter((column) => {
            // Excluir columnas sin accessorKey (como columnas de acciones)
            return 'accessorKey' in column && column.accessorKey && column.header;
          })
          .map((column) => ({
            accessorKey: column.accessorKey as string,
            header: typeof column.header === 'string' 
              ? column.header 
              : String(column.accessorKey),
            // Si la columna tiene una función cell personalizada, intentar usarla
            cell: column.cell ? (row: TData) => {
              try {
                // Crear un contexto mock para la función cell
                const mockContext = {
                  getValue: (key: string) => getNestedValue(row as Record<string, unknown>, key),
                  row: { 
                    getValue: (key: string) => getNestedValue(row as Record<string, unknown>, key),
                    original: row 
                  }
                };
                const result = (column.cell)(mockContext);
                // Si el resultado es un JSX element, intentar extraer el texto
                if (result && typeof result === 'object' && result.props && result.props.children) {
                  if (typeof result.props.children === 'string') {
                    return result.props.children;
                  }
                  // Para casos más complejos, convertir a string
                  return String(result.props.children);
                }
                return String(result);
              } catch (error) {
                // Si falla, usar el valor raw
                return getNestedValue(row as Record<string, unknown>, column.accessorKey as string);
              }
            } : undefined
          }));
      }

      if (columnsToExport.length === 0) {
        alert("No hay columnas configuradas para exportar");
        return;
      }

      // Preparar los datos para la exportación
      const exportData = data.map((row: TData) => {
        const exportRow: Record<string, unknown> = {};
        
        columnsToExport.forEach((column) => {
          let value: unknown;
          
          if (column.cell) {
            // Usar función cell personalizada
            value = column.cell(row);
          } else {
            // Usar accessorKey para obtener el valor
            value = getNestedValue(row as Record<string, unknown>, column.accessorKey);
          }
          
          // Convertir valores para Excel
          if (value === null || value === undefined) {
            exportRow[column.header] = '';
          } else if (typeof value === 'object') {
            exportRow[column.header] = String(value);
          } else {
            exportRow[column.header] = value;
          }
        });
        
        return exportRow;
      });

      // Crear el libro de trabajo
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Configurar el ancho de las columnas automáticamente
      const columnWidths = columnsToExport.map((col) => ({
        wch: Math.max(col.header.length, 15) // Mínimo 15 caracteres de ancho
      }));
      worksheet['!cols'] = columnWidths;

      // Agregar la hoja al libro
      XLSX.utils.book_append_sheet(workbook, worksheet, exportSheetName);

      // Generar el archivo y descargarlo
      const fileName = `${exportFileName}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
    } catch (error) {
      console.error("Error al exportar datos:", error);
      alert("Error al exportar los datos. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Encabezado con botones */}
      {(canCreate || canExport) && (
        <div className="flex justify-end gap-2">
          {canExport && (
            <Button
              onClick={exportToExcel}
              variant="outline"
              className="px-4 py-2 text-green-600 border-green-600 hover:bg-green-50"
              disabled={!data || data.length === 0}
            >
              <FaFileExcel className="mr-2" />
              Exportar Excel
            </Button>
          )}
          {canCreate && (
            <Button
              onClick={onCreate}
              disabled={!canCreate}
              className="px-4 py-2 text-white"
            >
              <FaPlus className="mr-2" />
              {createText}
            </Button>
          )}
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-hidden bg-white border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 font-medium text-left text-gray-700"
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
                  <TableHead className="px-4 py-3 font-medium text-left text-gray-700">
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
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  {/* Actions */}
                  {canEdit || canDelete ? (
                    <TableCell className="px-4 py-3">
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
                                disabled={disableDelete}
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
                              className="max-w-xs p-4 bg-white border border-gray-300 rounded-md shadow-lg"
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
                                  className="text-white bg-red-500 hover:bg-red-600"
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