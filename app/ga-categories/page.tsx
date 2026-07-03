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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { PlusIcon, SearchIcon, FilterIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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

import { columns, GaCategory } from "./columns"

const mockCategories: GaCategory[] = [
  { id: "GAC-001", name: "Kendaraan", prefixCode: "-", depreciationMethod: "Straight Line", usefulLife: "5 Years" },
  { id: "GAC-002", name: "Furniture", prefixCode: "FUR", depreciationMethod: "Straight Line", usefulLife: "5 Years" },
  { id: "GAC-003", name: "Mobil", prefixCode: "MBL", depreciationMethod: "Straight Line", usefulLife: "5 Years" },
]

export default function GaAssetCategoriesPage() {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [showFilters, setShowFilters] = React.useState(false)

  const table = useReactTable({
    data: mockCategories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      const name = (row.original as any).name?.toLowerCase() || ""
      const code = (row.original as any).prefixCode?.toLowerCase() || ""
      return name.includes(search) || code.includes(search)
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
                  <BreadcrumbPage>GA Asset Categories</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <PlusIcon className="h-3.5 w-3.5" />
              Add Category
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">GA Asset Categories</h1>
            <p className="text-sm text-muted-foreground">Manage and group general affairs assets, depreciation rates, and lifecycle settings.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
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
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Depreciation Method</span>
                <select className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
                  <option value="">Depreciation Method</option>
                  <option value="straight-line">Straight Line</option>
                  <option value="double-declining">Double Declining</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 min-w-[150px]">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Useful Life</span>
                <select className="h-9 px-3 rounded-md border border-input bg-background text-xs font-medium text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
                  <option value="">Useful Life</option>
                  <option value="5y">5 Years</option>
                  <option value="8y">8 Years</option>
                  <option value="10y">10 Years</option>
                </select>
              </div>
            </div>
          )}

          {/* Table Card */}
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
                    <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                      No categories found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
