"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export type ConsumableTxn = {
  id: string
  date: string
  product: string
  brand: string
  type: "Checkout" | "Restock"
  qtyChange: string
  qtyTransition: string
  totalCost: number
  unitCost: number
  toUser: string
  byUser: string
  docs: string
  notes: string
}

export const columns: ColumnDef<ConsumableTxn>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{row.getValue("date")}</span>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const txn = row.original
      return (
        <div>
          <span className="font-semibold text-foreground block text-sm">{txn.product}</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5">Brand: {txn.brand}</span>
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
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400">Checkout</span>
            </>
          ) : (
            <>
              <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Restock</span>
            </>
          )}
        </span>
      )
    },
  },
  {
    id: "qty_before_after",
    header: "Qty Before / After",
    accessorKey: "qtyChange",
    cell: ({ row }) => {
      const txn = row.original
      const isPositive = txn.qtyChange.startsWith("+")
      return (
        <div>
          <span className={`font-mono text-sm font-bold block ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
            {txn.qtyChange}
          </span>
          <span className="text-[10px] text-muted-foreground block font-mono mt-0.5">{txn.qtyTransition}</span>
        </div>
      )
    },
  },
  {
    id: "cost",
    header: "Cost",
    accessorKey: "totalCost",
    cell: ({ row }) => {
      const txn = row.original
      const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 2,
        }).format(val)
      }
      return (
        <div className="font-mono text-[11px] leading-tight">
          <span className="text-foreground block"><span className="text-muted-foreground">Total:</span> {formatCurrency(txn.totalCost)}</span>
          <span className="text-muted-foreground block mt-0.5"><span className="text-muted-foreground/75">Unit:</span> {formatCurrency(txn.unitCost)}</span>
        </div>
      )
    },
  },
  {
    id: "checked_out_to",
    header: "Checked Out To / Processor",
    accessorKey: "toUser",
    cell: ({ row }) => {
      const txn = row.original
      return (
        <div className="leading-tight text-xs">
          <span className="text-foreground block"><span className="text-muted-foreground">To:</span> {txn.toUser}</span>
          <span className="text-muted-foreground block mt-0.5"><span className="text-muted-foreground/75">By:</span> {txn.byUser}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "docs",
    header: "Docs",
    cell: ({ row }) => {
      const docs = row.getValue("docs") as string
      if (docs === "-") return <span className="text-muted-foreground">-</span>
      return (
        <Button variant="outline" size="sm" className="h-6 text-[10px] px-1.5 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-background font-semibold">
          {docs}
        </Button>
      )
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string
      return <span className="text-xs text-muted-foreground whitespace-nowrap">{notes}</span>
    },
  },
]
