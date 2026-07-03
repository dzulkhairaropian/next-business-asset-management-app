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

export default function EditITAssetPage() {
  const [formData, setFormData] = React.useState({
    product: "Lenovo ThinkPad L14",
    status: "Ready to Deploy",
    vendor: "",
    department: "Marketing",
    location: "Head Office - Jakarta",
    serialNumber: "PF3K24QA",
    productNumber: "",
    userName: "",
    releaseDate: "2021-02-22", // released 5 years ago relative to 2026
    macWireless: "00:00:00:00:00:00",
    macEthernet: "00:00:00:00:00:00",
    windowsLicense: "",
    officeLicense: "",
    os: "Windows 11 Pro",
    specification: "Core i5, 8GB RAM, 256GB SSD",
    accessories: "Charger, Bag",
    purchaseDate: "2021-03-01",
    purchaseCost: "0.00",
    warrantyExpiryDate: "2024-03-01",
    invoiceNumber: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Asset successfully updated! (Mock action)")
    console.log("Updated Asset details:", formData)
    window.history.back()
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
                  <BreadcrumbLink href="/it-assets/details">Asset Details</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit IT Asset</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit IT Asset</h1>
            <p className="text-sm text-muted-foreground">Updating details for asset <span className="font-semibold text-primary">DB/NB/210222/013</span>.</p>
          </div>

          <div className="flex flex-col gap-8">
            {/* 1. General Information */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">General Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="product">Product *</Label>
                  <select
                    id="product"
                    name="product"
                    required
                    value={formData.product}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Lenovo ThinkPad L14">Lenovo ThinkPad L14</option>
                    <option value="Dell Latitude 3410">Dell Latitude 3410</option>
                    <option value="Dell Vostro 3400">Dell Vostro 3400</option>
                    <option value="Lenovo IdeaPad Slim 3">Lenovo IdeaPad Slim 3</option>
                    <option value="ASUS ExpertBook">ASUS ExpertBook</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="status">Status *</Label>
                  <select
                    id="status"
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Ready to Deploy">Ready to Deploy</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Draft">Draft</option>
                    <option value="Service">Service</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="vendor">Vendor</Label>
                  <select
                    id="vendor"
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select Vendor</option>
                    <option value="Blueprint Indonesia">Blueprint Indonesia</option>
                    <option value="Acer Indonesia">Acer Indonesia</option>
                    <option value="Dell Authorized Reseller">Dell Authorized Reseller</option>
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
                    <option value="Marketing">Marketing</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Finance, Accounting & Tax">Finance, Accounting & Tax</option>
                    <option value="Human Resources & General Affair">Human Resources & General Affair</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="location">Location</Label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Head Office - Jakarta">Head Office - Jakarta</option>
                    <option value="Branch Office - Bandung">Branch Office - Bandung</option>
                    <option value="Warehouse - Tangerang">Warehouse - Tangerang</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="serialNumber">Serial Number *</Label>
                  <Input
                    id="serialNumber"
                    name="serialNumber"
                    required
                    placeholder="Enter serial number"
                    value={formData.serialNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="productNumber">Product Number</Label>
                  <Input
                    id="productNumber"
                    name="productNumber"
                    placeholder="Enter product number"
                    value={formData.productNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="userName">User Name</Label>
                  <Input
                    id="userName"
                    name="userName"
                    placeholder="e.g. John Doe"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <Input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* 2. Network Information */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Network Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="macWireless">MAC Address Wireless</Label>
                  <Input
                    id="macWireless"
                    name="macWireless"
                    placeholder="00:00:00:00:00:00"
                    value={formData.macWireless}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="macEthernet">MAC Address Ethernet</Label>
                  <Input
                    id="macEthernet"
                    name="macEthernet"
                    placeholder="00:00:00:00:00:00"
                    value={formData.macEthernet}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* 3. Software Licenses */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Software Licenses</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="windowsLicense">Windows License</Label>
                  <Input
                    id="windowsLicense"
                    name="windowsLicense"
                    placeholder="Enter Windows license key"
                    value={formData.windowsLicense}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="officeLicense">Office License</Label>
                  <Input
                    id="officeLicense"
                    name="officeLicense"
                    placeholder="Enter Office license key"
                    value={formData.officeLicense}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* 4. Technical Specifications */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Technical Specifications</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="os">Operating System</Label>
                  <select
                    id="os"
                    name="os"
                    value={formData.os}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select OS</option>
                    <option value="Windows 11 Pro">Windows 11 Pro</option>
                    <option value="Windows 10 Pro">Windows 10 Pro</option>
                    <option value="macOS Sequoia">macOS Sequoia</option>
                    <option value="Ubuntu Linux">Ubuntu Linux</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="specification">Specification</Label>
                  <textarea
                    id="specification"
                    name="specification"
                    placeholder="e.g. Core i7, 16GB RAM, 512GB SSD"
                    rows={3}
                    value={formData.specification}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="accessories">Accessories</Label>
                  <textarea
                    id="accessories"
                    name="accessories"
                    placeholder="e.g. Mouse, Keyboard, Charger"
                    rows={2}
                    value={formData.accessories}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 5. Financial Information */}
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Financial Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="purchaseCost">Purchase Cost</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-sm text-muted-foreground">Rp</span>
                    <Input
                      id="purchaseCost"
                      name="purchaseCost"
                      type="number"
                      placeholder="0.00"
                      className="pl-9"
                      value={formData.purchaseCost}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="warrantyExpiryDate">Warranty Expiry Date</Label>
                  <Input
                    type="date"
                    id="warrantyExpiryDate"
                    name="warrantyExpiryDate"
                    value={formData.warrantyExpiryDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    name="invoiceNumber"
                    placeholder="e.g. INV/2026/06/001"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Additional notes..."
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-xs font-semibold">
              Save Changes
            </Button>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
