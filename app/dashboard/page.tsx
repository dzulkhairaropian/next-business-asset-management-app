"use client"

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  ActivityIcon,
  AlertTriangleIcon,
  ArrowUpRightIcon,
  BoxesIcon,
  CircleDollarSignIcon,
  FilterIcon,
  LaptopIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  WrenchIcon,
} from "lucide-react";

interface Asset {
  tag: string;
  code: string;
  name: string;
  serial: string;
  status: string;
  holder: string;
  dept: string;
}

interface Checkout {
  tag: string;
  name: string;
  qty: string;
  user: string;
  dept: string;
  date: string;
}

interface ConsumableCheckout {
  name: string;
  desc: string;
  qty: string;
  user: string;
  date: string;
}

interface ConsumablesStock {
  name: string;
  desc: string;
  qty: string;
  status: string;
}

interface OldAsset {
  tag: string;
  name: string;
  qty: string;
  user: string;
  dept: string;
  date: string;
}

interface Category {
  label: string;
  value: number;
  color: string;
}

export default function Page() {
  const [assets, setAssets] = React.useState<Asset[]>([]);
  const [checkouts, setCheckouts] = React.useState<Checkout[]>([]);
  const [consumableCheckouts, setConsumableCheckouts] = React.useState<ConsumableCheckout[]>([]);
  const [consumablesStock, setConsumablesStock] = React.useState<ConsumablesStock[]>([]);
  const [oldAssets, setOldAssets] = React.useState<OldAsset[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [mostRequestedConsumables, setMostRequestedConsumables] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [
          assetsRes,
          checkoutsRes,
          consumableCheckoutsRes,
          consumablesStockRes,
          oldAssetsRes,
          categoriesRes,
          mostRequestedRes,
        ] = await Promise.all([
          fetch('/api/assets'),
          fetch('/api/asset-checkouts'),
          fetch('/api/consumable-checkouts'),
          fetch('/api/consumables-stock'),
          fetch('/api/old-assets'),
          fetch('/api/categories'),
          fetch('/api/most-requested-consumables'),
        ]);
        const assetsData = await assetsRes.json();
        const checkoutsData = await checkoutsRes.json();
        const consumableCheckoutsData = await consumableCheckoutsRes.json();
        const consumablesStockData = await consumablesStockRes.json();
        const oldAssetsData = await oldAssetsRes.json();
        const categoriesData = await categoriesRes.json();
        const mostRequestedData = await mostRequestedRes.json();
        setAssets(assetsData);
        setCheckouts(checkoutsData);
        setConsumableCheckouts(consumableCheckoutsData);
        setConsumablesStock(consumablesStockData);
        setOldAssets(oldAssetsData);
        setCategories(categoriesData);
        setMostRequestedConsumables(mostRequestedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalAssets = assets.length;
  const readyToDeploy = assets.filter((a) => a.status === "Ready to Deploy").length;
  const deployed = assets.filter((a) => a.status === "Deployed").length;
  const inService = assets.filter((a) => a.status === "Service").length;
  const broken = assets.filter(
    (a) => a.status === "Broken" || a.status === "Defective"
  ).length;

  const topProducts = React.useMemo(() => {
    if (!assets || assets.length === 0) return [];

    const productCounts = assets.reduce((acc, asset) => {
      if (asset.name) {
        acc[asset.name] = (acc[asset.name] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(productCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([label, value], index) => ({
        label,
        value,
        color: ["var(--color-primary)", "#06b6d4", "#3b82f6", "#10b981", "#f59e0b"][index] || "#ccc",
      }));
  }, [assets]);

  const byDepartment = React.useMemo(() => {
    if (!assets || assets.length === 0) return [];

    const deptCounts = assets.reduce((acc, asset) => {
      if (asset.dept) {
        acc[asset.dept] = (acc[asset.dept] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(deptCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([label, value], index) => ({
        label,
        value,
        color: ["var(--color-primary)", "#10b981", "#a855f7", "#f97316", "#ec4899"][index] || "#ccc",
      }));
  }, [assets]);




  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>IT Assets Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5">
              <PlusIcon className="h-4 w-4" />
              Add Asset
            </Button>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Quick Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Total Assets</span>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <BoxesIcon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1">{loading ? '...' : totalAssets}</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-emerald-500 font-semibold inline-flex items-center gap-0.5">
                  <ArrowUpRightIcon className="h-3 w-3" /> +4.2%
                </span>{" "}
                active tracking
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Ready to Deploy</span>
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <WrenchIcon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1">{loading ? '...' : readyToDeploy}</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-blue-500 font-semibold">Available</span> in inventory
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Deployed</span>
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <ActivityIcon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1">{loading ? '...' : deployed}</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-emerald-500 font-semibold">Assigned</span> to employees
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">Broken / Defective</span>
                <div className="h-8 w-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <AlertTriangleIcon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight mt-1">{loading ? '...' : broken + inService}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Assets currently in repair
              </p>
            </div>
          </div>

          {/* Donut Charts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Asset Status Distribution */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-xs p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">Asset Status Distribution</h2>
                <p className="text-xs text-muted-foreground">Current deployment status of IT Assets.</p>
              </div>
              <div className="flex-1 flex items-center justify-center py-2">
                <DonutChart
                  data={[
                    { label: "Deployed", value: deployed, color: "var(--color-primary)" },
                    { label: "Ready to Deploy", value: readyToDeploy, color: "#3b82f6" },
                    { label: "Broken / Defective", value: broken, color: "#ef4444" },
                    { label: "In Maintenance", value: inService, color: "#f59e0b" },
                  ]}
                />
              </div>
            </div>

            {/* 2. Assets by Department (Top 5) */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-xs p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">Assets by Department (Top 5)</h2>
                <p className="text-xs text-muted-foreground">Asset allocation across departments.</p>
              </div>
              <div className="flex-1 flex items-center justify-center py-2">
                <DonutChart data={byDepartment} />
              </div>
            </div>

            {/* 3. Most Used Products (Top 5) */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-xs p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">Most Used Products (Top 5)</h2>
                <p className="text-xs text-muted-foreground">Top items assigned to users.</p>
              </div>
              <div className="flex-1 flex items-center justify-center py-2">
                <DonutChart data={topProducts} />
              </div>
            </div>

            {/* 4. All Categories */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-xs p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">All Categories</h2>
                <p className="text-xs text-muted-foreground">Distribution across hardware categories.</p>
              </div>
              <div className="flex-1 flex items-center justify-center py-2">
                <DonutChart data={categories} />
              </div>
            </div>

            {/* 5. Most Requested Consumables (Top 5) */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-xs p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">Most Requested Consumables (Top 5)</h2>
                <p className="text-xs text-muted-foreground">Highest demand auxiliary assets.</p>
              </div>
              <div className="flex-1 flex items-center justify-center py-2">
                <DonutChart data={mostRequestedConsumables} />
              </div>
            </div>

            {/* 6. Warranty Coverage Status */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-xs p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">Warranty Coverage Status</h2>
                <p className="text-xs text-muted-foreground">Warranty status of registered IT hardware.</p>
              </div>
              <div className="flex-1 flex items-center justify-center py-2">
                <DonutChart
                  data={[
                    { label: "Under Warranty", value: 78, color: "#10b981" },
                    { label: "Expired / Out of Warranty", value: 30, color: "#f59e0b" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Timeline Line Chart */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden">
            <InteractiveLineChart />
          </div>

          {/* Main Dashboard Layout: Two columns */}
          <div className="grid gap-6 lg:grid-cols-2">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6">
              {/* Recent Asset Checkouts */}
              <div className="rounded-xl border bg-card text-card-foreground shadow-xs">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">Recent Asset Checkouts</h2>
                      <p className="text-sm text-muted-foreground">Latest hardware allocation to team members.</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      View Assets
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b text-muted-foreground uppercase tracking-wider">
                          <th className="py-2.5 font-medium">Item</th>
                          <th className="py-2.5 font-medium">Qty</th>
                          <th className="py-2.5 font-medium">To User</th>
                          <th className="py-2.5 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {checkouts.map((row, idx) => (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="py-3">
                              <span className="font-semibold block font-mono text-[10px] text-muted-foreground">{row.tag}</span>
                              <span className="font-medium text-foreground">{row.name}</span>
                            </td>
                            <td className="py-3 text-muted-foreground">{row.qty}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] uppercase">
                                  {row.user.charAt(0)}
                                </div>
                                <div className="leading-tight">
                                  <span className="font-medium text-foreground block">{row.user}</span>
                                  <span className="text-[10px] text-muted-foreground block">{row.dept}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 text-muted-foreground font-mono">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Consumable Checkouts */}
              <div className="rounded-xl border bg-card text-card-foreground shadow-xs">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">Recent Consumable Checkouts</h2>
                      <p className="text-sm text-muted-foreground">Latest transaction details of consumable distributions.</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      View Transactions
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b text-muted-foreground uppercase tracking-wider">
                          <th className="py-2.5 font-medium">Item</th>
                          <th className="py-2.5 font-medium">Qty</th>
                          <th className="py-2.5 font-medium">To User</th>
                          <th className="py-2.5 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {consumableCheckouts.map((row, idx) => (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="py-3">
                              <span className="font-medium text-foreground block">{row.name}</span>
                              <span className="text-[10px] text-muted-foreground block">{row.desc}</span>
                            </td>
                            <td className="py-3 text-muted-foreground">{row.qty}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] uppercase">
                                  {row.user.charAt(0)}
                                </div>
                                <span className="font-medium text-foreground">{row.user}</span>
                              </div>
                            </td>
                            <td className="py-3 text-muted-foreground font-mono">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">
              {/* Consumables Stock */}
              <div className="rounded-xl border bg-card text-card-foreground shadow-xs">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">Consumables Stock</h2>
                      <p className="text-sm text-muted-foreground">107 Units Total across current stock levels.</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Manage All Consumables
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b text-muted-foreground uppercase tracking-wider">
                          <th className="py-2.5 font-medium">Item</th>
                          <th className="py-2.5 font-medium text-center">Qty</th>
                          <th className="py-2.5 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {consumablesStock.map((row, idx) => (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="py-3">
                              <span className="font-medium text-foreground block">{row.name}</span>
                              <span className="text-[10px] text-muted-foreground block">{row.desc}</span>
                            </td>
                            <td className="py-3 text-muted-foreground font-mono text-center">{row.qty}</td>
                            <td className="py-3 text-right">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Assets Older Than 4 Years */}
              <div className="rounded-xl border bg-card text-card-foreground shadow-xs">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">Assets Older Than 4 Years</h2>
                      <p className="text-sm text-muted-foreground">List of aging equipment requiring review.</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      View Assets
                    </Button>
                  </div>

                  {/* Scroll Area container to make long lists clean */}
                  <div className="max-h-[360px] overflow-y-auto pr-1">
                    <table className="w-full text-xs text-left">
                      <thead className="sticky top-0 bg-card z-10">
                        <tr className="border-b text-muted-foreground uppercase tracking-wider">
                          <th className="py-2.5 font-medium">Item</th>
                          <th className="py-2.5 font-medium font-mono text-center">Qty</th>
                          <th className="py-2.5 font-medium">To User</th>
                          <th className="py-2.5 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {oldAssets.map((row, idx) => (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="py-2.5">
                              <span className="font-semibold block font-mono text-[10px] text-muted-foreground">{row.tag}</span>
                              <span className="font-medium text-foreground">{row.name}</span>
                            </td>
                            <td className="py-2.5 text-center text-muted-foreground">{row.qty}</td>
                            <td className="py-2.5">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] uppercase">
                                  {row.user.charAt(0)}
                                </div>
                                <div className="leading-tight">
                                  <span className="font-medium text-foreground block">{row.user}</span>
                                  <span className="text-[10px] text-muted-foreground block">{row.dept}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-2.5 text-muted-foreground font-mono">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function DonutChart({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
      <div className="relative w-28 h-28 flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="var(--border)"
            strokeWidth="3.5"
            className="opacity-25"
          />
          {data.map((item, idx) => {
            const percent = (item.value / total) * 100;
            if (percent <= 0) return null;
            const strokeDash = `${percent} ${100 - percent}`;
            const strokeOffset = 100 - accumulatedPercent;
            accumulatedPercent += percent;
            return (
              <circle
                key={idx}
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke={item.color}
                strokeWidth="3.8"
                strokeDasharray={strokeDash}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold">{total === 1 && data.every(d => d.value === 0) ? 0 : total}</span>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        {data.map((item, idx) => {
          const percent = total > 0 ? ((item.value / total) * 100).toFixed(0) : "0";
          return (
            <div key={idx} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground truncate">
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-foreground truncate">{item.label}</span>
              </span>
              <span className="font-medium font-mono pl-2">{item.value} ({percent}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const interactiveChartConfig = {
  notebook: {
    label: "Notebook",
    color: "var(--color-primary)",
  },
  printer: {
    label: "Printer",
    color: "#3b82f6",
  },
  accessories: {
    label: "Accessories",
    color: "#eab308",
  },
} satisfies ChartConfig

function InteractiveLineChart() {
  const [activeCategory, setActiveCategory] = React.useState<"notebook" | "printer" | "accessories">("notebook")
  const [selectedYear, setSelectedYear] = React.useState<"2026" | "2025" | "2024">("2026")

  const chartDataMap = {
    "2026": [
      { date: "2026-05-01", notebook: 12, printer: 8, accessories: 15 },
      { date: "2026-05-15", notebook: 15, printer: 10, accessories: 12 },
      { date: "2026-06-01", notebook: 22, printer: 14, accessories: 18 },
      { date: "2026-06-15", notebook: 18, printer: 16, accessories: 20 },
      { date: "2026-07-01", notebook: 25, printer: 12, accessories: 22 },
      { date: "2026-07-15", notebook: 30, printer: 15, accessories: 25 },
    ],
    "2025": [
      { date: "2025-05-01", notebook: 18, printer: 12, accessories: 20 },
      { date: "2025-05-15", notebook: 22, printer: 15, accessories: 18 },
      { date: "2025-06-01", notebook: 30, printer: 20, accessories: 25 },
      { date: "2025-06-15", notebook: 26, printer: 22, accessories: 28 },
      { date: "2025-07-01", notebook: 35, printer: 18, accessories: 30 },
      { date: "2025-07-15", notebook: 42, printer: 24, accessories: 35 },
    ],
    "2024": [
      { date: "2024-05-01", notebook: 10, printer: 6, accessories: 12 },
      { date: "2024-05-15", notebook: 12, printer: 8, accessories: 10 },
      { date: "2024-06-01", notebook: 18, printer: 12, accessories: 15 },
      { date: "2024-06-15", notebook: 15, printer: 14, accessories: 16 },
      { date: "2024-07-01", notebook: 20, printer: 10, accessories: 18 },
      { date: "2024-07-15", notebook: 24, printer: 12, accessories: 20 },
    ]
  }

  const chartData = chartDataMap[selectedYear]

  const totals = React.useMemo(() => {
    return {
      notebook: chartData.reduce((acc, curr) => acc + curr.notebook, 0),
      printer: chartData.reduce((acc, curr) => acc + curr.printer, 0),
      accessories: chartData.reduce((acc, curr) => acc + curr.accessories, 0),
    }
  }, [chartData])

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 pt-6">
        <div>
          <h2 className="font-semibold text-lg">Line Chart - Interactive</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Showing total purchases for the last 3 months</p>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs text-muted-foreground font-medium">Select Year:</span>
          <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg border">
            {(["2026", "2025", "2024"] as const).map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                  selectedYear === year
                    ? "bg-background text-foreground shadow-xs border"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex border-b">
        {(["notebook", "printer", "accessories"] as const).map((key) => {
          const config = interactiveChartConfig[key]
          const isActive = activeCategory === key
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex-1 text-left px-6 py-4 transition-all border-b-2 hover:bg-muted/30 ${
                isActive ? "border-primary bg-muted/20 font-bold" : "border-transparent"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                {config.label}
              </span>
              <span className="text-2xl font-bold mt-1 block">
                {totals[key].toLocaleString()}
              </span>
            </button>
          )
        })}
      </div>
      <div className="px-6 pb-6 pt-2">
        <ChartContainer config={interactiveChartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey={activeCategory}
                type="step"
                stroke={interactiveChartConfig[activeCategory].color}
                strokeWidth={2.5}
                dot={false}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
