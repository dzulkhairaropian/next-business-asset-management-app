"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Helper to get relative colors from chart config
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer")
  }
  return context
}

export function ChartContainer({
  id,
  config,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ReactNode
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        id={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-grid-horizontal_line]:stroke-border/50 [&_.recharts-cartesian-grid-vertical_line]:stroke-border/50 [&_.recharts-curve.recharts-line]:stroke-primary [&_.recharts-dot]:stroke-primary [&_.recharts-dots_circle]:fill-background [&_.recharts-dots_circle]:stroke-primary [&_.recharts-dots_circle]:stroke-2 [&_.recharts-legend-item]:text-muted-foreground [&_.recharts-legend-item_svg]:text-muted-foreground [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-sector]:stroke-background [&_.recharts-surface]:overflow-visible [&_.recharts-tooltip-cursor]:stroke-border [&_.recharts-active-dot]:stroke-primary [&_.recharts-active-dot]:stroke-2 [&_.recharts-active-dot]:fill-background",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {children}
      </div>
    </ChartContext.Provider>
  )
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorStyles = Object.entries(config)
    .map(([key, item]) => {
      const color = item.color
      if (!color) return null
      return `
        #${id} {
          --color-${key}: ${color};
        }
      `
    })
    .filter(Boolean)
    .join("\n")

  return <style dangerouslySetInnerHTML={{ __html: colorStyles }} />
}

export const ChartTooltip = RechartsPrimitive.Tooltip

export function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  label,
  labelFormatter,
  labelClassName,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  labelClassName?: string
}) {
  const { config } = useChart()

  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!hideLabel && (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter ? labelFormatter(label, payload) : label}
        </div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = item.dataKey as string
          const configItem = config[key]
          const color = item.color || "var(--color-primary)"

          return (
            <div
              key={index}
              className="flex w-full items-center gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
            >
              {indicator === "dot" && (
                <div
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
              <span className="text-muted-foreground">
                {configItem?.label || item.name || key}
              </span>
              <span className="ml-auto font-mono font-medium text-foreground">
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
