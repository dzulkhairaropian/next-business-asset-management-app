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

const mockGaConsumables: Consumable[] = [
  { id: "GAC-001", name: "Kertas A4 80gsm", model: "A4 80g", category: "Kertas & Notebook", brand: "Sinar Dunia", qty: 25, minQty: 10, status: "In Stock", cost: 48000 },
  { id: "GAC-002", name: "Pulpen Gel AE7 0.5mm Black", model: "AE7 Gel", category: "Alat Tulis", brand: "Standard", qty: 120, minQty: 50, status: "In Stock", cost: 3500 },
  { id: "GAC-003", name: "Baterai AA Alkaline (Isi 4)", model: "AA LR6", category: "Baterai", brand: "Energizer", qty: 4, minQty: 8, status: "Low Stock", cost: 32000 },
  { id: "GAC-004", name: "Baterai AAA Alkaline (Isi 4)", model: "AAA LR03", category: "Baterai", brand: "Energizer", qty: 2, minQty: 6, status: "Low Stock", cost: 30000 },
  { id: "GAC-005", name: "Tissue Wajah 250 Sheets", model: "Facial Tissue 250s", category: "Sanitasi & Kebersihan", brand: "Paseo", qty: 45, minQty: 15, status: "In Stock", cost: 18500 },
  { id: "GAC-006", name: "Sabun Cuci Tangan Liquid 4L", model: "Hand Soap Jerigen", category: "Sanitasi & Kebersihan", brand: "Yuri", qty: 0, minQty: 2, status: "Out of Stock", cost: 85000 },
  { id: "GAC-007", name: "Amplop Coklat Kabinet (Isi 100)", model: "Cabinet Brown Envelope", category: "Amplop & Surat", brand: "Paperline", qty: 8, minQty: 5, status: "In Stock", cost: 45000 },
  { id: "GAC-008", name: "Buku Kwitansi Sedang", model: "Receipt Book Medium", category: "Alat Tulis", brand: "Paperline", qty: 15, minQty: 5, status: "In Stock", cost: 7500 },
]

import { useRouter } from "next/navigation"

export default function GAConsumablesInventoryPage() {
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
                  <BreadcrumbPage>GA Consumable Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <DownloadIcon className="h-3.5 w-3.5" />
              Export Stock
            </Button>
            <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={() => router.push("/ga-consumables/inventory/create")}>
              <PlusIcon className="h-3.5 w-3.5" />
              Add GA Consumable
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">GA Consumable Management</h1>
            <p className="text-sm text-muted-foreground">Manage, monitor, and distribute general administration office supplies, stationeries, pantry consumables, and utilities.</p>
          </div>

          <DataTable columns={columns} data={mockGaConsumables} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
