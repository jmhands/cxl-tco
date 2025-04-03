"use client"

import { useState } from "react"
import { WorkloadSetup } from "@/components/workload-setup"
import { ConfigurationInput } from "@/components/configuration-input"
import { ResultsComparison } from "@/components/results-comparison"
import { Steps } from "@/components/steps"
import { toast } from "@/components/ui/use-toast"
import { type Configuration, type GlobalSettings, type CalculationResults, defaultGlobalSettings } from "@/lib/types"

export function Calculator() {
  const [step, setStep] = useState(1)
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(defaultGlobalSettings)
  const [configurations, setConfigurations] = useState<Configuration[]>([
    {
      id: "1",
      name: "Baseline Configuration",
      isBaseline: true,
      serverCount: 5,
      cpu: { sockets: 2, tier: "mid", cores: 32 },
      dram: { capacity: 512, type: "DDR5", speed: "4800" },
      cxlMemory: { enabled: false, capacity: 0, tier: "standard" },
      storage: { tier: "mid", capacity: 10 },
      networking: { speed: "25" },
      rackUnits: 1,
      notes: "",
    },
  ])
  const [results, setResults] = useState<CalculationResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const addConfiguration = () => {
    if (configurations.length >= 5) {
      toast({
        title: "Maximum configurations reached",
        description: "You can compare up to 5 configurations.",
        variant: "destructive",
      })
      return
    }

    const newConfig: Configuration = {
      id: (configurations.length + 1).toString(),
      name: `Configuration ${configurations.length + 1}`,
      isBaseline: false,
      serverCount: 5,
      cpu: { sockets: 2, tier: "mid", cores: 32 },
      dram: { capacity: 512, type: "DDR5", speed: "4800" },
      cxlMemory: { enabled: true, capacity: 1024, tier: "standard" },
      storage: { tier: "mid", capacity: 10 },
      networking: { speed: "25" },
      rackUnits: 1,
      notes: "",
    }

    setConfigurations([...configurations, newConfig])
  }

  const removeConfiguration = (id: string) => {
    if (configurations.length <= 1) {
      toast({
        title: "Cannot remove configuration",
        description: "You need at least one configuration.",
        variant: "destructive",
      })
      return
    }

    const updatedConfigs = configurations.filter((config) => config.id !== id)

    // If we removed the baseline, set the first config as the new baseline
    if (configurations.find((c) => c.id === id)?.isBaseline && updatedConfigs.length > 0) {
      updatedConfigs[0].isBaseline = true
    }

    setConfigurations(updatedConfigs)
  }

  const updateConfiguration = (updatedConfig: Configuration) => {
    const updatedConfigs = configurations.map((config) => (config.id === updatedConfig.id ? updatedConfig : config))

    // If this config was set as baseline, unset others
    if (updatedConfig.isBaseline) {
      updatedConfigs.forEach((config) => {
        if (config.id !== updatedConfig.id) {
          config.isBaseline = false
        }
      })
    }

    setConfigurations(updatedConfigs)
  }

  const calculateResults = async () => {
    setIsCalculating(true)

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          globalSettings,
          configurations,
        }),
      })

      if (!response.ok) {
        throw new Error("Calculation failed")
      }

      const data = await response.json()
      setResults(data)
      setStep(3)
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error calculating the TCO. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsCalculating(false)
    }
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="space-y-8">
      <Steps currentStep={step} />

      {step === 1 && (
        <WorkloadSetup globalSettings={globalSettings} setGlobalSettings={setGlobalSettings} onNext={nextStep} />
      )}

      {step === 2 && (
        <ConfigurationInput
          configurations={configurations}
          addConfiguration={addConfiguration}
          removeConfiguration={removeConfiguration}
          updateConfiguration={updateConfiguration}
          onCalculate={calculateResults}
          onBack={prevStep}
          isCalculating={isCalculating}
        />
      )}

      {step === 3 && results && (
        <ResultsComparison
          results={results}
          configurations={configurations}
          globalSettings={globalSettings}
          onBack={prevStep}
        />
      )}
    </div>
  )
}

