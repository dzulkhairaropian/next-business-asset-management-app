"use client"

import { ColumnDef } from "@tanstack/react-table"

export type AssignedAsset = {
  tag: string
  code: string
  name: string
  category: string
  spec: string
  serialNumber: string
  status: string
  assignedAt: string
  location: string
}

export const columns: ColumnDef<AssignedAsset>[] = [
  {
    id: "asset",
    header: "Asset Tag / Name",
    accessorKey: "tag",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <div>
          <span className="font-semibold text-primary font-mono text-xs block">{asset.tag}</span>
          <span className="text-[10px] text-muted-foreground block font-mono mt-0.5">{asset.code}</span>
          <span className="font-semibold text-foreground text-sm block mt-0.5">{asset.name}</span>
        </div>
      )
    },
  },
  {
    id: "details",
    header: "Product Details",
    accessorKey: "category",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <div className="leading-normal max-w-xs">
          <span className="font-medium text-foreground text-xs bg-muted px-2 py-0.5 rounded border inline-block mb-1">
            {asset.category}
          </span>
          <p className="text-xs text-muted-foreground line-clamp-2">{asset.spec}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
    cell: ({ row }) => <span className="font-mono text-xs text-foreground">{row.getValue("serialNumber")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "assignedAt",
    header: "Assigned At",
    cell: ({ row }) => <span className="text-xs text-muted-foreground font-medium font-mono">{row.getValue("assignedAt")}</span>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const loc = row.getValue("location") as string
      if (loc === "-") return <span className="text-muted-foreground">-</span>
      return <span className="text-xs text-foreground font-medium">{loc}</span>
    },
  },
]
