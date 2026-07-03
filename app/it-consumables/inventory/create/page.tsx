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

export default function CreateITConsumablePage() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    name: "",
    sku: "",
    brand: "",
    category: "",
    qty: "0",
    minQty: "5",
    storageLocation: "",
    purchaseCost: "0.00",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("IT Consumable successfully created! (Mock Action)")
    console.log("Form Submitted:", formData)
    router.push("/it-consumables/inventory")
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
                  <BreadcrumbLink href="/it-consumables/inventory">IT Consumables</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create IT Consumable</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create IT Consumable</h1>
            <p className="text-sm text-muted-foreground">Add new IT inventory items like ink cartridges, peripherals, or custom cables.</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Consumable Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Consumable Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Cat6 LAN Cable 10m"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="sku">SKU / Item Code *</Label>
                  <Input
                    id="sku"
                    name="sku"
                    required
                    placeholder="e.g. SKU-LAN-CAT6"
                    value={formData.sku}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="brand">Brand *</Label>
                  <select
                    id="brand"
                    name="brand"
                    required
                    value={formData.brand}
                    onChange={handleChange}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    <option value="">Select Brand</option>
                    <option value="Belden">Belden</option>
                    <option value="Logitech">Logitech</option>
                    <option value="Canon">Canon</option>
                    <option value="Kingston">Kingston</option>
                  </select>
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
                    <option value="Cables & Connectors">Cables & Connectors</option>
                    <option value="Peripherals">Peripherals</option>
                    <option value="Printer Supplies">Printer Supplies</option>
                    <option value="Storage Devices">Storage Devices</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="qty">Initial Quantity *</Label>
                  <Input
                    id="qty"
                    name="qty"
                    type="number"
                    required
                    placeholder="0"
                    value={formData.qty}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="minQty">Minimum Stock Alert *</Label>
                  <Input
                    id="minQty"
                    name="minQty"
                    type="number"
                    required
                    placeholder="5"
                    value={formData.minQty}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="storageLocation">Storage Bin / Location</Label>
                  <Input
                    id="storageLocation"
                    name="storageLocation"
                    placeholder="e.g. Cabinet A, Shelf 3"
                    value={formData.storageLocation}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="purchaseCost">Unit Purchase Cost (IDR)</Label>
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
                  <Label htmlFor="notes">Notes / Remarks</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Add any specific storage instructions or supplier details..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.push("/it-consumables/inventory")}>
                Cancel
              </Button>
              <Button type="submit">
                Save Consumable
              </Button>
            </div>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
