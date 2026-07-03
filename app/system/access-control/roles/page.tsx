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
import { Input } from "@/components/ui/input"
import { PlusIcon, SearchIcon, MoreVerticalIcon } from "lucide-react"

const rolesData = [
  {
    name: "super_admin",
    usersCount: 1,
    permissions: ["ViewAny:Asset", "View:Asset", "Create:Asset", "Update:Asset", "Delete:Asset"],
    extraPermsCount: 219,
  },
  {
    name: "user",
    usersCount: 127,
    permissions: ["View:MyAssets", "View:RequestConsumable", "ViewAny:ConsumableRequest", "View:ConsumableRequest", "Create:ConsumableRequest"],
    extraPermsCount: 0,
  },
  {
    name: "ga_admin",
    usersCount: 2,
    permissions: ["ViewAny:Company", "View:Company", "Create:Company", "Update:Company", "Delete:Company"],
    extraPermsCount: 77,
  },
  {
    name: "it_admin",
    usersCount: 2,
    permissions: ["ViewAny:Asset", "View:Asset", "Create:Asset", "Update:Asset", "Delete:Asset"],
    extraPermsCount: 116,
  },
]

export default function RoleManagementPage() {
  const [search, setSearch] = React.useState("")

  const filteredRoles = rolesData.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  )

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
                  <BreadcrumbPage>Role Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs" asChild>
              <Link href="/system/access-control/roles/create">
                <PlusIcon className="h-3.5 w-3.5" />
                Add Role
              </Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Role Management</h1>
            <p className="text-sm text-muted-foreground">Manage organizational user roles and define granular permission boundaries.</p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 w-full text-sm"
            />
          </div>

          {/* Roles Table */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-muted-foreground text-xs uppercase tracking-wider bg-muted/20">
                    <th className="px-6 py-4 font-semibold">Role Name</th>
                    <th className="px-6 py-4 font-semibold">Total Users</th>
                    <th className="px-6 py-4 font-semibold">Permissions</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredRoles.map((role, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground block font-mono text-sm">{role.name}</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                        {role.usersCount} users
                      </td>
                      <td className="px-6 py-4 max-w-xl">
                        <div className="flex flex-wrap gap-1.5">
                          {role.permissions.map((perm, pidx) => (
                            <span
                              key={pidx}
                              className="inline-flex items-center px-2 py-0.5 rounded bg-muted text-[10px] font-mono font-medium text-muted-foreground border"
                            >
                              {perm}
                            </span>
                          ))}
                          {role.extraPermsCount > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/5 text-[10px] font-mono font-semibold text-primary border border-primary/10">
                              + {role.extraPermsCount} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
