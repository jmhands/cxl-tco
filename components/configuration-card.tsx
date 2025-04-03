"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import type { Configuration } from "@/lib/types"
import {
  InfoIcon,
  Trash2Icon,
  ServerIcon,
  CpuIcon,
  MemoryStickIcon,
  HardDriveIcon,
  NetworkIcon,
  FlagIcon,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ConfigurationCardProps {
  config: Configuration
  updateConfiguration: (config: Configuration) => void
  removeConfiguration: (id: string) => void
  canRemove: boolean
}

export function ConfigurationCard({
  config,
  updateConfiguration,
  removeConfiguration,
  canRemove,
}: ConfigurationCardProps) {
  const handleChange = <K extends keyof Configuration>(field: K, value: Configuration[K]) => {
    updateConfiguration({
      ...config,
      [field]: value,
    })
  }

  const handleNestedChange = <K extends keyof Configuration, N extends keyof Configuration[K]>(
    parent: K,
    field: N,
    value: Configuration[K][N],
  ) => {
    updateConfiguration({
      ...config,
      [parent]: {
        ...config[parent],
        [field]: value,
      },
    })
  }

  return (
    <Card className={`flex-shrink-0 w-80 shadow-md ${config.isBaseline ? "border-primary" : "border-primary/20"}`}>
      <CardHeader className={`pb-2 ${config.isBaseline ? "bg-primary/10" : "bg-primary/5"} rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <Input
            value={config.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="font-semibold border-primary/20"
          />
          {canRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeConfiguration(config.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="mt-2">
          <RadioGroup
            value={config.isBaseline ? "baseline" : "comparison"}
            onValueChange={(value) => handleChange("isBaseline", value === "baseline")}
            className="flex"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="baseline" id={`baseline-${config.id}`} className="text-primary" />
              <Label htmlFor={`baseline-${config.id}`} className="flex items-center gap-1">
                <FlagIcon className="h-3 w-3 text-primary" />
                Set as Baseline
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-3 mb-4 bg-primary/10">
            <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <ServerIcon className="h-4 w-4 mr-1" />
              General
            </TabsTrigger>
            <TabsTrigger value="memory" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <MemoryStickIcon className="h-4 w-4 mr-1" />
              Memory
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <HardDriveIcon className="h-4 w-4 mr-1" />
              Storage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`server-count-${config.id}`} className="mr-2 flex items-center gap-1">
                  <ServerIcon className="h-4 w-4 text-primary" />
                  Server Count
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Number of identical servers in this configuration</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id={`server-count-${config.id}`}
                type="number"
                min="1"
                value={config.serverCount}
                onChange={(e) => handleChange("serverCount", Number.parseInt(e.target.value) || 1)}
                className="border-primary/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`cpu-sockets-${config.id}`} className="mr-2 flex items-center gap-1">
                  <CpuIcon className="h-4 w-4 text-primary" />
                  CPU Sockets
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Number of CPU sockets per server</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={config.cpu.sockets.toString()}
                onValueChange={(value) => handleNestedChange("cpu", "sockets", Number.parseInt(value))}
              >
                <SelectTrigger id={`cpu-sockets-${config.id}`} className="border-primary/20">
                  <SelectValue placeholder="Select sockets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Socket</SelectItem>
                  <SelectItem value="2">2 Sockets</SelectItem>
                  <SelectItem value="4">4 Sockets</SelectItem>
                  <SelectItem value="8">8 Sockets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`cpu-tier-${config.id}`} className="mr-2 flex items-center gap-1">
                  <CpuIcon className="h-4 w-4 text-primary" />
                  CPU Tier
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Performance tier of the CPU</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={config.cpu.tier}
                onValueChange={(value) => handleNestedChange("cpu", "tier", value as "entry" | "mid" | "high")}
              >
                <SelectTrigger id={`cpu-tier-${config.id}`} className="border-primary/20">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid-Range</SelectItem>
                  <SelectItem value="high">High-End</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`cpu-cores-${config.id}`} className="mr-2 flex items-center gap-1">
                  <CpuIcon className="h-4 w-4 text-primary" />
                  CPU Cores
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Total cores per CPU</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id={`cpu-cores-${config.id}`}
                type="number"
                min="1"
                value={config.cpu.cores}
                onChange={(e) => handleNestedChange("cpu", "cores", Number.parseInt(e.target.value) || 1)}
                className="border-primary/20"
              />
            </div>
          </TabsContent>

          <TabsContent value="memory" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`dram-capacity-${config.id}`} className="mr-2 flex items-center gap-1">
                  <MemoryStickIcon className="h-4 w-4 text-primary" />
                  DRAM Capacity (GB)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Total DRAM capacity per server in GB</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id={`dram-capacity-${config.id}`}
                type="number"
                min="1"
                value={config.dram.capacity}
                onChange={(e) => handleNestedChange("dram", "capacity", Number.parseInt(e.target.value) || 1)}
                className="border-primary/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`dram-type-${config.id}`} className="mr-2 flex items-center gap-1">
                  <MemoryStickIcon className="h-4 w-4 text-primary" />
                  DRAM Type
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Type of DRAM memory</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={config.dram.type}
                onValueChange={(value) => handleNestedChange("dram", "type", value as "DDR4" | "DDR5")}
              >
                <SelectTrigger id={`dram-type-${config.id}`} className="border-primary/20">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DDR4">DDR4</SelectItem>
                  <SelectItem value="DDR5">DDR5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`dram-speed-${config.id}`} className="mr-2 flex items-center gap-1">
                  <MemoryStickIcon className="h-4 w-4 text-primary" />
                  DRAM Speed
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Speed of DRAM memory</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={config.dram.speed} onValueChange={(value) => handleNestedChange("dram", "speed", value)}>
                <SelectTrigger id={`dram-speed-${config.id}`} className="border-primary/20">
                  <SelectValue placeholder="Select speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3200">DDR4-3200</SelectItem>
                  <SelectItem value="4800">DDR5-4800</SelectItem>
                  <SelectItem value="5600">DDR5-5600</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Label htmlFor={`cxl-enabled-${config.id}`} className="mr-2 flex items-center gap-1">
                    <MemoryStickIcon className="h-4 w-4 text-primary" />
                    CXL Memory
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Enable CXL memory expansion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch
                  id={`cxl-enabled-${config.id}`}
                  checked={config.cxlMemory.enabled}
                  onCheckedChange={(checked) => handleNestedChange("cxlMemory", "enabled", checked)}
                  disabled={config.isBaseline} // Disable CXL for baseline config
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {config.cxlMemory.enabled && (
                <>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center">
                      <Label htmlFor={`cxl-capacity-${config.id}`} className="mr-2 flex items-center gap-1">
                        <MemoryStickIcon className="h-4 w-4 text-primary" />
                        CXL Capacity (GB)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Total CXL memory capacity per server in GB</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id={`cxl-capacity-${config.id}`}
                      type="number"
                      min="1"
                      value={config.cxlMemory.capacity}
                      onChange={(e) =>
                        handleNestedChange("cxlMemory", "capacity", Number.parseInt(e.target.value) || 1)
                      }
                      className="border-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor={`cxl-tier-${config.id}`} className="mr-2 flex items-center gap-1">
                        <MemoryStickIcon className="h-4 w-4 text-primary" />
                        CXL Tier
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Performance tier of CXL memory</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select
                      value={config.cxlMemory.tier}
                      onValueChange={(value) =>
                        handleNestedChange("cxlMemory", "tier", value as "standard" | "high-perf")
                      }
                    >
                      <SelectTrigger id={`cxl-tier-${config.id}`} className="border-primary/20">
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high-perf">High Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`storage-tier-${config.id}`} className="mr-2 flex items-center gap-1">
                  <HardDriveIcon className="h-4 w-4 text-primary" />
                  Storage Tier
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Performance tier of storage</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={config.storage.tier}
                onValueChange={(value) => handleNestedChange("storage", "tier", value as "entry" | "mid" | "high")}
              >
                <SelectTrigger id={`storage-tier-${config.id}`} className="border-primary/20">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">HDD</SelectItem>
                  <SelectItem value="mid">SATA SSD</SelectItem>
                  <SelectItem value="high">NVMe SSD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`storage-capacity-${config.id}`} className="mr-2 flex items-center gap-1">
                  <HardDriveIcon className="h-4 w-4 text-primary" />
                  Storage Capacity (TB)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Total storage capacity per server in TB</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id={`storage-capacity-${config.id}`}
                type="number"
                min="1"
                value={config.storage.capacity}
                onChange={(e) => handleNestedChange("storage", "capacity", Number.parseInt(e.target.value) || 1)}
                className="border-primary/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`networking-speed-${config.id}`} className="mr-2 flex items-center gap-1">
                  <NetworkIcon className="h-4 w-4 text-primary" />
                  Network Speed (GbE)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Network interface speed in Gigabit Ethernet</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={config.networking.speed}
                onValueChange={(value) => handleNestedChange("networking", "speed", value)}
              >
                <SelectTrigger id={`networking-speed-${config.id}`} className="border-primary/20">
                  <SelectValue placeholder="Select speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 GbE</SelectItem>
                  <SelectItem value="25">25 GbE</SelectItem>
                  <SelectItem value="100">100 GbE</SelectItem>
                  <SelectItem value="200">200 GbE</SelectItem>
                  <SelectItem value="400">400 GbE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className={`${config.isBaseline ? "bg-primary/10" : "bg-primary/5"} rounded-b-lg`}>
        <div className="w-full">
          <Label htmlFor={`notes-${config.id}`} className="mb-2 block flex items-center gap-1">
            <InfoIcon className="h-4 w-4 text-primary" />
            Notes
          </Label>
          <Textarea
            id={`notes-${config.id}`}
            placeholder="Optional notes about this configuration"
            value={config.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="resize-none border-primary/20"
            rows={2}
          />
        </div>
      </CardFooter>
    </Card>
  )
}

