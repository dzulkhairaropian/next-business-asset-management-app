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
import {
  BoxesIcon,
  CircleDollarSignIcon,
  UserCheckIcon,
  WrenchIcon,
  PlusIcon,
  CalendarDaysIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  HistoryIcon,
} from "lucide-react"

export default function GeneralAffairsDashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                  <BreadcrumbPage>General Affairs Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <PlusIcon className="h-3.5 w-3.5" />
              Add GA Asset
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Header section */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">General Affairs Dashboard</h1>
            <p className="text-sm text-muted-foreground">Monitor office inventories, furniture allocation, and lease contract schedules.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-6 shadow-xs flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total GA Assets</span>
                <span className="text-3xl font-bold tracking-tight">20</span>
              </div>
              <div className="p-3.5 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                <BoxesIcon className="h-5 w-5" />
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-xs flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Asset Value</span>
                <span className="text-2xl font-bold tracking-tight text-foreground whitespace-nowrap">Rp 595.700.000</span>
              </div>
              <div className="p-3.5 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
                <CircleDollarSignIcon className="h-5 w-5" />
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-xs flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Assignments</span>
                <span className="text-3xl font-bold tracking-tight">0</span>
              </div>
              <div className="p-3.5 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
                <UserCheckIcon className="h-5 w-5" />
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-xs flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pending Maintenance</span>
                <span className="text-3xl font-bold tracking-tight">0</span>
              </div>
              <div className="p-3.5 bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-400">
                <WrenchIcon className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Visual Charts Layout */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Asset Status Distribution */}
            <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col">
              <span className="font-semibold text-sm text-foreground">Asset Status Distribution</span>
              <span className="text-xs text-muted-foreground mt-0.5">Asset operational statuses.</span>
              
              {/* Donut SVG representation */}
              <div className="flex-1 flex flex-col items-center justify-center min-h-[220px] mt-4 relative">
                <svg className="w-40 h-40 transform -rotate-90">
                  {/* Ready to Deploy: 75% (15/20) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="16"
                    className="text-blue-500"
                    strokeDasharray="377"
                    strokeDashoffset="94.25"
                    fill="transparent"
                  />
                  {/* Deployed: 15% (3/20) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="16"
                    className="text-emerald-500"
                    strokeDasharray="377"
                    strokeDashoffset="320.45"
                    fill="transparent"
                  />
                  {/* Service: 10% (2/20) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="16"
                    className="text-rose-500"
                    strokeDasharray="377"
                    strokeDashoffset="358.15"
                    fill="transparent"
                  />
                </svg>
                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6 w-full text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Ready (15)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Deployed (3)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>Service (2)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assets by Category */}
            <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col">
              <span className="font-semibold text-sm text-foreground">Assets by Category</span>
              <span className="text-xs text-muted-foreground mt-0.5">Asset counts per major class.</span>

              <div className="flex-1 flex flex-col justify-center gap-4 mt-6 min-h-[220px]">
                {/* Furniture */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Furniture & Fixtures</span>
                    <span className="text-muted-foreground">10 assets</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "50%" }} />
                  </div>
                </div>

                {/* Office Supplies */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Office Appliances</span>
                    <span className="text-muted-foreground">6 assets</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>

                {/* Security Equipment */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Safety & Security</span>
                    <span className="text-muted-foreground">4 assets</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* GA Asset Investment Timeline */}
            <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col">
              <span className="font-semibold text-sm text-foreground">GA Asset Investment Timeline</span>
              <span className="text-xs text-muted-foreground mt-0.5">Timeline based on Purchase Date.</span>

              <div className="flex-1 flex flex-col items-center justify-end mt-6 min-h-[220px]">
                {/* SVG Line / Bar chart simulation */}
                <div className="relative w-full h-36 flex items-end justify-between border-b pb-1 font-mono text-[9px] text-muted-foreground">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="h-12 w-6 bg-blue-500/20 hover:bg-blue-500/40 rounded transition-colors" />
                    <span>2023</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="h-20 w-6 bg-blue-500/20 hover:bg-blue-500/40 rounded transition-colors" />
                    <span>2024</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="h-28 w-6 bg-blue-500/40 hover:bg-blue-500/60 rounded transition-colors" />
                    <span>2025</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="h-32 w-6 bg-primary hover:bg-primary/95 rounded transition-colors" />
                    <span>2026</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-5 self-start">
                  <TrendingUpIcon className="h-4 w-4" />
                  <span>Purchases peaking in Q2 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Useful Additional Insights (Improvement) */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* GA Maintenance Alerts & Contract Expiries */}
            <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col gap-4">
              <div>
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
                  Upcoming Facility Maintenance & Leases
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Critical facility tasks needing attention.</p>
              </div>

              <div className="flex flex-col gap-3 flex-1 justify-center">
                <div className="flex items-center justify-between border-b pb-2 text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">AC Periodic Maintenance</span>
                    <span className="text-[10px] text-muted-foreground">Contractor: PT. CoolAir Indonesia</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-semibold font-mono whitespace-nowrap">12 Jul 2026</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2 text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">Office Fire Extinguisher Refill</span>
                    <span className="text-[10px] text-muted-foreground">Vendor: FireGuard Tech</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-semibold font-mono whitespace-nowrap">Expired</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">Office HQ Building Lease Renewal</span>
                    <span className="text-[10px] text-muted-foreground">Billing: Annual payment due</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-semibold font-mono whitespace-nowrap">01 Aug 2026</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col gap-4">
              <div>
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-blue-500" />
                  General Affairs Operations
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Common administrative workflows.</p>
              </div>

              <div className="grid grid-cols-2 gap-2 flex-1 items-center">
                <Button variant="outline" size="sm" className="h-9 text-xs font-semibold bg-background justify-start px-3.5">
                  Register Asset
                </Button>
                <Button variant="outline" size="sm" className="h-9 text-xs font-semibold bg-background justify-start px-3.5">
                  Allocate Supplies
                </Button>
                <Button variant="outline" size="sm" className="h-9 text-xs font-semibold bg-background justify-start px-3.5">
                  New Maintenance
                </Button>
                <Button variant="outline" size="sm" className="h-9 text-xs font-semibold bg-background justify-start px-3.5">
                  Audit Assets
                </Button>
              </div>
            </div>

            {/* Supply Stock Health */}
            <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col gap-4">
              <div>
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <HistoryIcon className="h-4 w-4 text-emerald-500" />
                  Office Supplies Stock Alert
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Supplies approaching critical thresholds.</p>
              </div>

              <div className="flex flex-col gap-3 flex-1 justify-center">
                <div className="flex items-center justify-between text-xs">
                  <span>A4 Copy Paper (80gsm)</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">2 boxes left (Min: 5)</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "40%" }} />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span>Pantry Drinking Water Gallons</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">4 items left (Min: 6)</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "66%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Tables layout */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Assignments Table */}
            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
              <div className="p-6 border-b bg-muted/10">
                <h3 className="font-semibold text-sm text-foreground">Recent Assignments</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Latest allocations of general facility items.</p>
              </div>
              <div className="p-8 text-center text-muted-foreground italic flex flex-col items-center justify-center min-h-[160px] gap-2">
                <span className="text-xs text-muted-foreground">No recent assignments found</span>
                <Button size="xs" variant="outline" className="mt-1 font-semibold">
                  Assign GA Asset
                </Button>
              </div>
            </div>

            {/* Recent Maintenance Table */}
            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
              <div className="p-6 border-b bg-muted/10">
                <h3 className="font-semibold text-sm text-foreground">Recent Maintenance</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Facility repairs and servicing log.</p>
              </div>
              <div className="p-8 text-center text-muted-foreground italic flex flex-col items-center justify-center min-h-[160px] gap-2">
                <span className="text-xs text-muted-foreground">No recent maintenance logs found</span>
                <Button size="xs" variant="outline" className="mt-1 font-semibold">
                  Schedule Repair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
