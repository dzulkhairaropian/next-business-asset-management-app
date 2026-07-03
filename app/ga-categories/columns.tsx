"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon } from "lucide-react"

export type GaCategory = {
  id: string
  name: string
  prefixCode: string
  depreciationMethod: string
  usefulLife: string
}

export const columns: ColumnDef<GaCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-semibold text-foreground text-sm">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "prefixCode",
    header: "Prefix Code",
    cell: ({ row }) => {
      const code = row.getValue("prefixCode") as string
      if (code === "-") return <span className="text-muted-foreground">-</span>
      return <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded border text-muted-foreground">{code}</span>
    },
  },
  {
    accessorKey: "depreciationMethod",
    header: "Depreciation Method",
    cell: ({ row }) => <span className="text-xs text-foreground font-medium">{row.getValue("depreciationMethod")}</span>,
  },
  {
    accessorKey: "usefulLife",
    header: "Useful Life",
    cell: ({ row }) => <span className="text-xs font-mono text-muted-foreground font-semibold">{row.getValue("usefulLife")}</span>,
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
