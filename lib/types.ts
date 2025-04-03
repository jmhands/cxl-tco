// Global settings for the calculator
export interface GlobalSettings {
  workload: "imdb" | "rdbms" | "aiml" | "virtualization" | "other"
  amortizationPeriod: string
  currency: string
}

export const defaultGlobalSettings: GlobalSettings = {
  workload: "imdb",
  amortizationPeriod: "3",
  currency: "$",
}

// Server configuration
export interface Configuration {
  id: string
  name: string
  isBaseline: boolean
  serverCount: number
  cpu: {
    sockets: number
    tier: "entry" | "mid" | "high"
    cores: number
  }
  dram: {
    capacity: number
    type: "DDR4" | "DDR5"
    speed: string
  }
  cxlMemory: {
    enabled: boolean
    capacity: number
    tier: "standard" | "high-perf"
  }
  storage: {
    tier: "entry" | "mid" | "high"
    capacity: number
  }
  networking: {
    speed: string
  }
  rackUnits: number
  notes: string
}

// Calculation results
export interface ConfigResult {
  capex: number
  annualOpex: number
  totalTco: number
  performanceMetrics: {
    upliftPercentage: number
    qpsImprovement?: number
    vmDensityIncrease?: number
    trainingTimeReduction?: number
  }
}

export interface CalculationResults {
  configResults: {
    [configId: string]: ConfigResult
  }
}

