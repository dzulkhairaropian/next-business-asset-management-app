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
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  InboxIcon,
} from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [showFilters, setShowFilters] = React.useState(false)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState({
    dept: false,
    category: false,
  })
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      globalFilter,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      const tag = (row.original as any).tag?.toLowerCase() || ""
      const name = (row.original as any).name?.toLowerCase() || ""
      const code = (row.original as any).code?.toLowerCase() || ""
      const serial = (row.original as any).serial?.toLowerCase() || ""
      const holder = (row.original as any).holder?.toLowerCase() || ""

      return (
        tag.includes(search) ||
        name.includes(search) ||
        code.includes(search) ||
        serial.includes(search) ||
        holder.includes(search)
      )
    },
  })

  // Get status and category values for filters
  const statusValue = (table.getColumn("status")?.getFilterValue() as string) ?? "All Statuses"
  const categoryValue = (table.getColumn("category")?.getFilterValue() as string) ?? "All Categories"
  const deptValue = (table.getColumn("dept")?.getFilterValue() as string) ?? "All Departments"

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
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
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Status</span>
            <select
              value={statusValue}
              onChange={(e) => {
                const val = e.target.value
                table.getColumn("status")?.setFilterValue(val === "All Statuses" ? undefined : val)
              }}
              className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Deployed">Deployed</option>
              <option value="Ready to Deploy">Ready to Deploy</option>
              <option value="Draft">Draft</option>
              <option value="Service">Service</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Category</span>
            <select
              value={categoryValue}
              onChange={(e) => {
                const val = e.target.value
                table.getColumn("category")?.setFilterValue(val === "All Categories" ? undefined : val)
              }}
              className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="All Categories">All Categories</option>
              <option value="Notebook">Notebook</option>
              <option value="Printer">Printer</option>
              <option value="Storage">Storage</option>
              <option value="Network / IT Equipment">Network / IT Equipment</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Product</span>
            <select
              className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              disabled
            >
              <option>All Products</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Department</span>
            <select
              value={deptValue}
              onChange={(e) => {
                const val = e.target.value
                table.getColumn("dept")?.setFilterValue(val === "All Departments" ? undefined : val)
              }}
              className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="All Departments">All Departments</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Finance, Accounting & Tax">Finance, Accounting & Tax</option>
              <option value="Human Resources & General Affair">Human Resources & General Affair</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Supply Chain & Logistics">Supply Chain & Logistics</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Location</span>
            <select
              className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              disabled
            >
              <option>All Locations</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Aging</span>
            <select
              className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              disabled
            >
              <option>All Aging</option>
            </select>
          </div>
        </div>
      )}

      {/* Table Element */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden">
        {/* Bulk Actions Banner */}
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="bg-primary/5 border-b px-6 py-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              {table.getFilteredSelectedRowModel().rows.length} row(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 bg-background text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700">
                Bulk Delete
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 bg-background">
                Bulk Deploy
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 bg-background">
                Bulk Service
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs px-2"
                onClick={() => table.toggleAllRowsSelected(false)}
              >
                Clear
              </Button>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                      <h3 className="font-semibold text-sm text-foreground">No assets found</h3>
                      <p className="text-xs text-muted-foreground">We couldn't find any assets matching the search or filters. Try adjusting them.</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <span className="text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{" "}
            <span className="font-medium text-foreground">{Math.min(table.getFilteredRowModel().rows.length, (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize)}</span> of{" "}
            <span className="font-medium text-foreground">{table.getFilteredRowModel().rows.length}</span> assets
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
            <span className="text-xs font-semibold px-2">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
            </span>
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
