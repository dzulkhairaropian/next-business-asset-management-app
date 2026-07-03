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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchIcon } from "lucide-react"

const availablePermissions = [
  "ViewAny:Asset", "View:Asset", "Create:Asset", "Update:Asset", "Delete:Asset", "Restore:Asset", "ForceDelete:Asset", "ForceDeleteAny:Asset", "RestoreAny:Asset", "Replicate:Asset", "Reorder:Asset",
  "ViewAny:Brand", "View:Brand", "Create:Brand", "Update:Brand", "Delete:Brand", "Restore:Brand", "ForceDelete:Brand", "ForceDeleteAny:Brand", "RestoreAny:Brand", "Replicate:Brand", "Reorder:Brand",
  "ViewAny:Category", "View:Category", "Create:Category", "Update:Category", "Delete:Category", "Restore:Category", "ForceDelete:Category", "ForceDeleteAny:Category", "RestoreAny:Category", "Replicate:Category", "Reorder:Category",
  "ViewAny:Company", "View:Company", "Create:Company", "Update:Company", "Delete:Company", "Restore:Company", "ForceDelete:Company", "ForceDeleteAny:Company", "RestoreAny:Company", "Replicate:Company", "Reorder:Company",
  "ViewAny:Consumable", "View:Consumable", "Create:Consumable", "Update:Consumable", "Delete:Consumable", "Restore:Consumable", "ForceDelete:Consumable", "ForceDeleteAny:Consumable", "RestoreAny:Consumable", "Replicate:Consumable", "Reorder:Consumable",
  "ViewAny:Department", "View:Department", "Create:Department", "Update:Department", "Delete:Department", "Restore:Department", "ForceDelete:Department", "ForceDeleteAny:Department", "RestoreAny:Department", "Replicate:Department", "Reorder:Department",
  "ViewAny:Location", "View:Location", "Create:Location", "Update:Location", "Delete:Location", "Restore:Location", "ForceDelete:Location", "ForceDeleteAny:Location", "RestoreAny:Location", "Replicate:Location", "Reorder:Location",
  "ViewAny:MasterCategory", "View:MasterCategory", "Create:MasterCategory", "Update:MasterCategory", "Delete:MasterCategory", "Restore:MasterCategory", "ForceDelete:MasterCategory", "ForceDeleteAny:MasterCategory", "RestoreAny:MasterCategory", "Replicate:MasterCategory", "Reorder:MasterCategory",
  "ViewAny:OperatingSystem", "View:OperatingSystem", "Create:OperatingSystem", "Update:OperatingSystem", "Delete:OperatingSystem", "Restore:OperatingSystem", "ForceDelete:OperatingSystem", "ForceDeleteAny:OperatingSystem", "RestoreAny:OperatingSystem", "Replicate:OperatingSystem", "Reorder:OperatingSystem",
  "ViewAny:Position", "View:Position", "Create:Position", "Update:Position", "Delete:Position", "Restore:Position", "ForceDelete:Position", "ForceDeleteAny:Position", "RestoreAny:Position", "Replicate:Position", "Reorder:Position",
  "ViewAny:Product", "View:Product", "Create:Product", "Update:Product", "Delete:Product", "Restore:Product", "ForceDelete:Product", "ForceDeleteAny:Product", "RestoreAny:Product", "Replicate:Product", "Reorder:Product",
  "ViewAny:Status", "View:Status", "Create:Status", "Update:Status", "Delete:Status", "Restore:Status", "ForceDelete:Status", "ForceDeleteAny:Status", "RestoreAny:Status", "Replicate:Status", "Reorder:Status",
  "ViewAny:User", "View:User", "Create:User", "Update:User", "Delete:User", "Restore:User", "ForceDelete:User", "ForceDeleteAny:User", "RestoreAny:User", "Replicate:User", "Reorder:User",
  "ViewAny:Vendor", "View:Vendor", "Create:Vendor", "Update:Vendor", "Delete:Vendor", "Restore:Vendor", "ForceDelete:Vendor", "ForceDeleteAny:Vendor", "RestoreAny:Vendor", "Replicate:Vendor", "Reorder:Vendor",
  "ViewAny:Role", "View:Role", "Create:Role", "Update:Role", "Delete:Role", "Restore:Role", "ForceDelete:Role", "ForceDeleteAny:Role", "RestoreAny:Role", "Replicate:Role", "Reorder:Role",
  "View:MyAssets", "View:AssetStatsWidget", "View:ConsumableStatsWidget", "View:AssetStatusChart", "View:LowStockAlertsWidget", "View:WarrantyExpiringWidget", "View:RecentAssetActivitiesWidget", "View:RecentConsumableTransactionsWidget", "View:AssetUserWidget", "View:RequestConsumable",
  "ViewAny:ConsumableRequest", "View:ConsumableRequest", "Create:ConsumableRequest", "Update:ConsumableRequest", "Delete:ConsumableRequest", "Restore:ConsumableRequest", "ForceDelete:ConsumableRequest", "ForceDeleteAny:ConsumableRequest", "RestoreAny:ConsumableRequest", "Replicate:ConsumableRequest", "Reorder:ConsumableRequest",
  "ViewAny:GaAssetCategory", "View:GaAssetCategory", "Create:GaAssetCategory", "Update:GaAssetCategory", "Delete:GaAssetCategory", "Restore:GaAssetCategory", "ForceDelete:GaAssetCategory", "ForceDeleteAny:GaAssetCategory", "RestoreAny:GaAssetCategory", "Replicate:GaAssetCategory", "Reorder:GaAssetCategory",
  "ViewAny:GaAsset", "View:GaAsset", "Create:GaAsset", "Update:GaAsset", "Delete:GaAsset", "Restore:GaAsset", "ForceDelete:GaAsset", "ForceDeleteAny:GaAsset", "RestoreAny:GaAsset", "Replicate:GaAsset", "Reorder:GaAsset",
  "View:Dashboard", "View:GaAssetsByCategoryChart", "View:GaProcurementSpendChart", "View:GaStatsOverviewWidget",
  "ViewAny:GaAssetSubcategory", "View:GaAssetSubcategory", "Create:GaAssetSubcategory", "Update:GaAssetSubcategory", "Delete:GaAssetSubcategory", "Restore:GaAssetSubcategory", "ForceDelete:GaAssetSubcategory", "ForceDeleteAny:GaAssetSubcategory", "RestoreAny:GaAssetSubcategory", "Replicate:GaAssetSubcategory", "Reorder:GaAssetSubcategory",
  "View:GaDashboard"
]

