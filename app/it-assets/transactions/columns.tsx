"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreVerticalIcon, ArrowUpRightIcon, ArrowDownLeftIcon, EyeIcon, PrinterIcon, BanIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Transaction = {
  id: string
  assetTag: string
  assetName: string
  type: "Checkout" | "Checkin"
  qty: number
  userName: string
  dept: string
  date: string
  status: "Completed" | "Pending" | "Overdue"
  bast: boolean
  notes: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Txn ID",
    cell: ({ row }) => <span className="font-mono font-semibold text-xs text-muted-foreground">{row.getValue("id")}</span>,
  },
  {
    id: "asset",
    header: "Asset Tag / Name",
    accessorKey: "assetName",
    cell: ({ row }) => {
      const txn = row.original
      return (
        <div>
          <span className="font-mono text-xs text-muted-foreground block">{txn.assetTag}</span>
          <span className="font-medium text-foreground block mt-0.5">{txn.assetName}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <span className="inline-flex items-center gap-1 font-medium text-xs">
          {type === "Checkout" ? (
            <>
              <ArrowUpRightIcon className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400">Checkout</span>
            </>
          ) : (
            <>
              <ArrowDownLeftIcon className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Checkin</span>
            </>
          )}
        </span>
      )
    },
  },
  {
    accessorKey: "qty",
    header: "Qty",
    cell: ({ row }) => <span className="font-mono text-muted-foreground">{row.getValue("qty")} pcs</span>,
  },
  {
    id: "holder",
    header: "To User / Dept",
    accessorKey: "userName",
    cell: ({ row }) => {
      const txn = row.original
      return (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] uppercase">
            {txn.userName.charAt(0)}
          </div>
          <div className="leading-tight">
            <span className="font-semibold text-foreground block text-xs">{txn.userName}</span>
            <span className="text-[10px] text-muted-foreground block">{txn.dept}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.getValue("date")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let statusBadge = "bg-muted text-muted-foreground"
      if (status === "Completed") {
        statusBadge = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      } else if (status === "Pending") {
        statusBadge = "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      } else if (status === "Overdue") {
        statusBadge = "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      }

      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBadge}`}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "bast",
    header: "BAST",
    cell: ({ row }) => {
      const hasBast = row.getValue("bast") as boolean
      if (!hasBast) return <span className="text-muted-foreground">-</span>
      return (
        <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-background font-semibold">
          PDF
        </Button>
      )
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string
      return <span className="text-xs text-muted-foreground">{notes || "-"}</span>
    },
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
              <DropdownMenuItem onClick={() => alert(`Viewing BAST details for Transaction: ${txn.id}`)}>
                <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                View BAST Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Printing transaction receipt for ${txn.id}`)}>
                <PrinterIcon className="mr-2 h-3.5 w-3.5" />
                Print Receipt
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
