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

import { columns, Transaction } from "./columns"
import { DataTable } from "./data-table"

// Transaction logs mock data
const transactions: Transaction[] = [
  { id: "TXN-2026-0001", assetTag: "DB/HDD/260630/001", assetName: "Western Digital My Passport", type: "Checkout", qty: 1, userName: "Dzul Khair Aropian", dept: "Information Technology", date: "2026-06-30", status: "Completed", bast: true, notes: "" },
  { id: "TXN-2026-0002", assetTag: "DB/NB/240318/010", assetName: "Lenovo IdeaPad Slim 3", type: "Checkout", qty: 1, userName: "Karudin", dept: "Human Resources & General Affair", date: "2026-06-24", status: "Completed", bast: true, notes: "Out: Karudin" },
  { id: "TXN-2026-0003", assetTag: "DB/NB/241105/004", assetName: "Lenovo IdeaPad Slim 3", type: "Checkout", qty: 1, userName: "Kharisma Ayu", dept: "Finance, Accounting & Tax", date: "2026-06-23", status: "Completed", bast: false, notes: "" },
  { id: "TXN-2026-0004", assetTag: "DB/NB/210101/005", assetName: "Dell Vostro 3400", type: "Checkout", qty: 1, userName: "Ibrahim", dept: "Sales", date: "2026-06-18", status: "Completed", bast: true, notes: "" },
  { id: "TXN-2026-0005", assetTag: "DB/PR/220113/001", assetName: "Canon Pixma G 3010", type: "Checkin", qty: 1, userName: "Grace Ega", dept: "Finance, Accounting & Tax", date: "2026-06-15", status: "Completed", bast: false, notes: "Return to stock" },
  { id: "TXN-2026-0006", assetTag: "DB/AP/230518/002", assetName: "Ruijie RG-AP720-L", type: "Checkout", qty: 1, userName: "Dzul Khair Aropian", dept: "Information Technology", date: "2026-06-10", status: "Completed", bast: true, notes: "" },
  { id: "TXN-2026-0007", assetTag: "DB/NB/240209/015", assetName: "ASUS ExpertBook", type: "Checkin", qty: 1, userName: "Bramasta", dept: "Technical Support", date: "2026-06-05", status: "Completed", bast: false, notes: "" },
  { id: "TXN-2026-0008", assetTag: "DB/NB/220301/008", assetName: "Dell Vostro 3400", type: "Checkout", qty: 1, userName: "Unknown User", dept: "Marketing", date: "2026-06-01", status: "Pending", bast: false, notes: "Awaiting approval" },
  { id: "TXN-2026-0009", assetTag: "DB/NB/241120/002", assetName: "Lenovo IdeaPad Slim 5", type: "Checkout", qty: 1, userName: "Krystal", dept: "Marketing", date: "2026-05-28", status: "Completed", bast: true, notes: "" },
  { id: "TXN-2026-0010", assetTag: "DB/PR/240820/003", assetName: "Canon Pixma G 3010", type: "Checkout", qty: 1, userName: "Diannisa Sisilia", dept: "Finance, Accounting & Tax", date: "2026-05-15", status: "Overdue", bast: true, notes: "Late return warning" },
]

export default function TransactionsPage() {
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
                  <BreadcrumbPage>IT Asset Transactions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <DownloadIcon className="h-3.5 w-3.5" />
              Export History
            </Button>
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <PlusIcon className="h-3.5 w-3.5" />
              New Transaction
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">IT Asset Transactions</h1>
            <p className="text-sm text-muted-foreground">Historical records of IT equipment checkout and checkin activity.</p>
          </div>

          <DataTable columns={columns} data={transactions} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
