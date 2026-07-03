"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpRight, ArrowDownLeft, RotateCcw, Wrench } from "lucide-react"

export type GaTxn = {
  id: string
  date: string
  assetName: string
  assetTag: string
  type: "Checkout" | "Restock" | "Return" | "Maintenance"
  processor: string
  notes: string
}

export const columns: ColumnDef<GaTxn>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{row.getValue("date")}</span>,
  },
  {
    accessorKey: "assetName",
    header: "Asset",
    cell: ({ row }) => {
      const txn = row.original
      return (
        <div>
          <span className="font-semibold text-foreground block text-sm">{txn.assetName}</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5 font-mono">{txn.assetTag}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      let icon = <ArrowUpRight className="h-3.5 w-3.5 text-blue-500" />
      let colorClass = "text-blue-600 dark:text-blue-400"
      
      if (type === "Restock") {
        icon = <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-500" />
        colorClass = "text-emerald-600 dark:text-emerald-400"
      } else if (type === "Return") {
        icon = <RotateCcw className="h-3.5 w-3.5 text-purple-500" />
        colorClass = "text-purple-600 dark:text-purple-400"
      } else if (type === "Maintenance") {
        icon = <Wrench className="h-3.5 w-3.5 text-rose-500" />
        colorClass = "text-rose-600 dark:text-rose-400"
      }

      return (
        <span className="inline-flex items-center gap-1 font-medium text-xs">
          {icon}
          <span className={colorClass}>{type}</span>
        </span>
      )
    },
  },
  {
    accessorKey: "processor",
    header: "Processor",
    cell: ({ row }) => <span className="text-xs text-foreground font-medium">{row.getValue("processor")}</span>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.getValue("notes")}</span>,
  },
]
