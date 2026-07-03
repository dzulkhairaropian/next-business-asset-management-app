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
import { MoreVerticalIcon, EyeIcon, EditIcon, ArrowUpRightIcon, TrashIcon } from "lucide-react"

export type GaAsset = {
  id: string
  name: string
  tag: string
  serial: string
  status: string
  category: string
  subcategory: string
  value: number
  assignedTo: string
}

export const columns: ColumnDef<GaAsset>[] = [
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
    header: "Asset",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <div>
          <span className="font-semibold text-foreground block text-sm">{asset.name}</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5 font-mono">
            {asset.tag} • S/N: {asset.serial}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let badgeStyle = "bg-muted text-muted-foreground"
      if (status === "Available") {
        badgeStyle = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      } else if (status === "Assigned") {
        badgeStyle = "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      } else if (status === "Maintenance") {
        badgeStyle = "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      }

      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeStyle}`}>
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <div>
          <span className="font-medium text-foreground block text-xs">{asset.category}</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5">{asset.subcategory}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "value",
    header: "Value (Rp)",
    cell: ({ row }) => {
      const val = row.getValue("value") as number
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(val)
      return <span className="font-mono text-xs font-semibold text-foreground">{formatted}</span>
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assigned = row.getValue("assignedTo") as string
      if (assigned === "Not Assigned") {
        return <span className="text-xs text-muted-foreground italic">Not Assigned</span>
      }
      return <span className="text-xs font-medium text-foreground">{assigned}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 text-xs">
              <DropdownMenuItem onClick={() => alert(`Viewing details of GA Asset: ${asset.name} (${asset.tag})`)}>
                <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Editing GA Asset: ${asset.name} (${asset.tag})`)}>
                <EditIcon className="mr-2 h-3.5 w-3.5" />
                Edit Asset
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Checking out GA Asset: ${asset.name} (${asset.tag})`)}>
                <ArrowUpRightIcon className="mr-2 h-3.5 w-3.5 text-blue-500" />
                Checkout / Assign
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => alert(`Deleting GA Asset: ${asset.name} (${asset.tag})`)}
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
