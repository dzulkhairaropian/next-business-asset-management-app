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

export default function CreateStatusPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    masterCategory: "",
    icon: "",
    colorTheme: "Success (Green)",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Status configuration successfully created! (Mock action)")
    console.log("Submitted Status Data:", formData)
    window.history.back()
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
                  <BreadcrumbLink href="/master-data/support-data/statuses">Statuses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create Status</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-6 max-w-2xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Status</h1>
            <p className="text-sm text-muted-foreground">Register a new transactional or lifecycle status code configuration.</p>
          </div>

          <div className="grid gap-5 rounded-xl border bg-card p-6 shadow-xs">
            <h2 className="font-semibold text-base text-primary border-b pb-2">General Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="name">Status Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g., Ready to Deploy"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

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
                  <option value="IT Asset">IT Asset</option>
                  <option value="Consumable">Consumable</option>
                  <option value="Request">Request</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="icon">Icon (Lucide Class)</Label>
                <Input
                  id="icon"
                  name="icon"
                  placeholder="e.g., lucide-check"
                  value={formData.icon}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="colorTheme">Color Theme</Label>
                <select
                  id="colorTheme"
                  name="colorTheme"
                  value={formData.colorTheme}
                  onChange={handleChange}
                  className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Success (Green)">Success (Green)</option>
                  <option value="Info (Blue)">Info (Blue)</option>
                  <option value="Warning (Amber)">Warning (Amber)</option>
                  <option value="Danger (Red)">Danger (Red)</option>
                  <option value="Neutral (Gray)">Neutral (Gray)</option>
                  <option value="Sky (Sky Blue)">Sky (Sky Blue)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>

          {/* Buttons footer */}
          <div className="flex items-center justify-end gap-3 border-t pt-6 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                alert("Status saved as Draft and form reset!")
                setFormData({ name: "", masterCategory: "", icon: "", colorTheme: "Success (Green)", description: "" })
              }}
              className="text-xs font-semibold"
            >
              Create & Create New
            </Button>
            <Button type="submit" className="text-xs font-semibold">
              Create Status
            </Button>
          </div>
        </form>
      </SidebarInset>
    </SidebarProvider>
  )
}
