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

import { columns, User } from "./columns"
import { DataTable } from "./data-table"

const mockUsers: User[] = [
  { id: "USR-001", name: "Ibrahim", email: "ibrahim@diastika.co.id", dept: "Sales", company: "PT. Diastika Biotekindo Tbk", roles: ["User"] },
  { id: "USR-002", name: "Dzul Khair Aropian", email: "dzul.khair@diastika.co.id", dept: "Information Technology", company: "PT. Diastika Biotekindo Tbk", roles: ["Super Admin", "IT Admin"] },
  { id: "USR-003", name: "Grace Ega", email: "grace.ega@diastika.co.id", dept: "Finance, Accounting & Tax", company: "PT. Diastika Biotekindo Tbk", roles: ["User"] },
  { id: "USR-004", name: "Karudin", email: "karudin@diastika.co.id", dept: "Human Resources & General Affair", company: "PT. Diastika Biotekindo Tbk", roles: ["GA Admin", "User"] },
  { id: "USR-005", name: "Monica", email: "monica@diastika.co.id", dept: "Marketing", company: "PT. Diastika Biotekindo Tbk", roles: ["User"] },
  { id: "USR-006", name: "Bramasta", email: "bramasta@diastika.co.id", dept: "Technical Support", company: "PT. Diastika Biotekindo Tbk", roles: ["IT Admin"] },
]

export default function UserManagementPage() {
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
                  <BreadcrumbPage>User Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <PlusIcon className="h-3.5 w-3.5" />
              Add User
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">User Management</h1>
            <p className="text-sm text-muted-foreground">Manage organizational user profiles, departments, and security roles mapping.</p>
          </div>

          <DataTable columns={columns} data={mockUsers} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
