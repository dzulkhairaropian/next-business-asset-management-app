"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon } from "lucide-react"

export type User = {
  id: string
  name: string
  email: string
  dept: string
  company: string
  roles: string[]
}

export const columns: ColumnDef<User>[] = [
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
    id: "user",
    header: "User",
    accessorKey: "name",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="leading-tight">
            <span className="font-semibold text-foreground block text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground block mt-0.5">{user.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    id: "organization",
    header: "Organization",
    accessorKey: "dept",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="leading-tight">
          <span className="font-medium text-foreground block text-xs">{user.dept}</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5">{user.company}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => {
      const roles = row.getValue("roles") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded bg-primary/5 text-[10px] font-mono font-semibold text-primary border border-primary/10"
            >
              {role}
            </span>
          ))}
        </div>
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
