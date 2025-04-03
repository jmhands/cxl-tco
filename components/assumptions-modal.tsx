"use client"

import { useState } from "react"
import { DollarSign, Zap, BarChart3, Calculator, X } from "lucide-react"

interface AssumptionsModalProps {
  open: boolean
  onClose: () => void
}

export default function AssumptionsModal({ open, onClose }: AssumptionsModalProps) {
  const [activeTab, setActiveTab] = useState("cost")

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">TCO Calculator Assumptions</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 md:p-5">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="me-2">
              <button
                onClick={() => setActiveTab("cost")}
                className={`inline-flex items-center p-4 rounded-t-lg ${
                  activeTab === "cost"
                    ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 border-b-2 border-blue-600"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                }`}
              >
                <DollarSign className="w-4 h-4 me-2" />
                Cost Assumptions
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setActiveTab("performance")}
                className={`inline-flex items-center p-4 rounded-t-lg ${
                  activeTab === "performance"
                    ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 border-b-2 border-blue-600"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                }`}
              >
                <BarChart3 className="w-4 h-4 me-2" />
                Performance
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setActiveTab("power")}
                className={`inline-flex items-center p-4 rounded-t-lg ${
                  activeTab === "power"
                    ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 border-b-2 border-blue-600"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                }`}
              >
                <Zap className="w-4 h-4 me-2" />
                Power & Cooling
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("formulas")}
                className={`inline-flex items-center p-4 rounded-t-lg ${
                  activeTab === "formulas"
                    ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 border-b-2 border-blue-600"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                }`}
              >
                <Calculator className="w-4 h-4 me-2" />
                Calculation Formulas
              </button>
            </li>
          </ul>

          {activeTab === "cost" && (
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Hardware Cost Assumptions</h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Component
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tier
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                          Cost ($)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CPU
                        </th>
                        <td className="px-6 py-4">Entry</td>
                        <td className="px-6 py-4 text-right">$1,500 per socket</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CPU
                        </th>
                        <td className="px-6 py-4">Mid-Range</td>
                        <td className="px-6 py-4 text-right">$3,000 per socket</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CPU
                        </th>
                        <td className="px-6 py-4">High-End</td>
                        <td className="px-6 py-4 text-right">$6,000 per socket</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          DRAM
                        </th>
                        <td className="px-6 py-4">DDR4</td>
                        <td className="px-6 py-4 text-right">$8 per GB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          DRAM
                        </th>
                        <td className="px-6 py-4">DDR5</td>
                        <td className="px-6 py-4 text-right">$10 per GB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CXL Memory
                        </th>
                        <td className="px-6 py-4">Standard</td>
                        <td className="px-6 py-4 text-right">$5 per GB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CXL Memory
                        </th>
                        <td className="px-6 py-4">High Performance</td>
                        <td className="px-6 py-4 text-right">$7 per GB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Storage
                        </th>
                        <td className="px-6 py-4">HDD</td>
                        <td className="px-6 py-4 text-right">$50 per TB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Storage
                        </th>
                        <td className="px-6 py-4">SATA SSD</td>
                        <td className="px-6 py-4 text-right">$150 per TB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Storage
                        </th>
                        <td className="px-6 py-4">NVMe SSD</td>
                        <td className="px-6 py-4 text-right">$300 per TB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Networking
                        </th>
                        <td className="px-6 py-4">10 GbE</td>
                        <td className="px-6 py-4 text-right">$300</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Networking
                        </th>
                        <td className="px-6 py-4">25 GbE</td>
                        <td className="px-6 py-4 text-right">$500</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Networking
                        </th>
                        <td className="px-6 py-4">100 GbE</td>
                        <td className="px-6 py-4 text-right">$1,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Operational Cost Assumptions</h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Item
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Power Cost
                        </th>
                        <td className="px-6 py-4 text-right">$0.12 per kWh</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          PUE (Power Usage Effectiveness)
                        </th>
                        <td className="px-6 py-4 text-right">1.5</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Rack Space Cost
                        </th>
                        <td className="px-6 py-4 text-right">$30 per U per month</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Maintenance Cost
                        </th>
                        <td className="px-6 py-4 text-right">15% of CapEx per year</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Admin Cost
                        </th>
                        <td className="px-6 py-4 text-right">$500 per server per year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Performance Assumptions</h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Workload
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Metric
                        </th>
                        <th scope="col" className="px-6 py-3">
                          CXL Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          In-Memory Database
                        </th>
                        <td className="px-6 py-4">QPS (Queries Per Second)</td>
                        <td className="px-6 py-4">
                          <ul className="list-disc pl-5">
                            <li>+20-40% with expanded memory</li>
                            <li>Server reduction based on memory footprint</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Relational Database
                        </th>
                        <td className="px-6 py-4">Transactions/sec</td>
                        <td className="px-6 py-4">
                          <ul className="list-disc pl-5">
                            <li>+15-30% with larger buffer pools</li>
                            <li>Reduced I/O operations</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          AI/ML Training
                        </th>
                        <td className="px-6 py-4">Training time reduction</td>
                        <td className="px-6 py-4">
                          <ul className="list-disc pl-5">
                            <li>+25-50% with full model in memory</li>
                            <li>Reduced paging operations</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Virtualization
                        </th>
                        <td className="px-6 py-4">VM density</td>
                        <td className="px-6 py-4">
                          <ul className="list-disc pl-5">
                            <li>+30-60% more VMs per server</li>
                            <li>Server consolidation opportunities</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Memory Latency Assumptions</h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Memory Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                          Latency
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          DDR4
                        </th>
                        <td className="px-6 py-4 text-right">~80ns</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          DDR5
                        </th>
                        <td className="px-6 py-4 text-right">~100ns</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CXL Standard
                        </th>
                        <td className="px-6 py-4 text-right">~150ns</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CXL High Performance
                        </th>
                        <td className="px-6 py-4 text-right">~120ns</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "power" && (
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                  Power Consumption Assumptions
                </h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Component
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tier
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                          Power (Watts)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CPU
                        </th>
                        <td className="px-6 py-4">Entry</td>
                        <td className="px-6 py-4 text-right">100W per socket</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CPU
                        </th>
                        <td className="px-6 py-4">Mid-Range</td>
                        <td className="px-6 py-4 text-right">200W per socket</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CPU
                        </th>
                        <td className="px-6 py-4">High-End</td>
                        <td className="px-6 py-4 text-right">300W per socket</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          DRAM
                        </th>
                        <td className="px-6 py-4">DDR4</td>
                        <td className="px-6 py-4 text-right">0.4W per GB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          DRAM
                        </th>
                        <td className="px-6 py-4">DDR5</td>
                        <td className="px-6 py-4 text-right">0.3W per GB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CXL Memory
                        </th>
                        <td className="px-6 py-4">Standard</td>
                        <td className="px-6 py-4 text-right">0.25W per GB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          CXL Memory
                        </th>
                        <td className="px-6 py-4">High Performance</td>
                        <td className="px-6 py-4 text-right">0.35W per GB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Storage
                        </th>
                        <td className="px-6 py-4">HDD</td>
                        <td className="px-6 py-4 text-right">10W per TB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Storage
                        </th>
                        <td className="px-6 py-4">SATA SSD</td>
                        <td className="px-6 py-4 text-right">5W per TB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Storage
                        </th>
                        <td className="px-6 py-4">NVMe SSD</td>
                        <td className="px-6 py-4 text-right">8W per TB</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Server Base
                        </th>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4 text-right">50W per server</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "formulas" && (
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">TCO Calculation Formulas</h3>
                <div className="space-y-4 p-4 bg-gray-50 rounded-md dark:bg-gray-700">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">CapEx Calculation</h4>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      Total_Hardware_CapEx = (CPU_Cost + DRAM_Cost + Storage_Cost + Networking_Cost + CXL_Cost) ×
                      Server_Count
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">OpEx Calculation</h4>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      Annual_Power_Cost = Total_Power_Watts × 24 × 365 × PUE × Cost_per_kWh / 1000
                    </p>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      Annual_Space_Cost = Rack_Units × Cost_per_RU_Month × 12
                    </p>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      Annual_Maintenance_Cost = Total_Hardware_CapEx × Maintenance_Rate
                    </p>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      Annual_Admin_Cost = Admin_Cost_per_Server × Server_Count
                    </p>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      Total_Annual_OpEx = Annual_Power_Cost + Annual_Space_Cost + Annual_Maintenance_Cost +
                      Annual_Admin_Cost
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Total TCO Calculation</h4>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      Total_TCO = Total_CapEx + (Total_Annual_OpEx × Amortization_Period)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Savings Calculation</h4>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      TCO_Savings = Baseline_TCO - Comparison_TCO
                    </p>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      TCO_Savings_Percent = (TCO_Savings / Baseline_TCO) × 100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

