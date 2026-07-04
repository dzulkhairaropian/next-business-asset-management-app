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
  ActivityIcon,
  AlertTriangleIcon,
  ArrowUpRightIcon,
  BoxesIcon,
  CircleDollarSignIcon,
  DownloadIcon,
  FilterIcon,
  LaptopIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  WrenchIcon,
} from "lucide-react"

import { columns, Asset } from "./columns"
import { DataTable } from "./data-table"

// Complete asset dataset
const assets: Asset[] = [
  { tag: "DB/NB/210222/013", code: "DBNBMKT-013", name: "Lenovo ThinkPad L14", serial: "PF3K24QA", status: "Ready to Deploy", holder: "Not Assigned", dept: "" },
  { tag: "DB/NB/210801/012", code: "DBNBPRC-001", name: "Dell Latitude 3410", serial: "1T4Y0B3", status: "Deployed", holder: "Grace Ega", dept: "Finance, Accounting & Tax" },
  { tag: "DB/NB/210301/011", code: "DBNBSLS-016", name: "Dell Latitude 3410", serial: "-", status: "Draft", holder: "Not Assigned", dept: "" },
  { tag: "DB/NB/210301/010", code: "DBNBSLS-015", name: "Dell Latitude 3410", serial: "FZ56D63", status: "Deployed", holder: "Meiry", dept: "Sales" },
  { tag: "DB/NB/220301/008", code: "DBNBSLS-014", name: "Dell Vostro 3400", serial: "-", status: "Draft", holder: "Not Assigned", dept: "" },
  { tag: "DB/NB/220301/007", code: "DBNBSLS-013", name: "Dell Vostro 3400", serial: "BZ013G3", status: "Deployed", holder: "Nadya", dept: "Sales" },
  { tag: "DB/NB/211001/009", code: "DBNBSC-007", name: "Lenovo V14 IIL", serial: "-", status: "Draft", holder: "Not Assigned", dept: "" },
  { tag: "DB/NB/220401/006", code: "DBNBSLS-012", name: "Dell Vostro 3400", serial: "BLDKPH3", status: "Deployed", holder: "Doni Eko", dept: "Sales" },
  { tag: "DB/NB/221220/005", code: "DBNBMKT-012", name: "Lenovo IdeaPad Slim 5", serial: "MP2CY9PE", status: "Service", holder: "Not Assigned", dept: "" },
  { tag: "DB/AP/230518/003", code: "DBAPIT-004", name: "Ruijie RG-AP720-L", serial: "G1RP8D1021150", status: "Deployed", holder: "Dzul Khair Aropian", dept: "Information Technology" },
  { tag: "DB/AP/230518/002", code: "DBAPIT-003", name: "Ruijie RG-AP720-L", serial: "G1RP8D1020804", status: "Deployed", holder: "Dzul Khair Aropian", dept: "Information Technology" },
  { tag: "DB/AP/230518/001", code: "DBAPIT-002", name: "Ruijie RG-AP720-L", serial: "G1RP8D1021222", status: "Deployed", holder: "Dzul Khair Aropian", dept: "Information Technology" },
  { tag: "DB/SW/230131/001", code: "DBSWIT-002", name: "Ruijie RG-ES209GC-P", serial: "CAR6096062752", status: "Deployed", holder: "Dzul Khair Aropian", dept: "Information Technology" },
  { tag: "DB/HDD/260630/001", code: "DBHDDIT-001", name: "Western Digital My Passport", serial: "WX32A16529S2", status: "Deployed", holder: "Dzul Khair Aropian", dept: "Information Technology" },
  { tag: "DB/PR/260630/008", code: "DBPRSLS-003", name: "Epson DotMatrix LX - 300 + II", serial: "G8QY085592", status: "Deployed", holder: "Meiry", dept: "Sales" },
  { tag: "DB/PR/260630/007", code: "DBPRSC-003", name: "Epson DotMatrix LX - 310", serial: "-", status: "Draft", holder: "Not Assigned", dept: "" },
  { tag: "DB/PR/260630/006", code: "DBPRSC-002", name: "Canon Pixma G 2010", serial: "-", status: "Draft", holder: "Not Assigned", dept: "" },
  { tag: "DB/PR/191226/005", code: "DBPRMKT-001", name: "Canon Pixma G 2010", serial: "KLHP93703", status: "Deployed", holder: "Monica", dept: "Marketing" },
  { tag: "DB/PR/221115/002", code: "DBPRHR-001", name: "Canon Pixma G 2010", serial: "KNMG66621", status: "Deployed", holder: "Bimby Dessy", dept: "Human Resources & General Affair" },
  { tag: "DB/PR/260630/004", code: "DBPRFAT-004", name: "Canon Pixma G 2010", serial: "-", status: "Draft", holder: "Not Assigned", dept: "" },
  { tag: "DB/PR/240820/003", code: "DBPRFAT-003", name: "Canon Pixma G 3010", serial: "KPGU02786", status: "Deployed", holder: "Diannisa Sisilia", dept: "Finance, Accounting & Tax" },
  { tag: "DB/PR/230113/001", code: "DBPRFAT-002", name: "Canon Pixma G 3010", serial: "KNJV01734", status: "Deployed", holder: "Eva Ryski", dept: "Finance, Accounting & Tax" },
  { tag: "DB/PR/180925/001", code: "DBPRSC-001", name: "Canon Pixma G 3010", serial: "KLMD15175", status: "Deployed", holder: "Ari Kurniadi", dept: "Supply Chain & Logistics" },
  { tag: "DB/PR/220113/001", code: "DBPRPRC-003", name: "Canon Pixma G 3010", serial: "KNJV02234", status: "Deployed", holder: "Grace Ega", dept: "Finance, Accounting & Tax" },
  { tag: "DB/NB/240209/016", code: "DBNBSLS-011", name: "Lenovo IdeaPad Slim 3", serial: "PF4GFDLA", status: "Deployed", holder: "Priyo", dept: "Sales" },
  { tag: "DB/NB/240209/015", code: "DBNBTS-013", name: "ASUS ExpertBook", serial: "N2NXLP00Z98308A", status: "Service", holder: "Not Assigned", dept: "" },
  { tag: "DB/NB/240131/014", code: "DBNBMKT-011", name: "Lenovo IdeaPad Slim 3", serial: "PF47HJKW", status: "Deployed", holder: "Adhitthana", dept: "Marketing" },
  { tag: "DB/NB/240524/013", code: "DBNBMKT-010", name: "Lenovo IdeaPad Slim 3", serial: "PF3S510F", status: "Service", holder: "Not Assigned", dept: "" },
  { tag: "DB/NB/241105/012", code: "DBNBMKT-009", name: "Lenovo IdeaPad Slim 3", serial: "PF4WRAKL", status: "Deployed", holder: "Devi Ayu", dept: "Marketing" },
  { tag: "DB/NB/230515/012", code: "DBNBMKT-008", name: "ASUS Vivobook Z1403ZA", serial: "N6N0LP035550246", status: "Deployed", holder: "Monica", dept: "Marketing" },
  { tag: "DB/NB/210801/008", code: "DBNBMKT-007", name: "Dell Latitude 3410", serial: "BVQ1R93", status: "Deployed", holder: "Achmad Satrio", dept: "Marketing" },
  { tag: "DB/NB/210801/007", code: "DBNBSLS-010", name: "Dell Latitude 3410", serial: "DL51R93", status: "Deployed", holder: "Iqbal", dept: "Sales" },
  { tag: "DB/NB/240318/011", code: "DBNBMKT-006", name: "Lenovo IdeaPad Slim 3", serial: "PF3S2REX", status: "Deployed", holder: "Sofiah Amar", dept: "Marketing" },
  { tag: "DB/NB/240318/010", code: "DBNBHR-003", name: "Lenovo IdeaPad Slim 3", serial: "PF4GCH17", status: "Deployed", holder: "Karudin", dept: "Human Resources & General Affair" },
  { tag: "DB/NB/240710/009", code: "DBNBHR-002", name: "Lenovo IdeaPad Slim 3", serial: "PF4L5DQE", status: "Deployed", holder: "Bimby Dessy", dept: "Human Resources & General Affair" },
  { tag: "DB/NB/210401/006", code: "DBNBHR-001", name: "Dell Latitude 3410", serial: "DL56D63", status: "Deployed", holder: "Khaerunisa Aulia", dept: "Human Resources & General Affair" },
  { tag: "DB/NB/240209/008", code: "DBNBTS-012", name: "Acer Nitro V15", serial: "NHQNASN0013431CC827600", status: "Deployed", holder: "Bramasta", dept: "Technical Support" },
  { tag: "DB/SW/251115/001", code: "DBSWIT-001", name: "TP-Link SG2218", serial: "225412S000288", status: "Deployed", holder: "Dzul Khair Aropian", dept: "Information Technology" },
  { tag: "DB/NB/240319/007", code: "DBNBFAT-015", name: "Lenovo YOGA 7", serial: "YX08G25B", status: "Deployed", holder: "Muliaty", dept: "Finance, Accounting & Tax" },
  { tag: "DB/NB/240222/006", code: "DBNBFAT-014", name: "ASUS P1411CJP", serial: "MBNXCX00J253470", status: "Deployed", holder: "Gunawan", dept: "Finance, Accounting & Tax" },
  { tag: "DB/NB/240222/005", code: "DBNBFAT-013", name: "ASUS P1411CJP", serial: "MBNXCX00K901474", status: "Deployed", holder: "Dian", dept: "Finance, Accounting & Tax" },
  { tag: "DB/NB/241105/004", code: "DBNBFAT-012", name: "Lenovo IdeaPad Slim 3", serial: "PF4WF4EY", status: "Deployed", holder: "Diannisa Sisilia", dept: "Finance, Accounting & Tax" },
  { tag: "DB/NB/241120/003", code: "DBNBFAT-011", name: "Lenovo IdeaPad Slim 5", serial: "MP2NEYQP", status: "Deployed", holder: "Yana", dept: "Finance, Accounting & Tax" },
  { tag: "DB/NB/230222/004", code: "DBNBSLS-009", name: "Lenovo IdeaPad Slim 5", serial: "MP2BQJPE", status: "Ready to Deploy", holder: "Not Assigned", dept: "" },
  { tag: "DB/NB/230301/003", code: "DBNBSLS-008", name: "Lenovo ThinkPad L14", serial: "PF3KNP12", status: "Ready to Deploy", holder: "Not Assigned", dept: "" },
  { tag: "DB/PR/241023/002", code: "DBPRPRC-002", name: "Canon Pixma G 3010", serial: "KNMG92898", status: "Deployed", holder: "Christine Natalia", dept: "Finance, Accounting & Tax" },
  { tag: "DB/PR/240521/001", code: "DBPRFAT-001", name: "Epson DotMatrix LQ - 310", serial: "P9JYJ35766", status: "Deployed", holder: "Eva Ryski", dept: "Finance, Accounting & Tax" },
  { tag: "DB/FW/250721/001", code: "DBFWIT-001", name: "Fortinet Fortigate 71G", serial: "FGT71GTK24003332", status: "Deployed", holder: "Dzul Khair Aropian", dept: "Information Technology" },
  { tag: "DB/NB/241120/002", code: "DBNBMGT-009", name: "Lenovo IdeaPad Slim 5", serial: "MP2NEYNA", status: "Deployed", holder: "Krystal", dept: "Marketing" },
  { tag: "DB/NB/210101/005", code: "DBNBSLS-007", name: "Dell Vostro 3400", serial: "DP64HB3", status: "Deployed", holder: "Ibrahim", dept: "Sales" },
]

