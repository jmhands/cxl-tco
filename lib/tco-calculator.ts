import type { Configuration } from "./types"

// Cost assumptions
const COST_ASSUMPTIONS = {
  cpu: {
    entry: 1500, // $ per socket
    mid: 3000, // $ per socket
    high: 6000, // $ per socket
  },
  dram: {
    ddr4: 8, // $ per GB
    ddr5: 10, // $ per GB
  },
  cxl: {
    standard: 5, // $ per GB
    "high-perf": 7, // $ per GB
  },
  storage: {
    entry: 50, // $ per TB (HDD)
    mid: 150, // $ per TB (SATA SSD)
    high: 300, // $ per TB (NVMe SSD)
  },
  networking: {
    "10": 300, // $ for 10GbE NIC
    "25": 500, // $ for 25GbE NIC
    "100": 1000, // $ for 100GbE NIC
    "200": 2000, // $ for 200GbE NIC
    "400": 4000, // $ for 400GbE NIC
  },
  server_base: 2000, // $ for server chassis, motherboard, etc.
  rack_unit_month: 30, // $ per rack unit per month
  power_kwh: 0.12, // $ per kWh
  pue: 1.5, // Power Usage Effectiveness
  maintenance_rate: 0.15, // 15% of CapEx per year
  admin_cost_server_year: 500, // $ per server per year
}

// Power assumptions (in Watts)
const POWER_ASSUMPTIONS = {
  cpu: {
    entry: 100, // W per socket
    mid: 200, // W per socket
    high: 300, // W per socket
  },
  dram: {
    ddr4: 0.4, // W per GB
    ddr5: 0.3, // W per GB
  },
  cxl: {
    standard: 0.25, // W per GB
    "high-perf": 0.35, // W per GB
  },
  storage: {
    entry: 10, // W per TB (HDD)
    mid: 5, // W per TB (SATA SSD)
    high: 8, // W per TB (NVMe SSD)
  },
  server_base: 50, // W per server (fans, motherboard, etc.)
}

// Rack space assumptions (in rack units)
const RACK_UNITS = {
  server: 2, // U per server (2U server assumed)
}

// Performance uplift assumptions based on workload
const PERFORMANCE_UPLIFT = {
  imdb: {
    memory_ratio: 0.3, // 30% improvement per memory ratio increase
    server_consolidation: 0.1, // 10% additional improvement per server reduced
  },
  rdbms: {
    memory_ratio: 0.2,
    server_consolidation: 0.05,
  },
  aiml: {
    memory_ratio: 0.4,
    server_consolidation: 0.1,
  },
  virtualization: {
    memory_ratio: 0.5,
    server_consolidation: 0.1,
  },
  other: {
    memory_ratio: 0.2,
    server_consolidation: 0.05,
  },
}

export function calculateTCO(
  config: Configuration,
  amortizationPeriod: number,
  workload: string,
  baselineConfig?: Configuration,
) {
  // Calculate CapEx
  const cpuCost = config.cpu.sockets * COST_ASSUMPTIONS.cpu[config.cpu.tier]
  const dramCost = config.dram.capacity * COST_ASSUMPTIONS.dram[config.dram.type]
  const storageCost = config.storage.capacity * COST_ASSUMPTIONS.storage[config.storage.tier]
  const networkingCost = COST_ASSUMPTIONS.networking[config.networking.speed]
  const cxlCost = config.cxl.enabled ? config.cxl.capacity * COST_ASSUMPTIONS.cxl[config.cxl.tier] : 0
  const serverBaseCost = COST_ASSUMPTIONS.server_base

  const costPerServer = cpuCost + dramCost + storageCost + networkingCost + cxlCost + serverBaseCost
  const totalCapEx = costPerServer * config.serverCount

  // Calculate power consumption
  const cpuPower = config.cpu.sockets * POWER_ASSUMPTIONS.cpu[config.cpu.tier]
  const dramPower = config.dram.capacity * POWER_ASSUMPTIONS.dram[config.dram.type]
  const storagePower = config.storage.capacity * POWER_ASSUMPTIONS.storage[config.storage.tier]
  const cxlPower = config.cxl.enabled ? config.cxl.capacity * POWER_ASSUMPTIONS.cxl[config.cxl.tier] : 0
  const serverBasePower = POWER_ASSUMPTIONS.server_base

  const powerPerServer = cpuPower + dramPower + storagePower + cxlPower + serverBasePower
  const totalPowerWatts = powerPerServer * config.serverCount

  // Calculate annual power cost
  const totalPowerKw = totalPowerWatts / 1000
  const annualEnergyKwh = totalPowerKw * 24 * 365
  const annualPowerCost = annualEnergyKwh * COST_ASSUMPTIONS.pue * COST_ASSUMPTIONS.power_kwh

  // Calculate rack space cost
  const rackUnitsPerServer = RACK_UNITS.server
  const totalRackUnits = rackUnitsPerServer * config.serverCount
  const annualSpaceCost = totalRackUnits * COST_ASSUMPTIONS.rack_unit_month * 12

  // Calculate maintenance cost
  const annualMaintenanceCost = totalCapEx * COST_ASSUMPTIONS.maintenance_rate

  // Calculate admin cost
  const annualAdminCost = config.serverCount * COST_ASSUMPTIONS.admin_cost_server_year

  // Calculate total annual OpEx
  const totalAnnualOpEx = annualPowerCost + annualSpaceCost + annualMaintenanceCost + annualAdminCost

  // Calculate total TCO
  const totalTCO = totalCapEx + totalAnnualOpEx * amortizationPeriod

  // Calculate TCO savings if baseline is provided
  let tcoSavings = 0
  let tcoSavingsPercent = 0

  if (baselineConfig) {
    const baselineTCO = calculateTCO(baselineConfig, amortizationPeriod, workload).totalTCO
    tcoSavings = baselineTCO - totalTCO
    tcoSavingsPercent = (tcoSavings / baselineTCO) * 100
  }

  // Calculate performance uplift
  let performanceUplift = 0

  if (baselineConfig && config.cxl.enabled) {
    // Calculate memory ratio improvement
    const baselineMemory = baselineConfig.dram.capacity * baselineConfig.serverCount
    const comparisonMemory =
      (config.dram.capacity + (config.cxl.enabled ? config.cxl.capacity : 0)) * config.serverCount
    const memoryRatio = comparisonMemory / baselineMemory

    // Calculate server consolidation factor
    const serverConsolidation =
      baselineConfig.serverCount > config.serverCount
        ? (baselineConfig.serverCount - config.serverCount) / baselineConfig.serverCount
        : 0

    // Calculate performance uplift based on workload
    const workloadParams = PERFORMANCE_UPLIFT[workload] || PERFORMANCE_UPLIFT.other
    performanceUplift =
      memoryRatio * workloadParams.memory_ratio * 100 + serverConsolidation * workloadParams.server_consolidation * 100

    // Round to nearest integer
    performanceUplift = Math.round(performanceUplift)
  }

  return {
    name: config.name,
    serverCount: config.serverCount,
    dramCapacity: config.dram.capacity * config.serverCount,
    cxlCapacity: config.cxl.enabled ? config.cxl.capacity * config.serverCount : null,
    capex: totalCapEx,
    annualOpex: totalAnnualOpEx,
    totalTCO: totalTCO,
    tcoSavings: tcoSavings,
    tcoSavingsPercent: tcoSavingsPercent,
    performanceUplift: performanceUplift,
    annualPowerKwh: annualEnergyKwh,
    annualPowerCost: annualPowerCost,
    rackUnits: totalRackUnits,
  }
}

