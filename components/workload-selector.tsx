"use client"

import { Database, Server, Cpu, Clock, Info, BarChart3, Zap, HardDrive } from "lucide-react"

interface WorkloadSelectorProps {
  workload: string
  setWorkload: (workload: string) => void
  amortizationPeriod: number
  setAmortizationPeriod: (period: number) => void
}

export default function WorkloadSelector({
  workload,
  setWorkload,
  amortizationPeriod,
  setAmortizationPeriod,
}: WorkloadSelectorProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Workload Type</label>
          <button
            data-tooltip-target="tooltip-workload"
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Info className="w-4 h-4" />
            <div
              id="tooltip-workload"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Select the primary workload for your infrastructure
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </div>

        <ul className="grid w-full gap-4">
          <li>
            <input
              type="radio"
              id="workload-imdb"
              name="workload"
              value="imdb"
              className="hidden peer"
              checked={workload === "imdb"}
              onChange={() => setWorkload("imdb")}
            />
            <label
              htmlFor="workload-imdb"
              className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <Database className="w-5 h-5 mr-3" />
                <div>
                  <div className="w-full text-base font-semibold">In-Memory Database</div>
                  <div className="w-full text-sm">Redis, SAP HANA, MemSQL</div>
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="workload-rdbms"
              name="workload"
              value="rdbms"
              className="hidden peer"
              checked={workload === "rdbms"}
              onChange={() => setWorkload("rdbms")}
            />
            <label
              htmlFor="workload-rdbms"
              className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <HardDrive className="w-5 h-5 mr-3" />
                <div>
                  <div className="w-full text-base font-semibold">Relational Database</div>
                  <div className="w-full text-sm">MySQL, PostgreSQL, SQL Server</div>
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="workload-aiml"
              name="workload"
              value="aiml"
              className="hidden peer"
              checked={workload === "aiml"}
              onChange={() => setWorkload("aiml")}
            />
            <label
              htmlFor="workload-aiml"
              className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <Cpu className="w-5 h-5 mr-3" />
                <div>
                  <div className="w-full text-base font-semibold">AI/ML Training</div>
                  <div className="w-full text-sm">TensorFlow, PyTorch, large models</div>
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="workload-virtualization"
              name="workload"
              value="virtualization"
              className="hidden peer"
              checked={workload === "virtualization"}
              onChange={() => setWorkload("virtualization")}
            />
            <label
              htmlFor="workload-virtualization"
              className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <Server className="w-5 h-5 mr-3" />
                <div>
                  <div className="w-full text-base font-semibold">Virtualization</div>
                  <div className="w-full text-sm">VMware, KVM, Hyper-V</div>
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="workload-other"
              name="workload"
              value="other"
              className="hidden peer"
              checked={workload === "other"}
              onChange={() => setWorkload("other")}
            />
            <label
              htmlFor="workload-other"
              className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-3" />
                <div>
                  <div className="w-full text-base font-semibold">Other</div>
                  <div className="w-full text-sm">General purpose workloads</div>
                </div>
              </div>
            </label>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="amortization-period"
              className="flex items-center text-sm font-medium text-gray-900 dark:text-white"
            >
              <Clock className="w-4 h-4 mr-2" />
              TCO Amortization Period
            </label>
            <button
              data-tooltip-target="tooltip-amortization"
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Info className="w-4 h-4" />
              <div
                id="tooltip-amortization"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                The time period over which to calculate TCO
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </button>
          </div>
          <select
            id="amortization-period"
            value={amortizationPeriod.toString()}
            onChange={(e) => setAmortizationPeriod(Number.parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="1">1 Year</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
            <option value="7">7 Years</option>
          </select>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
          <h3 className="flex items-center font-medium mb-2 text-blue-800 dark:text-blue-400">
            <Zap className="w-4 h-4 mr-2" />
            Workload Characteristics
          </h3>
          {workload === "imdb" && (
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <p>In-Memory Databases are highly sensitive to memory capacity and performance.</p>
              <p>CXL benefits:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Expanded memory capacity beyond DRAM limits</li>
                <li>Reduced server count for large datasets</li>
                <li>Improved QPS for memory-bound workloads</li>
              </ul>
            </div>
          )}
          {workload === "rdbms" && (
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <p>Relational Databases benefit from balanced compute and memory resources.</p>
              <p>CXL benefits:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Larger buffer pools for improved cache hit rates</li>
                <li>Better query performance for analytical workloads</li>
                <li>Reduced I/O operations</li>
              </ul>
            </div>
          )}
          {workload === "aiml" && (
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <p>AI/ML Training requires large memory footprints for model data.</p>
              <p>CXL benefits:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fit larger models in memory</li>
                <li>Reduce training time with less paging</li>
                <li>Lower cost per training job</li>
              </ul>
            </div>
          )}
          {workload === "virtualization" && (
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <p>Virtualization environments are often memory-constrained.</p>
              <p>CXL benefits:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Higher VM density per server</li>
                <li>Improved VM performance with more memory</li>
                <li>Server consolidation opportunities</li>
              </ul>
            </div>
          )}
          {workload === "other" && (
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <p>General purpose workloads can benefit from memory expansion.</p>
              <p>CXL benefits:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Flexible memory allocation</li>
                <li>Improved performance for memory-bound applications</li>
                <li>Cost-effective scaling</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

