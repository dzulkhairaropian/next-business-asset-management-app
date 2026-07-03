"use client"

import * as React from "react"
import Link from "next/link"
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

import { columns, StatusConfig } from "./columns"
import { DataTable } from "./data-table"

const mockStatuses: StatusConfig[] = [
  { id: "ST-001", name: "Draft", masterCategory: "IT Asset", styleColor: "amber" },
  { id: "ST-002", name: "Ready to Deploy", masterCategory: "IT Asset", styleColor: "blue" },
  { id: "ST-003", name: "Deployed", masterCategory: "IT Asset", styleColor: "emerald" },
  { id: "ST-004", name: "Borrowed", masterCategory: "IT Asset", styleColor: "sky" },
  { id: "ST-005", name: "Service", masterCategory: "IT Asset", styleColor: "rose" },
  { id: "ST-006", name: "Broken", masterCategory: "IT Asset", styleColor: "red" },
  { id: "ST-007", name: "Retired", masterCategory: "IT Asset", styleColor: "gray" },
  { id: "ST-008", name: "In Stock", masterCategory: "Consumable", styleColor: "emerald" },
  { id: "ST-009", name: "Low Stock", masterCategory: "Consumable", styleColor: "amber" },
  { id: "ST-010", name: "Out of Stock", masterCategory: "Consumable", styleColor: "rose" },
  { id: "ST-011", name: "Pending", masterCategory: "Request", styleColor: "amber" },
  { id: "ST-012", name: "Fulfilled", masterCategory: "Request", styleColor: "emerald" },
  { id: "ST-013", name: "Declined", masterCategory: "Request", styleColor: "rose" },
]

export default function StatusesPage() {
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
                  <BreadcrumbPage>Statuses</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs" asChild>
              <Link href="/master-data/support-data/statuses/create">
                <PlusIcon className="h-3.5 w-3.5" />
                Add Status
              </Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Statuses</h1>
            <p className="text-sm text-muted-foreground">Configure lifecycle and transactional status codes across modules.</p>
          </div>

          <DataTable columns={columns} data={mockStatuses} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
