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
import { DownloadIcon, PlusIcon } from "lucide-react"

import { columns, Consumable } from "./columns"
import { DataTable } from "./data-table"

const mockConsumables: Consumable[] = [
  { id: "CNS-001", name: "USB Hub 3.0", model: "-", category: "USB Hub", brand: "Gaintech", qty: 6, minQty: 2, status: "In Stock", cost: 75000 },
  { id: "CNS-002", name: "Mousepad", model: "-", category: "Mouse Pad", brand: "Robot", qty: 1, minQty: 2, status: "Low Stock", cost: 15000 },
  { id: "CNS-003", name: "Toner LBP 6030w", model: "-", category: "Toner Laserjet", brand: "HP", qty: 8, minQty: 2, status: "In Stock", cost: 80000 },
  { id: "CNS-004", name: "Mouse Wireless - B170", model: "-", category: "Mouse", brand: "Logitech", qty: 3, minQty: 1, status: "In Stock", cost: 150000 },
  { id: "CNS-005", name: "Ribbon Cartridge - LQ 310", model: "-", category: "Ribbon Cartridge", brand: "Epson", qty: 6, minQty: 2, status: "In Stock", cost: 80000 },
  { id: "CNS-006", name: "Ribbon Cartridge - LX 310", model: "-", category: "Ribbon Cartridge", brand: "Epson", qty: 3, minQty: 2, status: "In Stock", cost: 80000 },
  { id: "CNS-007", name: "Ribbon Cartridge - LX 300+ II", model: "-", category: "Ribbon Cartridge", brand: "Epson", qty: 1, minQty: 2, status: "Low Stock", cost: 80000 },
  { id: "CNS-008", name: "Canon BP - 790 (MAGENTA)", model: "-", category: "Ink", brand: "Blueprint Indonesia", qty: 10, minQty: 2, status: "In Stock", cost: 40000 },
  { id: "CNS-009", name: "Canon BP - 790 (YELLOW)", model: "-", category: "Ink", brand: "Blueprint Indonesia", qty: 10, minQty: 2, status: "In Stock", cost: 40000 },
  { id: "CNS-010", name: "Canon BP - 790 (CYAN)", model: "-", category: "Ink", brand: "Blueprint Indonesia", qty: 10, minQty: 2, status: "In Stock", cost: 40000 },
  { id: "CNS-011", name: "Canon BP - 790 (BK)", model: "-", category: "Ink", brand: "Blueprint Indonesia", qty: 9, minQty: 2, status: "In Stock", cost: 40000 },
  { id: "CNS-012", name: "Canon GSeries - CH 7 (COLOR)", model: "-", category: "Printhead", brand: "Canon", qty: 2, minQty: 1, status: "In Stock", cost: 350000 },
  { id: "CNS-013", name: "Canon GSeries - BH 7 (BK)", model: "-", category: "Printhead", brand: "Canon", qty: 0, minQty: 1, status: "Out of Stock", cost: 350000 },
  { id: "CNS-014", name: "Flashdisk 16GB", model: "-", category: "Flashdisk", brand: "SanDisk", qty: 0, minQty: 1, status: "Out of Stock", cost: 100000 },
  { id: "CNS-015", name: "Epson BP - 003 (MAGENTA)", model: "-", category: "Ink", brand: "Blueprint Indonesia", qty: 9, minQty: 2, status: "In Stock", cost: 40000 },
  { id: "CNS-016", name: "Epson BP - 003 (YELLOW)", model: "-", category: "Ink", brand: "Blueprint Indonesia", qty: 10, minQty: 2, status: "In Stock", cost: 40000 },
  { id: "CNS-017", name: "Epson BP - 003 (CYAN)", model: "-", category: "Ink", brand: "Blueprint Indonesia", qty: 9, minQty: 2, status: "In Stock", cost: 40000 },
  { id: "CNS-018", name: "Epson BP - 003 (BK)", model: "-", category: "Ink", brand: "Blueprint Indonesia", qty: 10, minQty: 3, status: "In Stock", cost: 40000 },
]

export default function ConsumablesInventoryPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Consumable Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <DownloadIcon className="h-3.5 w-3.5" />
              Export Stock
            </Button>
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <PlusIcon className="h-3.5 w-3.5" />
              Add Consumable
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Consumable Management</h1>
            <p className="text-sm text-muted-foreground">Manage and monitor non-capitalized accessory items, peripherals, and office supplies.</p>
          </div>

          <DataTable columns={columns} data={mockConsumables} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
