"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { GlobalSettings } from "@/lib/types"
import {
  InfoIcon,
  DatabaseIcon,
  ServerIcon,
  BrainIcon,
  LayersIcon,
  HelpCircleIcon,
  ArrowRightIcon,
  DollarSignIcon,
  ClockIcon,
  SettingsIcon,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WorkloadSetupProps {
  globalSettings: GlobalSettings
  setGlobalSettings: (settings: GlobalSettings) => void
  onNext: () => void
}

export function WorkloadSetup({ globalSettings, setGlobalSettings, onNext }: WorkloadSetupProps) {
  const handleChange = (field: keyof GlobalSettings, value: string) => {
    setGlobalSettings({
      ...globalSettings,
      [field]: value,
    })
  }

  const getWorkloadIcon = (workload: string) => {
    switch (workload) {
      case "imdb":
        return <DatabaseIcon className="h-5 w-5 text-primary" />
      case "rdbms":
        return <DatabaseIcon className="h-5 w-5 text-primary" />
      case "aiml":
        return <BrainIcon className="h-5 w-5 text-primary" />
      case "virtualization":
        return <ServerIcon className="h-5 w-5 text-primary" />
      case "other":
        return <LayersIcon className="h-5 w-5 text-primary" />
      default:
        return <HelpCircleIcon className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card className="w-full border-primary/20 shadow-md">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-primary">
          <SettingsIcon className="h-5 w-5" />
          Workload & TCO Setup
        </CardTitle>
        <CardDescription>Select your workload type and TCO calculation parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="workload" className="mr-2 flex items-center gap-2">
              <DatabaseIcon className="h-4 w-4 text-primary" />
              Workload Type
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    The workload type affects performance modeling and memory utilization patterns.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={globalSettings.workload} onValueChange={(value) => handleChange("workload", value)}>
            <SelectTrigger id="workload" className="border-primary/20">
              <SelectValue placeholder="Select workload" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="imdb" className="flex items-center">
                <div className="flex items-center gap-2">
                  <DatabaseIcon className="h-4 w-4" />
                  In-Memory Database (IMDB)
                </div>
              </SelectItem>
              <SelectItem value="rdbms">
                <div className="flex items-center gap-2">
                  <DatabaseIcon className="h-4 w-4" />
                  Relational Database (RDBMS)
                </div>
              </SelectItem>
              <SelectItem value="aiml">
                <div className="flex items-center gap-2">
                  <BrainIcon className="h-4 w-4" />
                  AI/ML Training
                </div>
              </SelectItem>
              <SelectItem value="virtualization">
                <div className="flex items-center gap-2">
                  <ServerIcon className="h-4 w-4" />
                  Virtualization
                </div>
              </SelectItem>
              <SelectItem value="other">
                <div className="flex items-center gap-2">
                  <LayersIcon className="h-4 w-4" />
                  Other
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="amortizationPeriod" className="mr-2 flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-primary" />
              TCO Amortization Period
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The time period over which to calculate the Total Cost of Ownership.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={globalSettings.amortizationPeriod}
            onValueChange={(value) => handleChange("amortizationPeriod", value)}
          >
            <SelectTrigger id="amortizationPeriod" className="border-primary/20">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year</SelectItem>
              <SelectItem value="3">3 Years</SelectItem>
              <SelectItem value="5">5 Years</SelectItem>
              <SelectItem value="7">7 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="currency" className="mr-2 flex items-center gap-2">
              <DollarSignIcon className="h-4 w-4 text-primary" />
              Currency
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The currency to use for all cost calculations.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={globalSettings.currency} onValueChange={(value) => handleChange("currency", value)}>
            <SelectTrigger id="currency" className="border-primary/20">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$">USD ($)</SelectItem>
              <SelectItem value="€">EUR (€)</SelectItem>
              <SelectItem value="£">GBP (£)</SelectItem>
              <SelectItem value="¥">JPY (¥)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end bg-primary/5 rounded-b-lg">
        <Button onClick={onNext} className="flex items-center gap-1">
          Next: Configure Systems
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}

