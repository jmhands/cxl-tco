import type { Configuration, GlobalSettings, CalculationResults } from "@/lib/types"

export function calculateTco(globalSettings: GlobalSettings, configurations: Configuration[]): CalculationResults {
  const results: CalculationResults = {
    configResults: {},
  }

  const amortizationPeriod = Number.parseInt(globalSettings.amortizationPeriod)

  configurations.forEach((config) => {
    // Calculate CapEx based on configuration
    const serverCost = calculateServerCost(config)
    const capex = serverCost * config.serverCount

    // Calculate OpEx
    const powerCost = calculatePowerCost(config)
    const spaceCost = calculateSpaceCost(config)
    const maintenanceCost = capex * 0.15 // 15% of CapEx
    const adminCost = config.serverCount * 500 // $500 per server

    const annualOpex = powerCost + spaceCost + maintenanceCost + adminCost
    const totalTco = capex + annualOpex * amortizationPeriod

    // Calculate performance metrics based on workload
    const performanceMetrics = calculatePerformanceMetrics(globalSettings.workload, config)

    results.configResults[config.id] = {
      capex,
      annualOpex,
      totalTco,
      performanceMetrics,
    }
  })

  return results
}

function calculateServerCost(config: Configuration): number {
  // CPU cost based on tier and sockets
  const cpuCostMap = {
    entry: 500,
    mid: 1200,
    high: 3000,
  }
  const cpuCost = cpuCostMap[config.cpu.tier] * config.cpu.sockets

  // DRAM cost
  const dramCostPerGB = config.dram.type === "DDR5" ? 10 : 8
  const dramCost = config.dram.capacity * dramCostPerGB

  // CXL memory cost
  const cxlCostPerGB = config.cxlMemory.tier === "high-perf" ? 12 : 9
  const cxlCost = config.cxlMemory.enabled ? config.cxlMemory.capacity * cxlCostPerGB : 0

  // Storage cost
  const storageCostPerTB = {
    entry: 100,
    mid: 200,
    high: 400,
  }
  const storageCost = config.storage.capacity * storageCostPerTB[config.storage.tier]

  // Networking cost
  const networkingCost = Number.parseInt(config.networking.speed) * 10

  // Base server cost (chassis, etc.)
  const baseCost = 1000

  return cpuCost + dramCost + cxlCost + storageCost + networkingCost + baseCost
}

function calculatePowerCost(config: Configuration): number {
  // CPU power in watts
  const cpuPowerMap = {
    entry: 65,
    mid: 125,
    high: 250,
  }
  const cpuPower = cpuPowerMap[config.cpu.tier] * config.cpu.sockets

  // DRAM power (3W per 16GB)
  const dramPower = (config.dram.capacity / 16) * 3

  // CXL memory power
  const cxlPowerPerGB = config.cxlMemory.tier === "high-perf" ? 3 : 2.5
  const cxlPower = config.cxlMemory.enabled ? (config.cxlMemory.capacity / 16) * cxlPowerPerGB : 0

  // Storage power
  const storagePowerPerTB = {
    entry: 10,
    mid: 15,
    high: 25,
  }
  const storagePower = config.storage.capacity * storagePowerPerTB[config.storage.tier]

  // Base server power (fans, etc.)
  const basePower = 50

  // Total power in watts
  const totalPower = cpuPower + dramPower + cxlPower + storagePower + basePower

  // Convert to kW
  const totalPowerKW = totalPower / 1000

  // Annual energy in kWh (24/7 operation)
  const annualEnergyKWh = totalPowerKW * 24 * 365

  // Cost with PUE of 1.5
  const pue = 1.5
  const costPerKWh = 0.12

  return annualEnergyKWh * pue * costPerKWh * config.serverCount
}

function calculateSpaceCost(config: Configuration): number {
  const costPerRackUnitMonth = 30
  return config.rackUnits * costPerRackUnitMonth * 12 * config.serverCount
}

function calculatePerformanceMetrics(
  workload: string,
  config: Configuration,
): {
  upliftPercentage: number
  qpsImprovement?: number
  vmDensityIncrease?: number
  trainingTimeReduction?: number
} {
  // Base uplift from having CXL memory
  let upliftPercentage = 0

  if (config.cxlMemory.enabled) {
    // Calculate memory expansion ratio
    const totalDram = config.dram.capacity
    const totalMemory = totalDram + config.cxlMemory.capacity
    const expansionRatio = totalMemory / totalDram

    // Different workloads benefit differently from memory expansion
    switch (workload) {
      case "imdb":
        // In-memory databases benefit greatly from more memory
        upliftPercentage = (expansionRatio - 1) * 70
        return {
          upliftPercentage,
          qpsImprovement: upliftPercentage * 0.9, // 90% of the uplift translates to QPS
        }

      case "rdbms":
        // Relational databases benefit moderately
        upliftPercentage = (expansionRatio - 1) * 50
        return {
          upliftPercentage,
          qpsImprovement: upliftPercentage * 0.8,
        }

      case "aiml":
        // AI/ML training benefits from avoiding model paging
        upliftPercentage = (expansionRatio - 1) * 60
        return {
          upliftPercentage,
          trainingTimeReduction: upliftPercentage * 0.7,
        }

      case "virtualization":
        // Virtualization benefits from more VMs per server
        upliftPercentage = (expansionRatio - 1) * 80
        return {
          upliftPercentage,
          vmDensityIncrease: upliftPercentage * 0.95,
        }

      default:
        // Generic workload
        upliftPercentage = (expansionRatio - 1) * 40
        return { upliftPercentage }
    }
  }

  return { upliftPercentage }
}

