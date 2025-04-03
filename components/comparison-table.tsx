"use client"

import type { TCOResults } from "@/lib/types"
import {
  ArrowDown,
  ArrowUp,
  TrendingUp,
  Server,
  MemoryStickIcon as Memory,
  Database,
  DollarSign,
  Zap,
  BarChart3,
  Info,
} from "lucide-react"

interface ComparisonTableProps {
  results: TCOResults
  amortizationPeriod: number
  workload: string
}

export default function ComparisonTable({ results, amortizationPeriod, workload }: ComparisonTableProps) {
  const getWorkloadMetric = (workload: string) => {
    switch (workload) {
      case "imdb":
        return "QPS"
      case "rdbms":
        return "Transactions/sec"
      case "aiml":
        return "Training time reduction"
      case "virtualization":
        return "VM density"
      default:
        return "Performance"
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Metric
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                {results.baseline.name} (Baseline)
              </th>
              {results.comparisons.map((comparison) => (
                <th key={comparison.config.id} scope="col" className="px-6 py-3 text-right">
                  {comparison.config.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <Server className="w-4 h-4 mr-2" />
                Servers
              </th>
              <td className="px-6 py-4 text-right">{results.baseline.serverCount}</td>
              {results.comparisons.map((comparison) => (
                <td key={comparison.config.id} className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end">
                    {comparison.results.serverCount}
                    {comparison.results.serverCount < results.baseline.serverCount && (
                      <ArrowDown className="ml-1 h-4 w-4 text-green-500" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <Memory className="w-4 h-4 mr-2" />
                DRAM Total (GB)
              </th>
              <td className="px-6 py-4 text-right">{results.baseline.dramCapacity.toLocaleString()}</td>
              {results.comparisons.map((comparison) => (
                <td key={comparison.config.id} className="px-6 py-4 text-right">
                  {comparison.results.dramCapacity.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <Database className="w-4 h-4 mr-2" />
                CXL Memory (GB)
              </th>
              <td className="px-6 py-4 text-right">{(results.baseline.cxlCapacity || 0).toLocaleString()}</td>
              {results.comparisons.map((comparison) => (
                <td key={comparison.config.id} className="px-6 py-4 text-right">
                  {(comparison.results.cxlCapacity || 0).toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                CapEx ($)
              </th>
              <td className="px-6 py-4 text-right">${results.baseline.capex.toLocaleString()}</td>
              {results.comparisons.map((comparison) => (
                <td key={comparison.config.id} className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end">
                    ${comparison.results.capex.toLocaleString()}
                    {comparison.results.capex < results.baseline.capex ? (
                      <ArrowDown className="ml-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowUp className="ml-1 h-4 w-4 text-red-500" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Annual OpEx ($)
              </th>
              <td className="px-6 py-4 text-right">${results.baseline.annualOpex.toLocaleString()}</td>
              {results.comparisons.map((comparison) => (
                <td key={comparison.config.id} className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end">
                    ${comparison.results.annualOpex.toLocaleString()}
                    {comparison.results.annualOpex < results.baseline.annualOpex ? (
                      <ArrowDown className="ml-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowUp className="ml-1 h-4 w-4 text-red-500" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>Total TCO ({amortizationPeriod} years)</span>
                  <button
                    data-tooltip-target="tooltip-tco"
                    type="button"
                    className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Info className="w-4 h-4" />
                    <div
                      id="tooltip-tco"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                      CapEx + (OpEx × {amortizationPeriod} years)
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </button>
                </div>
              </th>
              <td className="px-6 py-4 text-right font-bold">${results.baseline.totalTCO.toLocaleString()}</td>
              {results.comparisons.map((comparison) => (
                <td key={comparison.config.id} className="px-6 py-4 text-right font-bold">
                  <div className="flex items-center justify-end">
                    ${comparison.results.totalTCO.toLocaleString()}
                    {comparison.results.totalTCO < results.baseline.totalTCO ? (
                      <ArrowDown className="ml-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowUp className="ml-1 h-4 w-4 text-red-500" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                TCO Savings vs Baseline
              </th>
              <td className="px-6 py-4 text-right">-</td>
              {results.comparisons.map((comparison) => (
                <td key={comparison.config.id} className="px-6 py-4 text-right text-green-600 font-medium">
                  ${comparison.results.tcoSavings.toLocaleString()}({comparison.results.tcoSavingsPercent.toFixed(1)}%)
                </td>
              ))}
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <span>{getWorkloadMetric(workload)} Improvement</span>
                  <button
                    data-tooltip-target="tooltip-performance"
                    type="button"
                    className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Info className="w-4 h-4" />
                    <div
                      id="tooltip-performance"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                      Estimated performance improvement based on workload characteristics
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </button>
                </div>
              </th>
              <td className="px-6 py-4 text-right">Baseline</td>
              {results.comparisons.map((comparison) => (
                <td key={comparison.config.id} className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end text-green-600 font-medium">
                    +{comparison.results.performanceUplift}%
                    <TrendingUp className="ml-1 h-4 w-4" />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h3 className="flex items-center text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" />
            Power & Cooling Impact
          </h3>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-2">
                    Configuration
                  </th>
                  <th scope="col" className="px-4 py-2 text-right">
                    Annual Power (kWh)
                  </th>
                  <th scope="col" className="px-4 py-2 text-right">
                    Cost ($)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {results.baseline.name}
                  </th>
                  <td className="px-4 py-2 text-right">{results.baseline.annualPowerKwh.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">${results.baseline.annualPowerCost.toLocaleString()}</td>
                </tr>
                {results.comparisons.map((comparison) => (
                  <tr key={comparison.config.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {comparison.config.name}
                    </th>
                    <td className="px-4 py-2 text-right">{comparison.results.annualPowerKwh.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">${comparison.results.annualPowerCost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h3 className="flex items-center text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            <Server className="w-5 h-5 mr-2 text-blue-500" />
            Server Consolidation
          </h3>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-2">
                    Configuration
                  </th>
                  <th scope="col" className="px-4 py-2 text-right">
                    Servers
                  </th>
                  <th scope="col" className="px-4 py-2 text-right">
                    Rack Units
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {results.baseline.name}
                  </th>
                  <td className="px-4 py-2 text-right">{results.baseline.serverCount}</td>
                  <td className="px-4 py-2 text-right">{results.baseline.rackUnits}</td>
                </tr>
                {results.comparisons.map((comparison) => (
                  <tr key={comparison.config.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {comparison.config.name}
                    </th>
                    <td className="px-4 py-2 text-right">{comparison.results.serverCount}</td>
                    <td className="px-4 py-2 text-right">{comparison.results.rackUnits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

