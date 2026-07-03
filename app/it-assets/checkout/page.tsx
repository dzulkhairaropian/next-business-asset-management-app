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

export default function AssetCheckoutPage() {
  const [formData, setFormData] = React.useState({
    checkoutUser: "",
    location: "",
    department: "Marketing - PT. Diastika Biotekindo Tbk",
    supervisor: "",
    checkoutDate: "2026-07-03", // corresponding to 03/07/2026
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Asset successfully checked out! (Mock action)")
    console.log("Checkout details:", formData)
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
                  <BreadcrumbPage>Asset Checkout</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-3xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Asset Checkout</h1>
            <p className="text-sm text-muted-foreground">Assigning <span className="font-semibold text-primary">DB/NB/210222/013</span> (Lenovo ThinkPad L14) to a user.</p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Assignment Details */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Assignment Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="checkoutUser">Checkout to User *</Label>
                  <select
                    id="checkoutUser"
                    name="checkoutUser"
                    required
                    value={formData.checkoutUser}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select User</option>
                    <option value="Grace Ega">Grace Ega</option>
                    <option value="Meiry">Meiry</option>
                    <option value="Nadya">Nadya</option>
                    <option value="Doni Eko">Doni Eko</option>
                    <option value="Dzul Khair Aropian">Dzul Khair Aropian</option>
                    <option value="Monica">Monica</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="location">Location *</Label>
                  <select
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select Location</option>
                    <option value="Head Office - Jakarta">Head Office - Jakarta</option>
                    <option value="Branch Office - Bandung">Branch Office - Bandung</option>
                    <option value="Warehouse - Tangerang">Warehouse - Tangerang</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="department">Department *</Label>
                  <select
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Marketing - PT. Diastika Biotekindo Tbk">Marketing - PT. Diastika Biotekindo Tbk</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Finance, Accounting & Tax">Finance, Accounting & Tax</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <select
                    id="supervisor"
                    name="supervisor"
                    value={formData.supervisor}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select Supervisor</option>
                    <option value="Bimby Dessy">Bimby Dessy</option>
                    <option value="Ahmad Jamil">Ahmad Jamil</option>
                    <option value="Krystal">Krystal</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="checkoutDate">Checkout Date *</Label>
                  <Input
                    type="date"
                    id="checkoutDate"
                    name="checkoutDate"
                    required
                    value={formData.checkoutDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Additional details about this assignment..."
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Handover Documentation */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Handover Documentation</h2>
              <div className="flex flex-col gap-1.5">
                <Label>Evidence (Image/PDF)</Label>
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
              Process Checkout
            </Button>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
