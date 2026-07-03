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

const mockTransactions: ConsumableTxn[] = [
  { id: "TXN-CNS-001", date: "01 Jul 2026 00:00", product: "Ribbon Cartridge - LQ 310", brand: "Epson", type: "Restock", qtyChange: "+1", qtyTransition: "(5 → 6)", totalCost: 80000, unitCost: 80000, toUser: "-", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-002", date: "01 Jun 2026 00:00", product: "Ribbon Cartridge - LX 310", brand: "Epson", type: "Checkout", qtyChange: "-1", qtyTransition: "(4 → 3)", totalCost: 80000, unitCost: 80000, toUser: "Eva Ryski", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-003", date: "01 Jun 2026 00:00", product: "Ribbon Cartridge - LX 310", brand: "Epson", type: "Checkout", qtyChange: "-3", qtyTransition: "(7 → 4)", totalCost: 240000, unitCost: 80000, toUser: "Stevani", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-004", date: "01 Jun 2026 00:00", product: "Ribbon Cartridge - LX 300+ II", brand: "Epson", type: "Checkout", qtyChange: "-3", qtyTransition: "(4 → 1)", totalCost: 240000, unitCost: 80000, toUser: "Meiry", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-005", date: "01 Jun 2026 00:00", product: "Toner LBP 6030w", brand: "HP", type: "Checkout", qtyChange: "-1", qtyTransition: "(9 → 8)", totalCost: 80000, unitCost: 80000, toUser: "Dian", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-006", date: "01 Jul 2026 00:00", product: "Canon BP - 790 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-2", qtyTransition: "(11 → 9)", totalCost: 80000, unitCost: 40000, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-007", date: "01 Jul 2026 00:00", product: "Canon BP - 790 (CYAN)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-3", qtyTransition: "(13 → 10)", totalCost: 120000, unitCost: 40000, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-008", date: "01 Jul 2026 00:00", product: "Canon BP - 790 (YELLOW)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(11 → 10)", totalCost: 40000, unitCost: 40000, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-009", date: "01 Jul 2026 00:00", product: "Canon BP - 790 (MAGENTA)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-2", qtyTransition: "(12 → 10)", totalCost: 80000, unitCost: 40000, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-010", date: "01 Jul 2026 00:00", product: "Epson BP - 003 (MAGENTA)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(10 → 9)", totalCost: 40000, unitCost: 40000, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-011", date: "01 Jul 2026 00:00", product: "Epson BP - 003 (CYAN)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(10 → 9)", totalCost: 40000, unitCost: 40000, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-012", date: "01 Jul 2026 00:00", product: "Epson BP - 003 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-2", qtyTransition: "(12 → 10)", totalCost: 80000, unitCost: 40000, toUser: "Monica", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustemnt" },
  { id: "TXN-CNS-013", date: "18 Jun 2026 00:00", product: "Canon BP - 790 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(12 → 11)", totalCost: 40000, unitCost: 40000, toUser: "Meiry", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-014", date: "18 Jun 2026 00:00", product: "Canon BP - 790 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(13 → 12)", totalCost: 40000, unitCost: 40000, toUser: "Stevani", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-015", date: "17 Jun 2026 00:00", product: "Ribbon Cartridge - LX 310", brand: "Epson", type: "Checkout", qtyChange: "-1", qtyTransition: "(8 → 7)", totalCost: 80000, unitCost: 80000, toUser: "Stevani", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-016", date: "15 Jun 2026 00:00", product: "Canon BP - 790 (BK)", brand: "Blueprint Indonesia", type: "Restock", qtyChange: "+10", qtyTransition: "(3 → 13)", totalCost: 400000, unitCost: 40000, toUser: "-", byUser: "Admin", docs: "-", notes: "-" },
  { id: "TXN-CNS-017", date: "15 Jun 2026 00:00", product: "Canon BP - 790 (CYAN)", brand: "Blueprint Indonesia", type: "Restock", qtyChange: "+10", qtyTransition: "(3 → 13)", totalCost: 400000, unitCost: 40000, toUser: "-", byUser: "Admin", docs: "-", notes: "-" },
  { id: "TXN-CNS-018", date: "15 Jun 2026 00:00", product: "Canon BP - 790 (YELLOW)", brand: "Blueprint Indonesia", type: "Restock", qtyChange: "+10", qtyTransition: "(1 → 11)", totalCost: 400000, unitCost: 40000, toUser: "-", byUser: "Admin", docs: "-", notes: "-" },
  { id: "TXN-CNS-019", date: "15 Jun 2026 00:00", product: "Canon BP - 790 (MAGENTA)", brand: "Blueprint Indonesia", type: "Restock", qtyChange: "+10", qtyTransition: "(2 → 12)", totalCost: 400000, unitCost: 40000, toUser: "-", byUser: "Admin", docs: "-", notes: "-" },
  { id: "TXN-CNS-020", date: "15 Jun 2026 13:40", product: "Ribbon Cartridge - LX 310", brand: "Epson", type: "Checkout", qtyChange: "-1", qtyTransition: "(9 → 8)", totalCost: 80000, unitCost: 80000, toUser: "Stevani", byUser: "Admin", docs: "-", notes: "-" },
  { id: "TXN-CNS-021", date: "28 May 2026 09:45", product: "Ribbon Cartridge - LQ 310", brand: "Epson", type: "Checkout", qtyChange: "-1", qtyTransition: "(6 → 5)", totalCost: 0, unitCost: 0, toUser: "Eva Ryski", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-022", date: "02 Jun 2026 09:44", product: "Canon GSeries - BH 7 (BK)", brand: "Canon", type: "Checkout", qtyChange: "-1", qtyTransition: "(1 → 0)", totalCost: 0, unitCost: 0, toUser: "Stevani", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-023", date: "03 Jun 2026 09:44", product: "Canon BP - 790 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-2", qtyTransition: "(5 → 3)", totalCost: 0, unitCost: 0, toUser: "Stevani", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-024", date: "02 Jun 2026 09:44", product: "Ribbon Cartridge - LX 300+ II", brand: "Epson", type: "Checkout", qtyChange: "-1", qtyTransition: "(5 → 4)", totalCost: 0, unitCost: 0, toUser: "Stevani", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-025", date: "28 May 2026 09:43", product: "Ribbon Cartridge - LX 300+ II", brand: "Epson", type: "Checkout", qtyChange: "-1", qtyTransition: "(6 → 5)", totalCost: 0, unitCost: 0, toUser: "Meiry", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-026", date: "21 May 2026 11:15", product: "Mouse Wireless - B170", brand: "Logitech", type: "Checkout", qtyChange: "-1", qtyTransition: "(4 → 3)", totalCost: 0, unitCost: 0, toUser: "Ahmad Jamil", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-027", date: "19 May 2026 13:55", product: "Ribbon Cartridge - LQ 310", brand: "Epson", type: "Restock", qtyChange: "+1", qtyTransition: "(5 → 6)", totalCost: 80000, unitCost: 80000, toUser: "-", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-028", date: "12 May 2026 13:54", product: "Ribbon Cartridge - LX 310", brand: "Epson", type: "Checkout", qtyChange: "-1", qtyTransition: "(10 → 9)", totalCost: 0, unitCost: 0, toUser: "Stevani", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-029", date: "04 May 2026 13:54", product: "Ribbon Cartridge - LX 310", brand: "Epson", type: "Checkout", qtyChange: "-1", qtyTransition: "(11 → 10)", totalCost: 0, unitCost: 0, toUser: "Stevani", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-030", date: "19 May 2026 13:53", product: "Epson BP - 003 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(13 → 12)", totalCost: 0, unitCost: 0, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-031", date: "11 May 2026 13:51", product: "Epson BP - 003 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(14 → 13)", totalCost: 0, unitCost: 0, toUser: "Winona Silmy", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-032", date: "18 May 2026 13:50", product: "Canon BP - 790 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(6 → 5)", totalCost: 0, unitCost: 0, toUser: "Monica", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-033", date: "19 May 2026 13:49", product: "Toner LBP 6030w", brand: "HP", type: "Checkout", qtyChange: "-1", qtyTransition: "(10 → 9)", totalCost: 0, unitCost: 0, toUser: "Dian", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-034", date: "19 May 2026 13:48", product: "Mouse Wireless - B170", brand: "Logitech", type: "Checkout", qtyChange: "-1", qtyTransition: "(5 → 4)", totalCost: 0, unitCost: 0, toUser: "Nadya", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-035", date: "12 May 2026 13:48", product: "Mouse Wireless - B170", brand: "Logitech", type: "Checkout", qtyChange: "-1", qtyTransition: "(6 → 5)", totalCost: 0, unitCost: 0, toUser: "Afrilina Sinaga", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-036", date: "19 May 2026 13:47", product: "Mouse Wireless - B170", brand: "Logitech", type: "Restock", qtyChange: "+5", qtyTransition: "(1 → 6)", totalCost: 750000, unitCost: 150000, toUser: "-", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-037", date: "13 May 2026 13:47", product: "USB Hub 3.0", brand: "Gaintech", type: "Checkout", qtyChange: "-1", qtyTransition: "(7 → 6)", totalCost: 0, unitCost: 0, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-038", date: "19 May 2026 13:46", product: "Mousepad", brand: "Robot", type: "Checkout", qtyChange: "-1", qtyTransition: "(2 → 1)", totalCost: 0, unitCost: 0, toUser: "Asri Dwi Lestari", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-039", date: "12 May 2026 13:45", product: "Mousepad", brand: "Robot", type: "Checkout", qtyChange: "-1", qtyTransition: "(3 → 2)", totalCost: 0, unitCost: 0, toUser: "Damar Dwi Laksono", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-040", date: "12 May 2026 13:45", product: "Mousepad", brand: "Robot", type: "Checkout", qtyChange: "-1", qtyTransition: "(4 → 3)", totalCost: 0, unitCost: 0, toUser: "Afrilina Sinaga", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-041", date: "13 May 2026 13:44", product: "Mousepad", brand: "Robot", type: "Checkout", qtyChange: "-1", qtyTransition: "(5 → 4)", totalCost: 0, unitCost: 0, toUser: "Muliaty", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-042", date: "19 May 2026 13:44", product: "Mousepad", brand: "Robot", type: "Restock", qtyChange: "+4", qtyTransition: "(1 → 5)", totalCost: 60000, unitCost: 15000, toUser: "-", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-043", date: "19 May 2026 13:43", product: "Mousepad", brand: "Robot", type: "Restock", qtyChange: "+1", qtyTransition: "(0 → 1)", totalCost: 15000, unitCost: 15000, toUser: "-", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-044", date: "31 Mar 2026 04:07", product: "Flashdisk 16GB", brand: "SanDisk", type: "Checkout", qtyChange: "-1", qtyTransition: "(1 → 0)", totalCost: 0, unitCost: 0, toUser: "Alank Fattah", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-045", date: "30 Apr 2026 04:06", product: "Toner LBP 6030w", brand: "HP", type: "Checkout", qtyChange: "-2", qtyTransition: "(12 → 10)", totalCost: 0, unitCost: 0, toUser: "Dian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-046", date: "30 Apr 2026 04:04", product: "Epson BP - 003 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(15 → 14)", totalCost: 0, unitCost: 0, toUser: "Meiry", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-047", date: "20 Apr 2026 04:03", product: "Epson BP - 003 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(16 → 15)", totalCost: 0, unitCost: 0, toUser: "Meiry", byUser: "Dzul Khair Aropian", docs: "-", notes: "-" },
  { id: "TXN-CNS-048", date: "30 Apr 2026 04:02", product: "Canon BP - 790 (BK)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-3", qtyTransition: "(9 → 6)", totalCost: 0, unitCost: 0, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-049", date: "30 Apr 2026 04:01", product: "Canon BP - 790 (CYAN)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-1", qtyTransition: "(4 → 3)", totalCost: 0, unitCost: 0, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
  { id: "TXN-CNS-050", date: "30 Apr 2026 04:01", product: "Canon BP - 790 (YELLOW)", brand: "Blueprint Indonesia", type: "Checkout", qtyChange: "-4", qtyTransition: "(5 → 1)", totalCost: 0, unitCost: 0, toUser: "Dzul Khair Aropian", byUser: "Dzul Khair Aropian", docs: "-", notes: "adjustment" },
]

export default function ITConsumablesTransactionsHistoryPage() {
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
                  <BreadcrumbPage>IT Consumable Transactions History</BreadcrumbPage>
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
            <h1 className="text-2xl font-bold tracking-tight text-foreground">IT Consumable Transactions History</h1>
            <p className="text-sm text-muted-foreground">Historical records of stock adjustments, issues, and restocks of IT consumable items.</p>
          </div>

          <DataTable columns={columns} data={mockTransactions} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
