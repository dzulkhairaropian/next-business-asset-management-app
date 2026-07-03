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
import { PlusIcon } from "lucide-react"

import { columns, GaAsset } from "./columns"
import { DataTable } from "./data-table"

const mockGaAssets: GaAsset[] = [
  { id: "GA-A-001", name: "Honda Beat B 5425 TMV", tag: "GA-83371", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-002", name: "Supra X B 5200 TIH", tag: "GA-83370", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-003", name: "Honda Beat B 5465 THZ", tag: "GA-83369", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-004", name: "Honda Beat B 5464 THZ", tag: "GA-83368", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-005", name: "Honda Beat B 5463 THZ", tag: "GA-83367", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-006", name: "Honda Beat", tag: "GA-83366", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-007", name: "Honda Beat", tag: "GA-83365", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-008", name: "Honda Beat", tag: "GA-83364", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-009", name: "Honda Genio", tag: "GA-83363", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Motor", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-010", name: "Toyota Agya B 2027 TFG", tag: "GA-62789", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-011", name: "Toyota Avanza B 2359 TFX", tag: "GA-81326", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-012", name: "Toyota Rush B 2443 TII", tag: "GA-50941", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-013", name: "Toyota Rush B 2120 TII", tag: "GA-60065", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-014", name: "Toyota Innova B 2579 SJ", tag: "GA-05070", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-015", name: "Daihatsu Xenia B 2340 TIS", tag: "GA-09872", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-016", name: "Daihatsu Xenia B 2185 TRA", tag: "GA-83362", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-017", name: "Daihatsu Xenia B 2714 TIZ", tag: "GA-70592", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-018", name: "Daihatsu GrandMax B 2181 TRA", tag: "GA-73299", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 0, assignedTo: "Not Assigned" },
  { id: "GA-A-019", name: "Toyota Voxy B 1503 ROG", tag: "GA-55996", serial: "-", status: "Available", category: "Kendaraan", subcategory: "Mobil", value: 595700000, assignedTo: "Not Assigned" },
]

export default function GeneralAffairsAssetManagementPage() {
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
                  <BreadcrumbPage>General Affairs Asset Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <PlusIcon className="h-3.5 w-3.5" />
              Add GA Asset
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">General Affairs Asset Management</h1>
            <p className="text-sm text-muted-foreground">Manage and track administrative corporate assets, office furniture, and company vehicles.</p>
          </div>

          <DataTable columns={columns} data={mockGaAssets} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
