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
import { DownloadIcon, SearchIcon } from "lucide-react"
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

import { columns, GaTxn } from "./columns"

const mockTransactions: GaTxn[] = [
  { id: "TX-GA-001", date: "03 Jul 2026 10:55", assetName: "Toyota Voxy B 1503 ROG", assetTag: "GA-55996", type: "Checkout", processor: "Dzul Khair Aropian", notes: "Allocated to Director" },
  { id: "TX-GA-002", date: "01 Jul 2026 09:00", assetName: "Toyota Voxy B 1503 ROG", assetTag: "GA-55996", type: "Restock", processor: "Admin", notes: "New asset registration" },
  { id: "TX-GA-003", date: "28 Jun 2026 14:00", assetName: "Toyota Rush B 2443 TII", assetTag: "GA-50941", type: "Checkout", processor: "Admin", notes: "Checked out for branch site visit" },
  { id: "TX-GA-004", date: "25 Jun 2026 16:30", assetName: "Toyota Rush B 2443 TII", assetTag: "GA-50941", type: "Return", processor: "Admin", notes: "Returned from branch site visit" },
  { id: "TX-GA-005", date: "20 Jun 2026 08:00", assetName: "Honda Beat B 5425 TMV", assetTag: "GA-83371", type: "Maintenance", processor: "Bramasta", notes: "Regular oil service & brakes check" },
]

export default function GaAssetTransactionsPage() {
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data: mockTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      const name = (row.original as any).assetName?.toLowerCase() || ""
      const tag = (row.original as any).assetTag?.toLowerCase() || ""
      const type = (row.original as any).type?.toLowerCase() || ""
      return name.includes(search) || tag.includes(search) || type.includes(search)
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
                  <BreadcrumbPage>GA Asset Transactions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <DownloadIcon className="h-3.5 w-3.5" />
              Export Excel
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">GA Asset Transactions History</h1>
            <p className="text-sm text-muted-foreground">Historical records of General Affairs asset allocation, returns, and maintenance schedules.</p>
          </div>

          {/* Filters */}
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 h-10 w-full text-sm"
            />
          </div>

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
                      No transaction records found.
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
