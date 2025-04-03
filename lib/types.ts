export interface Configuration {
  id: string
  name: string
  isBaseline: boolean
  serverCount: number
  cpu: {
    sockets: number
    tier: string
    cores: number
  }
  dram: {
    capacity: number
    type: string
    speed: string
  }
  cxl: {
    enabled: boolean
    capacity: number
    tier: string
  }
  storage: {
    tier: string
    capacity: number
  }
  networking: {
    speed: string
  }
  notes: string
}

export interface TCOResult {
  name: string
  serverCount: number
  dramCapacity: number
  cxlCapacity: number | null
  capex: number
  annualOpex: number
  totalTCO: number
  tcoSavings: number
  tcoSavingsPercent: number
  performanceUplift: number
  annualPowerKwh: number
  annualPowerCost: number
  rackUnits: number
}

export interface TCOResults {
  baseline: TCOResult
  comparisons: {
    config: Configuration
    results: TCOResult
  }[]
}

