"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon, EyeIcon, EditIcon, ArrowUpRightIcon, TrashIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export type Asset = {
  tag: string
  code: string
  name: string
  serial: string
  status: string
  holder: string
  dept: string
}

export const columns: ColumnDef<Asset>[] = [
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
    id: "asset",
    header: "Asset Tag / Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <div>
          <span className="font-semibold block font-mono text-xs text-muted-foreground">{asset.tag}</span>
          <span className="font-medium text-foreground block mt-0.5">{asset.name}</span>
        </div>
      )
    },
  },
  {
    id: "product",
    header: "Product / Serial",
    accessorKey: "code",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <div>
          <span className="font-semibold font-mono text-xs text-foreground block">{asset.code}</span>
          <span className="text-xs text-muted-foreground block mt-0.5">S/N: {asset.serial}</span>
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
      if (status === "Deployed") {
        statusBadge = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      } else if (status === "Ready to Deploy") {
        statusBadge = "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      } else if (status === "Service") {
        statusBadge = "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      } else if (status === "Draft") {
        statusBadge = "bg-amber-500/10 text-amber-600 dark:text-amber-400"
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
    accessorKey: "holder",
    header: "Holder",
    cell: ({ row }) => {
      const asset = row.original
      if (asset.holder === "Not Assigned") {
        return <span className="text-muted-foreground text-xs">Not Assigned</span>
      }
      return (
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
            {asset.holder.charAt(0)}
          </div>
          <div className="leading-tight">
            <span className="font-semibold text-foreground block text-xs">{asset.holder}</span>
            <span className="text-[10px] text-muted-foreground block">{asset.dept}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "dept",
    header: "Department",
  },
  {
    id: "category",
    header: "Category",
    accessorFn: (row) => {
      if (row.tag.includes("/NB/")) return "Notebook"
      if (row.tag.includes("/PR/")) return "Printer"
      if (row.tag.includes("/AP/") || row.tag.includes("/SW/") || row.tag.includes("/FW/")) return "Network / IT Equipment"
      if (row.tag.includes("/HDD/")) return "Storage"
      return "Other"
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
              <DropdownMenuItem asChild>
                <Link href="/it-assets/details" className="flex items-center">
                  <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/it-assets/edit" className="flex items-center">
                  <EditIcon className="mr-2 h-3.5 w-3.5" />
                  Edit Asset
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/it-assets/checkout" className="flex items-center">
                  <ArrowUpRightIcon className="mr-2 h-3.5 w-3.5 text-blue-500" />
                  Checkout
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => alert(`Deleting asset: ${asset.tag}`)}
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
