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
import { UploadCloudIcon } from "lucide-react"

export default function SendAssetToMaintenancePage() {
  const [formData, setFormData] = React.useState({
    provider: "",
    startDate: "2026-07-03", // 03/07/2026
    initialCost: "150000",
    issueDescription: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Asset successfully sent to maintenance! (Mock action)")
    console.log("Maintenance details submitted:", formData)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                  <BreadcrumbLink href="/it-assets/inventory">Asset Management</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Send Asset to Maintenance</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-3xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Send Asset to Maintenance</h1>
            <p className="text-sm text-muted-foreground">Sending asset <span className="font-semibold text-primary">DB/NB/210222/013</span> (DBNBMKT-013) to repair or service.</p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Maintenance Details */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Maintenance Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="provider">Service Provider</Label>
                  <select
                    id="provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select Service Provider</option>
                    <option value="Lenovo Service Center">Lenovo Service Center</option>
                    <option value="Dell Authorized Repair">Dell Authorized Repair</option>
                    <option value="IT Internal Support">IT Internal Support Desk</option>
                    <option value="Third-Party Vendor">Third-Party Vendor</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="initialCost">Initial Cost (Rp)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-sm text-muted-foreground">Rp</span>
                    <Input
                      id="initialCost"
                      name="initialCost"
                      placeholder="e.g. 150000"
                      className="pl-9"
                      value={formData.initialCost}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="issueDescription">Description of Issue / Service Required</Label>
                  <textarea
                    id="issueDescription"
                    name="issueDescription"
                    placeholder="Describe what needs to be repaired or serviced..."
                    rows={3}
                    value={formData.issueDescription}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Additional notes..."
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Documentation</h2>
              <div className="flex flex-col gap-1.5">
                <Label>Evidence / Receipt (Optional)</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-xl p-8 hover:bg-muted/10 transition-colors cursor-pointer group">
                  <UploadCloudIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                  <span className="text-sm font-semibold text-foreground">Click to upload or drag and drop</span>
                  <span className="text-xs text-muted-foreground mt-1">PNG, JPG or PDF (MAX. 5MB)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t pt-6 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-xs font-semibold">
              Send to Maintenance
            </Button>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
