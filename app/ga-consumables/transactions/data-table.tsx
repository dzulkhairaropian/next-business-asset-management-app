"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon, InboxIcon, FilterIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [showFilters, setShowFilters] = React.useState(false)
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      const product = (row.original as any).product?.toLowerCase() || ""
      const brand = (row.original as any).brand?.toLowerCase() || ""
      const toUser = (row.original as any).toUser?.toLowerCase() || ""
      const byUser = (row.original as any).byUser?.toLowerCase() || ""

      return (
        product.includes(search) ||
        brand.includes(search) ||
        toUser.includes(search) ||
        byUser.includes(search)
      )
    },
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by product..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 h-10 w-full text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`h-10 text-xs font-semibold gap-1.5 ${
              showFilters
                ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
                : "bg-background text-foreground"
            }`}
          >
            <FilterIcon className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="p-5 rounded-xl border bg-card/50 flex flex-wrap gap-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Type</span>
            <select className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
              <option value="">All Types</option>
              <option value="checkout">Checkout</option>
              <option value="restock">Restock</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Brand</span>
            <select className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
              <option value="">All Brands</option>
              <option value="sidu">Sinar Dunia</option>
              <option value="standard">Standard</option>
              <option value="yuri">Yuri</option>
            </select>
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-72 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 py-10 max-w-[280px] mx-auto">
                    <div className="h-12 w-12 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground border border-dashed border-muted-foreground/30">
                      <InboxIcon className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm text-foreground">No transactions found</h3>
                      <p className="text-xs text-muted-foreground">We couldn't find any transaction records. Try adjusting your filters or search queries.</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t px-6 py-4">
          <span className="text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{" "}
            <span className="font-medium text-foreground">{Math.min(table.getFilteredRowModel().rows.length, (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize)}</span> of{" "}
            <span className="font-medium text-foreground">{table.getFilteredRowModel().rows.length}</span> transactions
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
