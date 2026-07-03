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
import {
  AlertTriangleIcon,
  QrCodeIcon,
  EditIcon,
  UserCheckIcon,
  WrenchIcon,
  ChevronRight,
} from "lucide-react"

export default function AssetDetailsPage() {
  const [activeTab, setActiveTab] = React.useState("details")
  const [showQr, setShowQr] = React.useState(false)

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
                  <BreadcrumbPage>Asset Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 max-w-5xl mx-auto w-full">
          {/* Aging Alert */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-200/50 bg-amber-500/5 p-4 text-amber-800 dark:text-amber-300">
            <AlertTriangleIcon className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold block">Aging Alert</span>
              This asset is 5 years old (Released on 22 Feb 2021). It has reached or exceeded its 4-year lifecycle since release and may require replacement or retirement.
            </div>
          </div>

          {/* Header Overview Card */}
          <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">DB/NB/210222/013</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  Ready to Deploy
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  5 years old
                </span>
              </div>
              <p className="text-sm text-muted-foreground">DBNBMKT-013 • Lenovo ThinkPad L14 • S/N: PF3K24QA</p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 text-xs font-semibold"
                onClick={() => setShowQr(!showQr)}
              >
                <QrCodeIcon className="h-4 w-4" />
                QR Label
              </Button>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs font-semibold" asChild>
                <Link href="/it-assets/edit">
                  <EditIcon className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button size="sm" className="h-9 gap-1.5 text-xs font-semibold bg-primary text-primary-foreground" asChild>
                <Link href="/it-assets/checkout">
                  <UserCheckIcon className="h-4 w-4" />
                  Check-out
                </Link>
              </Button>
              <Button variant="secondary" size="sm" className="h-9 gap-1.5 text-xs font-semibold" asChild>
                <Link href="/it-assets/maintenance">
                  <WrenchIcon className="h-4 w-4" />
                  Maintenance
                </Link>
              </Button>
            </div>
          </div>

          {/* Interactive QR Label Modal/Card */}
          {showQr && (
            <div className="rounded-xl border bg-card p-6 shadow-md flex flex-col items-center justify-center gap-4 max-w-sm mx-auto animate-in zoom-in-95 duration-200">
              <span className="font-semibold text-sm">QR Code Label</span>
              <div className="h-40 w-40 bg-muted flex items-center justify-center border rounded-lg">
                {/* Mock QR Code representation */}
                <div className="text-center p-4">
                  <QrCodeIcon className="h-24 w-24 mx-auto text-foreground/75" />
                  <span className="text-[10px] font-mono block mt-2">DB/NB/210222/013</span>
                </div>
              </div>
              <Button size="xs" variant="outline" onClick={() => setShowQr(false)}>Close</Button>
            </div>
          )}

          {/* Bottom Grid Layout */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left side info cards */}
            <div className="md:col-span-1 flex flex-col gap-6">
              {/* Current Assignment */}
              <div className="rounded-xl border bg-card p-5 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold block uppercase tracking-wider">Current Assignment</span>
                <span className="text-sm font-medium text-foreground block mt-2">Not currently assigned</span>
              </div>

              {/* System Info */}
              <div className="rounded-xl border bg-card p-5 shadow-xs flex flex-col gap-4">
                <h3 className="font-semibold text-sm border-b pb-2 text-primary">System Info</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between border-b pb-1.5 text-xs">
                    <span className="text-muted-foreground">OS</span>
                    <span className="font-semibold text-foreground">-</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5 text-xs">
                    <span className="text-muted-foreground">Serial Number</span>
                    <span className="font-semibold text-foreground font-mono">PF3K24QA</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Warranty Expiry</span>
                    <span className="font-semibold text-foreground">-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side details / tabs */}
            <div className="md:col-span-2 rounded-xl border bg-card shadow-xs overflow-hidden flex flex-col">
              {/* Tab headers */}
              <div className="flex border-b bg-muted/20">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-6 py-3.5 text-xs font-semibold border-b-2 transition-all ${
                    activeTab === "details" ? "border-primary text-primary bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("movement")}
                  className={`px-6 py-3.5 text-xs font-semibold border-b-2 transition-all ${
                    activeTab === "movement" ? "border-primary text-primary bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Movement History
                </button>
                <button
                  onClick={() => setActiveTab("maintenance")}
                  className={`px-6 py-3.5 text-xs font-semibold border-b-2 transition-all ${
                    activeTab === "maintenance" ? "border-primary text-primary bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Maintenance History
                </button>
              </div>

              {/* Tab contents */}
              <div className="p-6 flex-1">
                {activeTab === "details" && (
                  <div className="flex flex-col gap-6">
                    {/* Brand & Model */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Brand & Model</span>
                        <span className="text-sm font-medium text-foreground">Lenovo ThinkPad L14</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Category</span>
                        <span className="text-sm font-medium text-foreground">Notebook</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Serial Number</span>
                        <span className="text-sm font-medium text-foreground font-mono">PF3K24QA</span>
                      </div>
                      <div className="flex flex-col gap-0.5 mt-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Product Number</span>
                        <span className="text-sm font-medium text-foreground">-</span>
                      </div>
                      <div className="flex flex-col gap-0.5 mt-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Vendor</span>
                        <span className="text-sm font-medium text-foreground">-</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Technical Specs */}
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-2">Technical Specifications</span>
                      <span className="text-sm text-muted-foreground italic">No specifications provided.</span>
                    </div>

                    <Separator />

                    {/* Financial Data */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Purchase Date</span>
                        <span className="text-sm font-medium text-foreground">-</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Purchase Cost</span>
                        <span className="text-sm font-medium text-foreground">Rp 0.00</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Invoice</span>
                        <span className="text-sm font-medium text-foreground">-</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Asset Aging</span>
                        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">5 years old</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "movement" && (
                  <div className="flex flex-col gap-4 text-sm text-muted-foreground italic">
                    No movement records found for this asset.
                  </div>
                )}

                {activeTab === "maintenance" && (
                  <div className="flex flex-col gap-4 text-sm text-muted-foreground italic">
                    No maintenance log entries.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
