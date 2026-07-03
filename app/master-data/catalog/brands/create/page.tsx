"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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

export default function CreateBrandPage() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    code: "",
    name: "",
    website: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Brand successfully created! (Mock action)")
    console.log("Brand Form Submitted:", formData)
    router.push("/master-data/catalog/brands")
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
                <BreadcrumbItem className="hidden md:block">
                  <span className="text-muted-foreground text-sm font-medium">Catalog</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/master-data/catalog/brands">Brands</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create Brand</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-2xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Brand</h1>
            <p className="text-sm text-muted-foreground">Register an equipment manufacturer or service provider brand.</p>
          </div>

          <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
            <h2 className="font-semibold text-base text-primary border-b pb-2">Brand Details</h2>
            <div className="grid gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="code">Brand Code *</Label>
                <Input
                  id="code"
                  name="code"
                  required
                  placeholder="e.g. LNV, DLL, MSFT, AAPL"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Brand Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Lenovo, Dell, Microsoft"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="website">Official Website</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="e.g. lenovo.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe corporate profile, specializations..."
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/master-data/catalog/brands")}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-xs">
              Create Brand
            </Button>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
