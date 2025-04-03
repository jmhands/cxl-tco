"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Configuration, GlobalSettings, CalculationResults } from "@/lib/types"
import {
  DownloadIcon,
  InfoIcon,
  BarChart3Icon,
  ArrowLeftIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  ServerIcon,
  MemoryStickIcon,
  ZapIcon,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

interface ResultsComparisonProps {
  results: CalculationResults
  configurations: Configuration[]
  globalSettings: GlobalSettings
  onBack: () => void
}

export function ResultsComparison({ results, configurations, globalSettings, onBack }: ResultsComparisonProps) {
  const [showAssumptions, setShowAssumptions] = useState(false)

  const baselineConfig = configurations.find((config) => config.isBaseline)
  const comparisonConfigs = configurations.filter((config) => !config.isBaseline)

  const formatCurrency = (value: number) => {
    return `${globalSettings.currency}${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
  }

  const exportResults = () => {
    // Create CSV content
    let csv =
      "Configuration,Servers,Total DRAM (GB),CXL Memory (GB),CapEx,OpEx/Year,TCO,TCO Savings,Performance Uplift\n"

    // Add baseline
    if (baselineConfig) {
      const baselineResult = results.configResults[baselineConfig.id]
      csv += `${baselineConfig.name},${baselineConfig.serverCount},${baselineConfig.serverCount * baselineConfig.dram.capacity},0,${baselineResult.capex},${baselineResult.annualOpex},${baselineResult.totalTco},,\n`
    }

    // Add comparisons
    comparisonConfigs.forEach((config) => {
      const result = results.configResults[config.id]
      const baselineResult = baselineConfig ? results.configResults[baselineConfig.id] : null
      const tcoSavings = baselineResult ? baselineResult.totalTco - result.totalTco : 0
      const performanceUplift = result.performanceMetrics.upliftPercentage

      csv += `${config.name},${config.serverCount},${config.serverCount * config.dram.capacity},${config.cxlMemory.enabled ? config.serverCount * config.cxlMemory.capacity : 0},${result.capex},${result.annualOpex},${result.totalTco},${tcoSavings},${performanceUplift}%\n`
    })

    // Create download link
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", "cxl_tco_results.csv")
    a.click()
  }

  return (
    <Card className="w-full border-primary/20 shadow-md">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BarChart3Icon className="h-5 w-5" />
              TCO Comparison Results
            </CardTitle>
            <CardDescription>
              {baselineConfig ? `Comparing against baseline: ${baselineConfig.name}` : "Comparison results"}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={exportResults} className="flex items-center border-primary/20">
            <DownloadIcon className="h-4 w-4 mr-2 text-primary" />
            Export Results
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Metric</TableHead>
                {baselineConfig && <TableHead className="bg-primary/10">{baselineConfig.name} (Baseline)</TableHead>}
                {comparisonConfigs.map((config) => (
                  <TableHead key={config.id}>{config.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <ServerIcon className="h-4 w-4 mr-2 text-primary" />
                    Server Count
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Number of servers in this configuration</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                {baselineConfig && <TableCell className="bg-primary/10">{baselineConfig.serverCount}</TableCell>}
                {comparisonConfigs.map((config) => (
                  <TableCell key={config.id}>{config.serverCount}</TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <MemoryStickIcon className="h-4 w-4 mr-2 text-primary" />
                    Total DRAM (GB)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Total DRAM capacity across all servers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                {baselineConfig && (
                  <TableCell className="bg-primary/10">
                    {baselineConfig.serverCount * baselineConfig.dram.capacity}
                  </TableCell>
                )}
                {comparisonConfigs.map((config) => (
                  <TableCell key={config.id}>{config.serverCount * config.dram.capacity}</TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <MemoryStickIcon className="h-4 w-4 mr-2 text-primary" />
                    CXL Memory (GB)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Total CXL memory capacity across all servers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                {baselineConfig && <TableCell className="bg-primary/10">0</TableCell>}
                {comparisonConfigs.map((config) => (
                  <TableCell key={config.id}>
                    {config.cxlMemory.enabled ? config.serverCount * config.cxlMemory.capacity : 0}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <DollarSignIcon className="h-4 w-4 mr-2 text-primary" />
                    CapEx
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Total capital expenditure</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                {baselineConfig && (
                  <TableCell className="bg-primary/10">
                    {formatCurrency(results.configResults[baselineConfig.id].capex)}
                  </TableCell>
                )}
                {comparisonConfigs.map((config) => (
                  <TableCell key={config.id}>{formatCurrency(results.configResults[config.id].capex)}</TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <DollarSignIcon className="h-4 w-4 mr-2 text-primary" />
                    OpEx/Year
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Annual operational expenditure</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                {baselineConfig && (
                  <TableCell className="bg-primary/10">
                    {formatCurrency(results.configResults[baselineConfig.id].annualOpex)}
                  </TableCell>
                )}
                {comparisonConfigs.map((config) => (
                  <TableCell key={config.id}>{formatCurrency(results.configResults[config.id].annualOpex)}</TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <DollarSignIcon className="h-4 w-4 mr-2 text-primary" />
                    TCO ({globalSettings.amortizationPeriod} years)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Total Cost of Ownership over the amortization period</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                {baselineConfig && (
                  <TableCell className="bg-primary/10 font-bold">
                    {formatCurrency(results.configResults[baselineConfig.id].totalTco)}
                  </TableCell>
                )}
                {comparisonConfigs.map((config) => (
                  <TableCell key={config.id} className="font-bold">
                    {formatCurrency(results.configResults[config.id].totalTco)}
                  </TableCell>
                ))}
              </TableRow>

              {baselineConfig && (
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <DollarSignIcon className="h-4 w-4 mr-2 text-primary" />
                      TCO Savings vs. Baseline
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Cost savings compared to the baseline configuration</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell className="bg-primary/10">—</TableCell>
                  {comparisonConfigs.map((config) => {
                    const baselineTco = results.configResults[baselineConfig.id].totalTco
                    const configTco = results.configResults[config.id].totalTco
                    const savings = baselineTco - configTco
                    const savingsPercentage = (savings / baselineTco) * 100

                    return (
                      <TableCell
                        key={config.id}
                        className={savings > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}
                      >
                        <div className="flex items-center">
                          {savings > 0 ? (
                            <TrendingDownIcon className="h-4 w-4 mr-1 text-green-600" />
                          ) : (
                            <TrendingUpIcon className="h-4 w-4 mr-1 text-red-600" />
                          )}
                          {formatCurrency(savings)} ({formatPercentage(savingsPercentage)})
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              )}

              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <TrendingUpIcon className="h-4 w-4 mr-2 text-primary" />
                    Performance Uplift
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Estimated performance improvement based on workload type</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                {baselineConfig && <TableCell className="bg-primary/10">—</TableCell>}
                {comparisonConfigs.map((config) => (
                  <TableCell key={config.id} className="text-blue-600 font-bold">
                    <div className="flex items-center">
                      <TrendingUpIcon className="h-4 w-4 mr-1 text-blue-600" />
                      {formatPercentage(results.configResults[config.id].performanceMetrics.upliftPercentage)}
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              {globalSettings.workload === "virtualization" && (
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <ServerIcon className="h-4 w-4 mr-2 text-primary" />
                      VM Density Increase
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Estimated increase in VM density per server</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  {baselineConfig && <TableCell className="bg-primary/10">—</TableCell>}
                  {comparisonConfigs.map((config) => (
                    <TableCell key={config.id} className="text-blue-600 font-bold">
                      <div className="flex items-center">
                        <ServerIcon className="h-4 w-4 mr-1 text-blue-600" />
                        {formatPercentage(results.configResults[config.id].performanceMetrics.vmDensityIncrease || 0)}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              )}

              {(globalSettings.workload === "imdb" || globalSettings.workload === "rdbms") && (
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <ZapIcon className="h-4 w-4 mr-2 text-primary" />
                      QPS Improvement
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Estimated improvement in queries per second</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  {baselineConfig && <TableCell className="bg-primary/10">—</TableCell>}
                  {comparisonConfigs.map((config) => (
                    <TableCell key={config.id} className="text-blue-600 font-bold">
                      <div className="flex items-center">
                        <ZapIcon className="h-4 w-4 mr-1 text-blue-600" />
                        {formatPercentage(results.configResults[config.id].performanceMetrics.qpsImprovement || 0)}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              )}

              {globalSettings.workload === "aiml" && (
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <ZapIcon className="h-4 w-4 mr-2 text-primary" />
                      Training Time Reduction
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400 ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Estimated reduction in model training time</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  {baselineConfig && <TableCell className="bg-primary/10">—</TableCell>}
                  {comparisonConfigs.map((config) => (
                    <TableCell key={config.id} className="text-blue-600 font-bold">
                      <div className="flex items-center">
                        <ZapIcon className="h-4 w-4 mr-1 text-blue-600" />
                        {formatPercentage(
                          results.configResults[config.id].performanceMetrics.trainingTimeReduction || 0,
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={showAssumptions} onOpenChange={setShowAssumptions}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4 border-primary/20">
              <InfoIcon className="h-4 w-4 mr-2 text-primary" />
              View Calculation Assumptions
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>TCO Calculation Assumptions</DialogTitle>
              <DialogDescription>These assumptions are used in the TCO calculations</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[60vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assumption</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Power cost per kWh</TableCell>
                    <TableCell>{globalSettings.currency}0.12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rack cost per U/month</TableCell>
                    <TableCell>{globalSettings.currency}30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PUE (Power Usage Effectiveness)</TableCell>
                    <TableCell>1.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Maintenance Cost</TableCell>
                    <TableCell>15% of CapEx</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Admin Overhead</TableCell>
                    <TableCell>{globalSettings.currency}500/server/year</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Memory latency assumptions</TableCell>
                    <TableCell>100ns (DDR5), 150ns (CXL)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CPU Power Consumption (Entry/Mid/High)</TableCell>
                    <TableCell>65W / 125W / 250W per socket</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DRAM Power Consumption</TableCell>
                    <TableCell>3W per 16GB DIMM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CXL Memory Power Consumption</TableCell>
                    <TableCell>2.5W per 16GB (Standard), 3W per 16GB (High-Perf)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Storage Power Consumption</TableCell>
                    <TableCell>10W/15W/25W per TB (HDD/SATA SSD/NVMe)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-between bg-primary/5 rounded-b-lg">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1 border-primary/20">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Configurations
        </Button>
      </CardFooter>
    </Card>
  )
}

