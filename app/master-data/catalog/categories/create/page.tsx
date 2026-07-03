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

export default function CreateCategoryPage() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    code: "",
    name: "",
    masterCategory: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Category successfully created! (Mock action)")
    console.log("Category Form Submitted:", formData)
    router.push("/master-data/catalog/categories")
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
                  <BreadcrumbLink href="/master-data/catalog/categories">Categories</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create Category</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-2xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Category</h1>
            <p className="text-sm text-muted-foreground">Define a sub-category under a specific Master Category classification.</p>
          </div>

          <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
            <h2 className="font-semibold text-base text-primary border-b pb-2">Category Details</h2>
            <div className="grid gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="masterCategory">Master Category *</Label>
                <select
                  id="masterCategory"
                  name="masterCategory"
                  required
                  value={formData.masterCategory}
                  onChange={handleChange}
                  className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">Select Master Category</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Facilities">Facilities</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="code">Category Code *</Label>
                <Input
                  id="code"
                  name="code"
                  required
                  placeholder="e.g. NTB, PRT, CLD"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Notebook, Cloud License"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/master-data/catalog/categories")}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-xs">
              Create Category
            </Button>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
