import { CheckIcon, ServerIcon, BarChart3Icon, SettingsIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepsProps {
  currentStep: number
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    { id: 1, name: "Workload & Setup", icon: SettingsIcon },
    { id: 2, name: "Configure Systems", icon: ServerIcon },
    { id: 3, name: "Results & Comparison", icon: BarChart3Icon },
  ]

  return (
    <nav aria-label="Progress" className="py-4">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "", "relative flex-1")}>
            {step.id < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors">
                  <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
                <div className="ml-4 mt-2 hidden sm:block">
                  <span className="text-sm font-medium text-primary">{step.name}</span>
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white">
                  <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
                <div className="ml-4 mt-2 hidden sm:block">
                  <span className="text-sm font-medium text-primary">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <step.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
                <div className="ml-4 mt-2 hidden sm:block">
                  <span className="text-sm font-medium text-gray-500">{step.name}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