export default function CreateNewRolePage() {
  const [roleName, setRoleName] = React.useState("")
  const [selectedPerms, setSelectedPerms] = React.useState<Record<string, boolean>>({})
  const [search, setSearch] = React.useState("")

  const filteredPerms = availablePermissions.filter((perm) =>
    perm.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectAll = (checked: boolean) => {
    const updated: Record<string, boolean> = {}
    if (checked) {
      availablePermissions.forEach((perm) => {
        updated[perm] = true
      })
    }
    setSelectedPerms(updated)
  }

  const handleTogglePerm = (perm: string, checked: boolean) => {
    setSelectedPerms((prev) => ({
      ...prev,
      [perm]: checked,
    }))
  }

  const isAllSelected = availablePermissions.length > 0 && availablePermissions.every((p) => selectedPerms[p])
  const isSomeSelected = availablePermissions.some((p) => selectedPerms[p]) && !isAllSelected

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const activePerms = Object.keys(selectedPerms).filter((k) => selectedPerms[k])
    alert(`Role "${roleName}" created with ${activePerms.length} permissions! (Mock Action)`)
    console.log({ roleName, activePerms })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                  <BreadcrumbLink href="/system/access-control/roles">Role Management</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create New Role</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create New Role</h1>
            <p className="text-sm text-muted-foreground">Define role identity and assign capabilities boundaries.</p>
          </div>

          <div className="flex flex-col gap-6">
            {/* General Info */}
            <div className="grid gap-4 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">General Information</h2>
              <div className="flex flex-col gap-1.5 max-w-md">
                <Label htmlFor="roleName">Role Name *</Label>
                <Input
                  id="roleName"
                  required
                  placeholder="e.g. IT Support"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>
            </div>

            {/* Permissions */}
            <div className="rounded-xl border bg-card shadow-xs overflow-hidden flex flex-col">
              <div className="p-6 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-muted/10">
                <div>
                  <h2 className="font-semibold text-base text-primary">Permissions</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Select scopes this role is authorized to execute.</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select_all"
                      checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false}
                      onCheckedChange={(val) => handleSelectAll(!!val)}
                    />
                    <Label htmlFor="select_all" className="text-xs font-semibold cursor-pointer">
                      Select All
                    </Label>
                  </div>

                  <div className="relative w-52">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Search permissions..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8 h-8 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Checkbox grid list */}
              <div className="p-6 max-h-[400px] overflow-y-auto">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPerms.map((perm, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 border rounded-lg hover:bg-muted/30 transition-colors text-xs"
                    >
                      <span className="font-mono text-muted-foreground select-none truncate pr-2">{perm}</span>
                      <Checkbox
                        checked={!!selectedPerms[perm]}
                        onCheckedChange={(val) => handleTogglePerm(perm, !!val)}
                      />
                    </div>
                  ))}
                  {filteredPerms.length === 0 && (
                    <div className="col-span-full py-8 text-center text-muted-foreground italic">
                      No permissions match your search filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons footer */}
          <div className="flex items-center justify-end gap-3 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-xs font-semibold">
              Create Role
            </Button>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
