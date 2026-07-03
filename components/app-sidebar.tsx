"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  BarChart3Icon,
  UserCheckIcon,
  CpuIcon,
  Building2Icon,
  TagsIcon,
  PackageIcon,
  BuildingIcon,
  BookOpenIcon,
  LifeBuoyIcon,
  LockIcon,
  RefreshCwIcon,
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMenu: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
      isActive: true,
    },
    {
      title: "GA Dashboard",
      url: "/ga-dashboard",
      icon: (
        <BarChart3Icon />
      ),
    },
    {
      title: "My Assets",
      url: "/my-assets",
      icon: (
        <UserCheckIcon />
      ),
    },
  ],
  navAssets: [
    {
      title: "IT Assets",
      url: "#",
      icon: (
        <CpuIcon />
      ),
      items: [
        {
          title: "Inventory",
          url: "/it-assets/inventory",
        },
        {
          title: "Transactions",
          url: "/it-assets/transactions",
        },
      ],
    },
    {
      title: "GA Assets",
      url: "#",
      icon: (
        <Building2Icon />
      ),
      items: [
        {
          title: "Inventory",
          url: "/ga-assets",
        },
        {
          title: "Transactions",
          url: "/ga-assets/transactions",
        },
      ],
    },
  ],
  navConsumables: [
    {
      title: "Consumables",
      url: "#",
      icon: (
        <PackageIcon />
      ),
      items: [
        {
          title: "Inventory",
          url: "/consumables/inventory",
        },
        {
          title: "Transactions",
          url: "/consumables/transactions",
        },
      ],
    },
  ],
  navMasterData: [
    {
      title: "Organization",
      url: "#",
      icon: (
        <BuildingIcon />
      ),
      items: [
        {
          title: "Companies",
          url: "/master-data/organization/companies",
        },
        {
          title: "Departments",
          url: "/master-data/organization/departments",
        },
        {
          title: "Positions",
          url: "/master-data/organization/positions",
        },
        {
          title: "Locations",
          url: "/master-data/organization/locations",
        },
      ],
    },
    {
      title: "Catalog",
      url: "#",
      icon: (
        <BookOpenIcon />
      ),
      items: [
        {
          title: "Products",
          url: "/master-data/catalog/products",
        },
        {
          title: "Master Categories",
          url: "/master-data/catalog/master-categories",
        },
        {
          title: "Categories",
          url: "/master-data/catalog/categories",
        },
        {
          title: "Brands",
          url: "/master-data/catalog/brands",
        },
        {
          title: "Operating Systems",
          url: "/master-data/catalog/operating-systems",
        },
        {
          title: "GA Categories",
          url: "/ga-categories",
        },
      ],
    },
    {
      title: "Support Data",
      url: "#",
      icon: (
        <LifeBuoyIcon />
      ),
      items: [
        {
          title: "Statuses",
          url: "/master-data/support-data/statuses",
        },
        {
          title: "Vendors",
          url: "/master-data/support-data/vendors",
        },
      ],
    },
  ],
  navSystem: [
    {
      title: "Access Control",
      url: "#",
      icon: (
        <LockIcon />
      ),
      items: [
        {
          title: "Users",
          url: "/system/access-control/users",
        },
        {
          title: "Roles",
          url: "/system/access-control/roles",
        },
      ],
    },
    {
      title: "Backups",
      url: "/system/backups",
      icon: (
        <RefreshCwIcon />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Menu" items={data.navMenu} />
        <NavMain label="Assets Management" items={data.navAssets} />
        <NavMain label="Consumables" items={data.navConsumables} />
        <NavMain label="Master Data" items={data.navMasterData} />
        <NavMain label="System" items={data.navSystem} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
