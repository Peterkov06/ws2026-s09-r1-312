import { ColumnDef, createSolidTable, flexRender, getCoreRowModel } from "@tanstack/solid-table";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "./ui/table";
import { Show } from "solid-js";

interface CustomerDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const CustomerDataTable = <TData, TValue>(props: CustomerDataTableProps<TData, TValue>) => {
    const table = createSolidTable({
        get data() { return props.data },
        get columns() { return props.columns },
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <Table>
                <TableHeader class="bg-[#8B4513] text-white text-md">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow>
                            {headerGroup.headers.map((header) => (
                                <Show when={!header.isPlaceholder}>
                                    <TableHead class="font-bold">{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                </Show>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CustomerDataTable;
