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
import { useRouter } from "next/navigation"

export default function CreateGAAssetPage() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    name: "",
    category: "",
    subcategory: "",
    company: "",
    location: "",
    department: "",
    serialNumber: "",
    assetCode: "",
    purchaseDate: "",
    purchaseCost: "0.00",
    specification: "",
    status: "Ready to Deploy",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("General Affairs Asset successfully registered! (Mock Action)")
    console.log("Form Submitted:", formData)
    router.push("/ga-assets")
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
                  <BreadcrumbLink href="/ga-assets">GA Assets</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create GA Asset</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create GA Asset</h1>
            <p className="text-sm text-muted-foreground">Register a new General Affairs asset (furniture, facilities, or company vehicle).</p>
          </div>

          <div className="flex flex-col gap-8">
            {/* 1. General Information */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">General Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Asset Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Ergonomic Office Chair"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Office Facilities">Office Facilities</option>
                    <option value="Security Equipments">Security Equipments</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input
                    id="subcategory"
                    name="subcategory"
                    placeholder="e.g. Office Desks, Sedans"
                    value={formData.subcategory}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="status">Status *</Label>
                  <select
                    id="status"
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    <option value="Ready to Deploy">Ready to Deploy</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                    <option value="Scrapped">Scrapped</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Assignment & Location */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Location & Assignment</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="company">Company *</Label>
                  <select
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    <option value="">Select Company</option>
                    <option value="Acme Inc">Acme Inc</option>
                    <option value="Acme Corp.">Acme Corp.</option>
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
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    <option value="">Select Location</option>
                    <option value="Head Office - Jakarta">Head Office - Jakarta</option>
                    <option value="Branch Office - Bandung">Branch Office - Bandung</option>
                    <option value="Warehouse - Tangerang">Warehouse - Tangerang</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="department">Department</Label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    <option value="">Select Department</option>
                    <option value="Human Resources & General Affair">HR & GA</option>
                    <option value="Information Technology">IT</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Specifications & Purchase */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Specifications & Purchase Info</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="assetCode">Asset Code</Label>
                  <Input
                    id="assetCode"
                    name="assetCode"
                    placeholder="e.g. GA-VHC-2026-003"
                    value={formData.assetCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="serialNumber">Serial / Frame Number</Label>
                  <Input
                    id="serialNumber"
                    name="serialNumber"
                    placeholder="Enter unique identification number"
                    value={formData.serialNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    name="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="purchaseCost">Purchase Cost (IDR)</Label>
                  <Input
                    id="purchaseCost"
                    name="purchaseCost"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.purchaseCost}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="specification">Specification Details</Label>
                  <textarea
                    id="specification"
                    name="specification"
                    rows={3}
                    placeholder="Model, dimensions, colors, materials, configurations..."
                    value={formData.specification}
                    onChange={handleChange}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    placeholder="Any specific comments or remarks..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.push("/ga-assets")}>
                Cancel
              </Button>
              <Button type="submit">
                Save GA Asset
              </Button>
            </div>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
