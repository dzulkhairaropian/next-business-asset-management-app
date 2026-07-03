"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ArrowUpRight, ArrowDownLeft, RotateCcw, Wrench, MoreVerticalIcon, Eye, Printer, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      let icon = <ArrowUpRightIcon className="h-3.5 w-3.5 text-blue-500" />
      let colorClass = "text-blue-600 dark:text-blue-400"
      
      if (type === "Restock") {
        icon = <ArrowDownLeftIcon className="h-3.5 w-3.5 text-emerald-500" />
        colorClass = "text-emerald-600 dark:text-emerald-400"
      } else if (type === "Return") {
        icon = <RotateCcwIcon className="h-3.5 w-3.5 text-purple-500" />
        colorClass = "text-purple-600 dark:text-purple-400"
      } else if (type === "Maintenance") {
        icon = <WrenchIcon className="h-3.5 w-3.5 text-rose-500" />
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
  {
    id: "actions",
    cell: ({ row }) => {
      const txn = row.original
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreVerticalIcon className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 text-xs">
              <DropdownMenuItem onClick={() => alert(`Viewing details for Transaction: ${txn.id}`)}>
                <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                View Txn Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Printing BAST / receipt for ${txn.id}`)}>
                <PrinterIcon className="mr-2 h-3.5 w-3.5" />
                Print BAST
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => alert(`Void transaction: ${txn.id}`)}
                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20"
              >
                <BanIcon className="mr-2 h-3.5 w-3.5" />
                Void Transaction
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
