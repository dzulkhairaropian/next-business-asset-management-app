"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  SearchIcon,
  PlusIcon,
  MoreVerticalIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  InboxIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon
} from "lucide-react"
import {
  ColumnDef,
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

export type Position = {
  id: string
  code: string
  name: string
  description: string
}

const mockPositions: Position[] = [
  { id: "POS-001", code: "STF", name: "Staff", description: "General operational personnel handling daily business tasks." },
  { id: "POS-002", code: "SPV", name: "Supervisor", description: "Mid-level officer leading small teams and overseeing daily tasks." },
  { id: "POS-003", code: "MGR", name: "Manager", description: "Department head managing department budgets, assets, and teams." },
  { id: "POS-004", code: "VP", name: "Vice President", description: "Executive role aligning department goals with general corporate targets." },
  { id: "POS-005", code: "DIR", name: "Director", description: "C-level executive determining long-term corporate vision and strategy." },
]

export default function PositionsPage() {
  const router = useRouter()
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [showFilters, setShowFilters] = React.useState(false)

  const columns: ColumnDef<Position>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Position Title",
      cell: ({ row }) => (
        <div>
          <span className="font-semibold text-foreground block text-sm">{row.original.name}</span>
          <span className="text-[10px] text-muted-foreground font-mono mt-0.5 block">Code: {row.original.code}</span>
        </div>
      )
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="text-xs text-muted-foreground block max-w-lg">{row.original.description}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 text-xs">
              <DropdownMenuItem onClick={() => alert(`View details of: ${row.original.name}`)}>
                <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Edit position: ${row.original.name}`)}>
                <EditIcon className="mr-2 h-3.5 w-3.5" />
                Edit Position
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => alert(`Delete position: ${row.original.name}`)}
                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20"
              >
                <TrashIcon className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: mockPositions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      const name = row.original.name.toLowerCase()
      const code = row.original.code.toLowerCase()
      const division = row.original.division.toLowerCase()
      return name.includes(search) || code.includes(search) || division.includes(search)
    },
  })

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <span className="text-muted-foreground text-sm font-medium">Organization</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Positions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={() => router.push("/master-data/organization/positions/create")}>
              <PlusIcon className="h-3.5 w-3.5" />
              Add Position
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Position Directory</h1>
            <p className="text-sm text-muted-foreground">Manage organizational job titles, seniority levels, and grading.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search positions..."
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
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Division</span>
                <select className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
                  <option value="">All Divisions</option>
                  <option value="op">Operational</option>
                  <option value="mgmt">Management</option>
                  <option value="exec">Executive</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 min-w-[150px]">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Level</span>
                <select className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
                  <option value="">All Levels</option>
                  <option value="l1">Level 1</option>
                  <option value="l2">Level 2</option>
                  <option value="l3">Level 3</option>
                  <option value="l4">Level 4</option>
                  <option value="l5">Level 5</option>
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
                        {flexRender(
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
                          <h3 className="font-semibold text-sm text-foreground">No positions found</h3>
                          <p className="text-xs text-muted-foreground">Try adjusting your filters or search queries.</p>
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
                <span className="font-medium text-foreground">{table.getFilteredRowModel().rows.length}</span> positions
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
      </SidebarInset>
    </SidebarProvider>
  )
}
