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
]

import { useRouter } from "next/navigation"

export default function ITConsumablesInventoryPage() {
  const router = useRouter()

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
                  <BreadcrumbPage>IT Consumable Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <DownloadIcon className="h-3.5 w-3.5" />
              Export Stock
            </Button>
            <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={() => router.push("/it-consumables/inventory/create")}>
              <PlusIcon className="h-3.5 w-3.5" />
              Add IT Consumable
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">IT Consumable Management</h1>
            <p className="text-sm text-muted-foreground">Manage and monitor non-capitalized IT accessory items, peripherals, and consumables.</p>
          </div>

          <DataTable columns={columns} data={mockConsumables} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