export default function AssetManagementPage() {
  const totalAssets = assets.length
  const readyToDeploy = assets.filter((a) => a.status === "Ready to Deploy").length
  const deployed = assets.filter((a) => a.status === "Deployed").length
  const broken = assets.filter(
    (a) => a.status === "Service" || a.status === "Broken / Defective"
  ).length

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                  <BreadcrumbPage>Asset Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <DownloadIcon className="h-3.5 w-3.5" />
              Export Excel
            </Button>
            <Button size="sm" className="h-8 gap-1.5 text-xs" asChild>
              <Link href="/it-assets/create">
                <PlusIcon className="h-3.5 w-3.5" />
                Add Asset
              </Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Asset Management</h1>
            <p className="text-sm text-muted-foreground">Manage and track IT devices across organization locations.</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Total Assets</span>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <BoxesIcon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1">{totalAssets}</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-emerald-500 font-semibold inline-flex items-center gap-0.5">
                  <ArrowUpRightIcon className="h-3 w-3" /> +0%
                </span>{" "}
                from last month
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Ready to Deploy</span>
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <WrenchIcon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1">{readyToDeploy}</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-blue-500 font-semibold">Available</span> in inventory
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Deployed</span>
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <ActivityIcon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1">{deployed}</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-emerald-500 font-semibold">Assigned</span> to employees
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">In Service</span>
                <div className="h-8 w-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <AlertTriangleIcon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1">{broken}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Assets currently in repair
              </p>
            </div>
          </div>

          <DataTable columns={columns} data={assets} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
