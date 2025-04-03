"use client"
import type { Configuration } from "@/lib/types"
import { Server, Cpu, MemoryStickIcon as Memory, Database, HardDrive, Network, Info, StickyNote } from "lucide-react"

interface ConfigurationFormProps {
  config: Configuration
  updateConfig: (config: Configuration) => void
}

export default function ConfigurationForm({ config, updateConfig }: ConfigurationFormProps) {
  const handleChange = (field: string, value: any) => {
    const updatedConfig = { ...config, [field]: value }
    updateConfig(updatedConfig)
  }

  const handleNestedChange = (parent: string, field: string, value: any) => {
    const updatedConfig = {
      ...config,
      [parent]: {
        ...config[parent],
        [field]: value,
      },
    }
    updateConfig(updatedConfig)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor={`${config.id}-name`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Configuration Name
          </label>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.isBaseline}
                onChange={(e) => handleChange("isBaseline", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Baseline</span>
            </label>
          </div>
        </div>
        <input
          type="text"
          id={`${config.id}-name`}
          value={config.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor={`${config.id}-server-count`}
            className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <Server className="w-4 h-4 mr-2" />
            Number of Servers
          </label>
          <button
            data-tooltip-target={`tooltip-servers-${config.id}`}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Info className="w-4 h-4" />
            <div
              id={`tooltip-servers-${config.id}`}
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Total number of servers in this configuration
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </div>
        <input
          type="number"
          id={`${config.id}-server-count`}
          min={1}
          value={config.serverCount}
          onChange={(e) => handleChange("serverCount", Number.parseInt(e.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <Cpu className="w-4 h-4 mr-2" />
            CPU Configuration
          </label>
          <button
            data-tooltip-target={`tooltip-cpu-${config.id}`}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Info className="w-4 h-4" />
            <div
              id={`tooltip-cpu-${config.id}`}
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Select CPU tier and socket count
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor={`${config.id}-cpu-sockets`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sockets
            </label>
            <select
              id={`${config.id}-cpu-sockets`}
              value={config.cpu.sockets.toString()}
              onChange={(e) => handleNestedChange("cpu", "sockets", Number.parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          </div>
          <div>
            <label
              htmlFor={`${config.id}-cpu-tier`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tier
            </label>
            <select
              id={`${config.id}-cpu-tier`}
              value={config.cpu.tier}
              onChange={(e) => handleNestedChange("cpu", "tier", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="entry">Entry</option>
              <option value="mid">Mid-Range</option>
              <option value="high">High-End</option>
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor={`${config.id}-cpu-cores`}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cores per Socket
          </label>
          <input
            type="number"
            id={`${config.id}-cpu-cores`}
            min={4}
            value={config.cpu.cores}
            onChange={(e) => handleNestedChange("cpu", "cores", Number.parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <Memory className="w-4 h-4 mr-2" />
            DRAM Configuration
          </label>
          <button
            data-tooltip-target={`tooltip-dram-${config.id}`}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Info className="w-4 h-4" />
            <div
              id={`tooltip-dram-${config.id}`}
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Configure server DRAM capacity and type
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor={`${config.id}-dram-capacity`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Capacity (GB)
            </label>
            <input
              type="number"
              id={`${config.id}-dram-capacity`}
              min={64}
              step={64}
              value={config.dram.capacity}
              onChange={(e) => handleNestedChange("dram", "capacity", Number.parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor={`${config.id}-dram-type`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              id={`${config.id}-dram-type`}
              value={config.dram.type}
              onChange={(e) => handleNestedChange("dram", "type", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="ddr4">DDR4</option>
              <option value="ddr5">DDR5</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.cxl.enabled}
                onChange={(e) => handleNestedChange("cxl", "enabled", e.target.checked)}
                disabled={config.isBaseline}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:bg-gray-300 peer-disabled:cursor-not-allowed"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center">
                <Database className="w-4 h-4 mr-2" />
                CXL Memory Expansion
              </span>
            </label>
          </div>
          <button
            data-tooltip-target={`tooltip-cxl-${config.id}`}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Info className="w-4 h-4" />
            <div
              id={`tooltip-cxl-${config.id}`}
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Enable CXL memory expansion (not available for baseline configuration)
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </div>

        {config.cxl.enabled && !config.isBaseline && (
          <div className="grid grid-cols-2 gap-2 pl-6 pt-2">
            <div>
              <label
                htmlFor={`${config.id}-cxl-capacity`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Capacity (GB)
              </label>
              <input
                type="number"
                id={`${config.id}-cxl-capacity`}
                min={256}
                step={256}
                value={config.cxl.capacity}
                onChange={(e) => handleNestedChange("cxl", "capacity", Number.parseInt(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor={`${config.id}-cxl-tier`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tier
              </label>
              <select
                id={`${config.id}-cxl-tier`}
                value={config.cxl.tier}
                onChange={(e) => handleNestedChange("cxl", "tier", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="standard">Standard</option>
                <option value="high-perf">High Performance</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <HardDrive className="w-4 h-4 mr-2" />
            Storage Configuration
          </label>
          <button
            data-tooltip-target={`tooltip-storage-${config.id}`}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Info className="w-4 h-4" />
            <div
              id={`tooltip-storage-${config.id}`}
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Configure server storage capacity and tier
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor={`${config.id}-storage-capacity`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Capacity (TB)
            </label>
            <input
              type="number"
              id={`${config.id}-storage-capacity`}
              min={1}
              value={config.storage.capacity}
              onChange={(e) => handleNestedChange("storage", "capacity", Number.parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor={`${config.id}-storage-tier`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tier
            </label>
            <select
              id={`${config.id}-storage-tier`}
              value={config.storage.tier}
              onChange={(e) => handleNestedChange("storage", "tier", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="entry">HDD</option>
              <option value="mid">SATA SSD</option>
              <option value="high">NVMe SSD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor={`${config.id}-networking`}
            className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <Network className="w-4 h-4 mr-2" />
            Networking
          </label>
          <button
            data-tooltip-target={`tooltip-networking-${config.id}`}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Info className="w-4 h-4" />
            <div
              id={`tooltip-networking-${config.id}`}
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Select networking speed (GbE)
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </div>
        <select
          id={`${config.id}-networking`}
          value={config.networking.speed}
          onChange={(e) => handleNestedChange("networking", "speed", e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="10">10 GbE</option>
          <option value="25">25 GbE</option>
          <option value="100">100 GbE</option>
          <option value="200">200 GbE</option>
          <option value="400">400 GbE</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`${config.id}-notes`}
          className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <StickyNote className="w-4 h-4 mr-2" />
          Notes (Optional)
        </label>
        <textarea
          id={`${config.id}-notes`}
          placeholder="Add any additional notes about this configuration"
          value={config.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          rows={3}
        />
      </div>
    </div>
  )
}

