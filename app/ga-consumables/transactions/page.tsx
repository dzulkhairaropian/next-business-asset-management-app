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
import { DownloadIcon } from "lucide-react"

import { columns, ConsumableTxn } from "./columns"
import { DataTable } from "./data-table"

const mockGaTransactions: ConsumableTxn[] = [
  { id: "TXN-GAC-001", date: "02 Jul 2026 10:15", product: "Kertas A4 80gsm", brand: "Sinar Dunia", type: "Checkout", qtyChange: "-5", qtyTransition: "(30 → 25)", totalCost: 240000, unitCost: 48000, toUser: "Finance Dept (Rina)", byUser: "Dzul Khair Aropian", docs: "-", notes: "Bulanan Finance" },
  { id: "TXN-GAC-002", date: "02 Jul 2026 09:30", product: "Sabun Cuci Tangan Liquid 4L", brand: "Yuri", type: "Checkout", qtyChange: "-1", qtyTransition: "(1 → 0)", totalCost: 85000, unitCost: 85000, toUser: "Pantry Lt. 2", byUser: "Dzul Khair Aropian", docs: "-", notes: "Penggantian sabun habis" },
  { id: "TXN-GAC-003", date: "01 Jul 2026 14:00", product: "Pulpen Gel AE7 0.5mm Black", brand: "Standard", type: "Checkout", qtyChange: "-12", qtyTransition: "(132 → 120)", totalCost: 42000, unitCost: 3500, toUser: "HRD (Siti)", byUser: "Dzul Khair Aropian", docs: "-", notes: "Kebutuhan onboarding karyawan baru" },
  { id: "TXN-GAC-004", date: "30 Jun 2026 16:45", product: "Baterai AA Alkaline (Isi 4)", brand: "Energizer", type: "Checkout", qtyChange: "-2", qtyTransition: "(6 → 4)", totalCost: 64000, unitCost: 32000, toUser: "Meeting Room Merapi", byUser: "Dzul Khair Aropian", docs: "-", notes: "Ganti baterai remote AC & projector" },
  { id: "TXN-GAC-005", date: "29 Jun 2026 11:00", product: "Tissue Wajah 250 Sheets", brand: "Paseo", type: "Restock", qtyChange: "+20", qtyTransition: "(25 → 45)", totalCost: 370000, unitCost: 18500, toUser: "-", byUser: "Admin GA", docs: "PO-GA-9921", notes: "Restock rutin bulanan" },
  { id: "TXN-GAC-006", date: "29 Jun 2026 10:55", product: "Kertas A4 80gsm", brand: "Sinar Dunia", type: "Restock", qtyChange: "+15", qtyTransition: "(15 → 30)", totalCost: 720000, unitCost: 48000, toUser: "-", byUser: "Admin GA", docs: "PO-GA-9921", notes: "Restock rutin bulanan" },
  { id: "TXN-GAC-007", date: "25 Jun 2026 13:20", product: "Amplop Coklat Kabinet (Isi 100)", brand: "Paperline", type: "Checkout", qtyChange: "-2", qtyTransition: "(10 → 8)", totalCost: 90000, unitCost: 45000, toUser: "Legal (Budi)", byUser: "Dzul Khair Aropian", docs: "-", notes: "Kirim dokumen kontrak kerja" },
]

export default function GAConsumablesTransactionsHistoryPage() {
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
                  <BreadcrumbPage>GA Consumable Transactions History</BreadcrumbPage>
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
            <h1 className="text-2xl font-bold tracking-tight text-foreground">GA Consumable Transactions History</h1>
            <p className="text-sm text-muted-foreground">Historical records of stock adjustments, issues, and restocks of general affairs consumable items.</p>
          </div>

          <DataTable columns={columns} data={mockGaTransactions} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
