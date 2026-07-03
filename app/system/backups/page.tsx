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
import { DownloadIcon, Trash2Icon, SaveIcon, DatabaseIcon, HardDriveDownloadIcon } from "lucide-react"

export default function BackupManagementPage() {
  const [dbFreq, setDbFreq] = React.useState("Daily")
  const [dbTime, setDbTime] = React.useState("08:30")
  const [fullFreq, setFullFreq] = React.useState("Weekly")
  const [fullTime, setFullTime] = React.useState("03:00")

  const [history, setHistory] = React.useState([
    { name: "2026-06-17-13-31-44.zip", size: "43.02 KB", date: "2026-06-17 06:31:45" },
    { name: "2026-06-15-14-49-11.zip", size: "41.89 KB", date: "2026-06-15 07:49:12" },
  ])

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Backup schedules updated successfully! (Mock action)")
    console.log({ dbFreq, dbTime, fullFreq, fullTime })
  }

  const triggerBackup = (type: string) => {
    alert(`Triggering ${type} backup. Please wait...`)
    setTimeout(() => {
      const now = new Date()
      const formattedName = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}.zip`
      const newFile = {
        name: formattedName,
        size: type === "DB Only" ? "42.50 KB" : "12.45 MB",
        date: now.toLocaleString(),
      }
      setHistory((prev) => [newFile, ...prev])
      alert("Backup successfully generated!")
    }, 1500)
  }

  const handleDeleteBackup = (fileName: string) => {
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
      setHistory((prev) => prev.filter((f) => f.name !== fileName))
    }
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
                  <BreadcrumbPage>Backup Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-1.5 border-b pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Backup Management</h1>
            <p className="text-sm text-muted-foreground">Schedule automated database exports and trigger on-demand system backups.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Backup Schedules */}
            <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col gap-4">
              <h2 className="font-semibold text-base text-primary border-b pb-2">Backup Schedules</h2>
              <form onSubmit={handleSaveSchedule} className="flex flex-col gap-4">
                {/* DB Backup */}
                <div className="flex flex-col gap-3 p-3 border rounded-lg bg-muted/10">
                  <span className="text-xs font-bold text-foreground block">Database Backup</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="dbFreq" className="text-[10px] uppercase font-semibold text-muted-foreground">Frequency</Label>
                      <select
                        id="dbFreq"
                        value={dbFreq}
                        onChange={(e) => setDbFreq(e.target.value)}
                        className="h-8 px-2 rounded border border-input bg-background text-xs"
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="dbTime" className="text-[10px] uppercase font-semibold text-muted-foreground">Run Time</Label>
                      <Input
                        id="dbTime"
                        type="time"
                        value={dbTime}
                        onChange={(e) => setDbTime(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Full Backup */}
                <div className="flex flex-col gap-3 p-3 border rounded-lg bg-muted/10">
                  <span className="text-xs font-bold text-foreground block">Full Backup (App + DB)</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="fullFreq" className="text-[10px] uppercase font-semibold text-muted-foreground">Frequency</Label>
                      <select
                        id="fullFreq"
                        value={fullFreq}
                        onChange={(e) => setFullFreq(e.target.value)}
                        className="h-8 px-2 rounded border border-input bg-background text-xs"
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="fullTime" className="text-[10px] uppercase font-semibold text-muted-foreground">Run Time</Label>
                      <Input
                        id="fullTime"
                        type="time"
                        value={fullTime}
                        onChange={(e) => setFullTime(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" size="sm" className="h-9 gap-1.5 self-end">
                  <SaveIcon className="h-4 w-4" />
                  Save Schedule
                </Button>
              </form>
            </div>

            {/* Manual Backup */}
            <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base text-primary border-b pb-2">Manual Backup</h2>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Trigger an on-demand backup. Backing up the whole application may take a minute or two depending on files size.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  variant="outline"
                  onClick={() => triggerBackup("DB Only")}
                  className="h-10 justify-start gap-2.5 font-semibold text-xs text-foreground bg-background"
                >
                  <DatabaseIcon className="h-4 w-4 text-blue-500" />
                  Backup Database Only
                </Button>
                <Button
                  onClick={() => triggerBackup("Full")}
                  className="h-10 justify-start gap-2.5 font-semibold text-xs"
                >
                  <HardDriveDownloadIcon className="h-4 w-4 text-primary-foreground" />
                  Backup Application & Database
                </Button>
              </div>
            </div>
          </div>

          {/* Backup History */}
          <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between bg-muted/10">
              <div>
                <h2 className="font-semibold text-base text-primary">Backup History</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{history.length} files found</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-muted-foreground text-xs uppercase tracking-wider bg-muted/20">
                    <th className="px-6 py-4 font-semibold">File Name</th>
                    <th className="px-6 py-4 font-semibold">Size</th>
                    <th className="px-6 py-4 font-semibold">Created At</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {history.map((file, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground block font-mono text-xs">{file.name}</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                        {file.date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => alert(`Downloading ${file.name}`)}
                          >
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                            onClick={() => handleDeleteBackup(file.name)}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                        No backup archives generated.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
