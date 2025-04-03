"use client"

import { useState } from "react"
import { Calculator, Info, Download, Plus, Trash2, Server, BarChart3, Clock } from "lucide-react"
import ConfigurationForm from "@/components/configuration-form"
import ComparisonTable from "@/components/comparison-table"
import WorkloadSelector from "@/components/workload-selector"
import AssumptionsModal from "@/components/assumptions-modal"
import { calculateTCO } from "@/lib/tco-calculator"
import type { Configuration, TCOResults } from "@/lib/types"

export default function TCOCalculator() {
  const [activeTab, setActiveTab] = useState("setup")
  const [workload, setWorkload] = useState("imdb")
  const [amortizationPeriod, setAmortizationPeriod] = useState(3)
  const [configurations, setConfigurations] = useState<Configuration[]>([
    {
      id: "config-1",
      name: "Baseline Configuration",
      isBaseline: true,
      serverCount: 5,
      cpu: { sockets: 2, tier: "mid", cores: 32 },
      dram: { capacity: 512, type: "ddr5", speed: "4800" },
      cxl: { enabled: false, capacity: 0, tier: "standard" },
      storage: { tier: "mid", capacity: 10 },
      networking: { speed: "100" },
      notes: "",
    },
  ])
  const [results, setResults] = useState<TCOResults | null>(null)
  const [showAssumptions, setShowAssumptions] = useState(false)

  const addConfiguration = () => {
    if (configurations.length >= 5) return

    const newConfig: Configuration = {
      id: `config-${configurations.length + 1}`,
      name: `Configuration ${configurations.length + 1}`,
      isBaseline: false,
      serverCount: 2,
      cpu: { sockets: 2, tier: "mid", cores: 32 },
      dram: { capacity: 512, type: "ddr5", speed: "4800" },
      cxl: { enabled: true, capacity: 2048, tier: "standard" },
      storage: { tier: "mid", capacity: 10 },
      networking: { speed: "100" },
      notes: "",
    }

    setConfigurations([...configurations, newConfig])
  }

  const updateConfiguration = (updatedConfig: Configuration) => {
    const newConfigs = configurations.map((config) => (config.id === updatedConfig.id ? updatedConfig : config))

    // If the updated config is now the baseline, make sure no other config is a baseline
    if (updatedConfig.isBaseline) {
      newConfigs.forEach((config) => {
        if (config.id !== updatedConfig.id) {
          config.isBaseline = false
        }
      })
    }

    setConfigurations(newConfigs)
  }

  const removeConfiguration = (configId: string) => {
    // Don't allow removing if it's the only configuration
    if (configurations.length <= 1) return

    const newConfigs = configurations.filter((config) => config.id !== configId)

    // If we removed the baseline, set the first config as the baseline
    if (!newConfigs.some((config) => config.isBaseline)) {
      newConfigs[0].isBaseline = true
    }

    setConfigurations(newConfigs)
  }

  const calculateResults = () => {
    const baselineConfig = configurations.find((config) => config.isBaseline)
    if (!baselineConfig) return

    const calculatedResults = {
      baseline: calculateTCO(baselineConfig, amortizationPeriod, workload),
      comparisons: configurations
        .filter((config) => !config.isBaseline)
        .map((config) => ({
          config,
          results: calculateTCO(config, amortizationPeriod, workload, baselineConfig),
        })),
    }

    setResults(calculatedResults)
    setActiveTab("results")
  }

  const exportResults = () => {
    if (!results) return

    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += "Metric,Baseline"

    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.config.name}`
    })

    csvContent += "\nServers," + results.baseline.serverCount
    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.results.serverCount}`
    })

    csvContent += "\nDRAM Total (GB)," + results.baseline.dramCapacity
    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.results.dramCapacity}`
    })

    csvContent += "\nCXL Memory (GB)," + (results.baseline.cxlCapacity || 0)
    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.results.cxlCapacity || 0}`
    })

    csvContent += "\nCapEx ($)," + results.baseline.capex.toLocaleString()
    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.results.capex.toLocaleString()}`
    })

    csvContent += "\nAnnual OpEx ($)," + results.baseline.annualOpex.toLocaleString()
    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.results.annualOpex.toLocaleString()}`
    })

    csvContent += `\nTotal TCO (${amortizationPeriod} years),` + results.baseline.totalTCO.toLocaleString()
    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.results.totalTCO.toLocaleString()}`
    })

    csvContent += "\nTCO Savings vs Baseline ($),0"
    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.results.tcoSavings.toLocaleString()}`
    })

    csvContent += "\nPerformance Uplift (%),0"
    results.comparisons.forEach((comparison) => {
      csvContent += `,${comparison.results.performanceUplift}`
    })

    // Create download link
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "cxl_tco_results.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <header className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-3">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">CXL TCO Calculator</h1>
          <button
            data-tooltip-target="tooltip-info"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <Info className="h-5 w-5" />
            <div
              id="tooltip-info"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Compare the Total Cost of Ownership (TCO) of traditional server configurations with CXL-enabled systems.
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowAssumptions(true)}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <Info className="inline-block mr-2 h-4 w-4" />
            View Assumptions
          </button>
          {results && (
            <button
              type="button"
              onClick={exportResults}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <Download className="inline-block mr-2 h-4 w-4" />
              Export Results
            </button>
          )}
        </div>
      </header>

      <div className="mb-4">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                onClick={() => setActiveTab("setup")}
                className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                  activeTab === "setup"
                    ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                <Clock className="w-4 h-4 mr-2" />
                1. Setup
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab("configurations")}
                className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                  activeTab === "configurations"
                    ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                <Server className="w-4 h-4 mr-2" />
                2. Configurations
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab("results")}
                disabled={!results}
                className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                  activeTab === "results"
                    ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } ${!results ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                3. Results
              </button>
            </li>
          </ul>
        </div>
      </div>

      {activeTab === "setup" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Initial Setup</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select your workload type and TCO amortization period
            </p>
          </div>
          <div className="space-y-6">
            <WorkloadSelector
              workload={workload}
              setWorkload={setWorkload}
              amortizationPeriod={amortizationPeriod}
              setAmortizationPeriod={setAmortizationPeriod}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab("configurations")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next: Configure Systems
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "configurations" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex flex-row items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Server Configurations</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Define up to 5 server configurations to compare
              </p>
            </div>
            {configurations.length < 5 && (
              <button
                onClick={addConfiguration}
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <Plus className="inline-block mr-2 h-4 w-4" />
                Add Configuration
              </button>
            )}
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {configurations.map((config) => (
                <div
                  key={config.id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">{config.name}</h5>
                    {configurations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeConfiguration(config.id)}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <ConfigurationForm config={config} updateConfig={updateConfiguration} />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab("setup")}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Back
              </button>
              <button
                type="button"
                onClick={calculateResults}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <Calculator className="inline-block mr-2 h-4 w-4" />
                Calculate TCO
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "results" && results && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">TCO Comparison Results</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {amortizationPeriod}-year TCO comparison for {workload.toUpperCase()} workload
            </p>
          </div>
          <ComparisonTable results={results} amortizationPeriod={amortizationPeriod} workload={workload} />
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setActiveTab("configurations")}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Back to Configurations
            </button>
            <button
              type="button"
              onClick={exportResults}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <Download className="inline-block mr-2 h-4 w-4" />
              Export Results
            </button>
          </div>
        </div>
      )}

      <AssumptionsModal open={showAssumptions} onClose={() => setShowAssumptions(false)} />
    </div>
  )
}

