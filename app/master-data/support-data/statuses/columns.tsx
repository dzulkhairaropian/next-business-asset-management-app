"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon } from "lucide-react"

export type StatusConfig = {
  id: string
  name: string
  masterCategory: string
  styleColor: "amber" | "blue" | "emerald" | "sky" | "rose" | "red" | "gray"
}

export const columns: ColumnDef<StatusConfig>[] = [
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
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      // Generate two letter initials
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)

      return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase shrink-0">
            {initials}
          </div>
          <span className="font-semibold text-foreground text-sm">{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "masterCategory",
    header: "Master Category",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.getValue("masterCategory")}</span>,
  },
  {
    id: "style_preview",
    header: "Style",
    accessorKey: "styleColor",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const styleColor = row.getValue("styleColor") as string
      
      let badgeStyle = "bg-muted text-muted-foreground"
      if (styleColor === "emerald") badgeStyle = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      else if (styleColor === "amber") badgeStyle = "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      else if (styleColor === "blue") badgeStyle = "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      else if (styleColor === "sky") badgeStyle = "bg-sky-500/10 text-sky-600 dark:text-sky-400"
      else if (styleColor === "rose" || styleColor === "red") badgeStyle = "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      else if (styleColor === "gray") badgeStyle = "bg-muted text-muted-foreground border"

      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeStyle}`}>
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
          {name}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <div className="text-right">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]
