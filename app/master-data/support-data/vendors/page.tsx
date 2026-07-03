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

export type Vendor = {
  id: string
  name: string
  email: string
  contactPerson: string
  phone: string
  website: string
  address: string
}

const mockVendors: Vendor[] = [
  { id: "VND-001", name: "Bhinneka.com", email: "sales@bhinneka.com", contactPerson: "Budi Handoko", phone: "+62-21-3006-1234", website: "bhinneka.com", address: "Jl. Gunung Sahari Raya No.73, Jakarta" },
  { id: "VND-002", name: "Garda Utama Security", email: "info@gardautama.co.id", contactPerson: "Susilo Prabowo", phone: "+62-21-5001-5678", website: "gardautama.co.id", address: "Kawasan Industri MM2100, Bekasi" },
  { id: "VND-003", name: "Indocatering Service", email: "catering@indocatering.com", contactPerson: "Dewi Lestari", phone: "+62-21-7002-8910", website: "indocatering.com", address: "Jl. Margonda Raya No.12, Depok" },
]

export default function VendorsPage() {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [showFilters, setShowFilters] = React.useState(false)

  const columns: ColumnDef<Vendor>[] = [
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
      header: "Vendor Details",
      cell: ({ row }) => (
        <div>
          <span className="font-semibold text-foreground block text-sm">{row.original.name}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5 block">Web: {row.original.website}</span>
        </div>
      )
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
      cell: ({ row }) => <span className="text-xs text-foreground font-medium">{row.original.contactPerson}</span>,
    },
    {
      accessorKey: "email",
      header: "Contact Info",
      cell: ({ row }) => (
        <div className="text-xs">
          <span className="text-foreground block">{row.original.email}</span>
          <span className="text-muted-foreground block mt-0.5">{row.original.phone}</span>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <span className="text-xs text-muted-foreground block max-w-sm truncate">{row.original.address}</span>,
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
              <DropdownMenuItem onClick={() => alert(`Edit vendor: ${row.original.name}`)}>
                <EditIcon className="mr-2 h-3.5 w-3.5" />
                Edit Vendor
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => alert(`Delete vendor: ${row.original.name}`)}
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

  const router = useRouter()
  const table = useReactTable({
    data: mockVendors,
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
      const website = row.original.website.toLowerCase()
      const contactPerson = row.original.contactPerson.toLowerCase()
      const email = row.original.email.toLowerCase()
      return name.includes(search) || website.includes(search) || contactPerson.includes(search) || email.includes(search)
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
                  <span className="text-muted-foreground text-sm font-medium">Support Data</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Vendors</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={() => router.push("/master-data/support-data/vendors/create")}>
              <PlusIcon className="h-3.5 w-3.5" />
              Add Vendor
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Vendor Registry</h1>
            <p className="text-sm text-muted-foreground">Manage service providers, procurement partners, and maintenance vendors.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
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
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">City</span>
                <select className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
                  <option value="">All Cities</option>
                  <option value="jkt">Jakarta</option>
                  <option value="bks">Bekasi</option>
                  <option value="dpk">Depok</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 min-w-[150px]">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Contact Person</span>
                <select className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
                  <option value="">All Contact Persons</option>
                  <option value="budi">Budi Handoko</option>
                  <option value="susilo">Susilo Prabowo</option>
                  <option value="dewi">Dewi Lestari</option>
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
                          <h3 className="font-semibold text-sm text-foreground">No vendors found</h3>
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
                <span className="font-medium text-foreground">{table.getFilteredRowModel().rows.length}</span> vendors
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
