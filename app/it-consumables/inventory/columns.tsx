"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreVerticalIcon, ArrowUpRightIcon, ArrowDownLeftIcon, EditIcon, TrashIcon } from "lucide-react"

export type Consumable = {
  id: string
  name: string
  model: string
  category: string
  brand: string
  qty: number
  minQty: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  cost: number
}

export const columns: ColumnDef<Consumable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const item = row.original
      return (
        <div>
          <span className="font-semibold text-foreground block text-sm">{item.name}</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5">Model: {item.model}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category / Brand",
    cell: ({ row }) => {
      const item = row.original
      return (
        <div>
          <span className="font-medium text-foreground block text-xs">{item.category}</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5">Brand: {item.brand}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "qty",
    header: "Qty / Threshold",
    cell: ({ row }) => {
      const item = row.original
      return (
        <div>
          <span className="font-mono text-sm font-semibold text-foreground block">{item.qty} items</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5 font-mono">Min: {item.minQty}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let statusBadge = "bg-muted text-muted-foreground"
      if (status === "In Stock") {
        statusBadge = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      } else if (status === "Low Stock") {
        statusBadge = "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      } else if (status === "Out of Stock") {
        statusBadge = "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      }

      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge}`}>
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "cost",
    header: "Purchase Cost",
    cell: ({ row }) => {
      const cost = row.getValue("cost") as number
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      }).format(cost)
      return <span className="font-mono text-xs font-medium text-foreground">{formatted}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 text-xs">
              <DropdownMenuItem onClick={() => alert(`Checkout consumable: ${item.name}`)}>
                <ArrowUpRightIcon className="mr-2 h-3.5 w-3.5 text-blue-500" />
                Checkout / Issue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Restock consumable: ${item.name}`)}>
                <ArrowDownLeftIcon className="mr-2 h-3.5 w-3.5 text-emerald-500" />
                Restock Item
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Editing consumable: ${item.name}`)}>
                <EditIcon className="mr-2 h-3.5 w-3.5" />
                Edit Consumable
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => alert(`Deleting consumable: ${item.name}`)}
                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20"
              >
                <TrashIcon className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
