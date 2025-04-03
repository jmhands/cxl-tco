"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Configuration } from "@/lib/types"
import { ConfigurationCard } from "@/components/configuration-card"
import { PlusIcon, ServerIcon, ArrowLeftIcon, CalculatorIcon, Loader2Icon } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface ConfigurationInputProps {
  configurations: Configuration[]
  addConfiguration: () => void
  removeConfiguration: (id: string) => void
  updateConfiguration: (config: Configuration) => void
  onCalculate: () => void
  onBack: () => void
  isCalculating: boolean
}

export function ConfigurationInput({
  configurations,
  addConfiguration,
  removeConfiguration,
  updateConfiguration,
  onCalculate,
  onBack,
  isCalculating,
}: ConfigurationInputProps) {
  return (
    <Card className="w-full border-primary/20 shadow-md">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-primary">
          <ServerIcon className="h-5 w-5" />
          Server Configurations
        </CardTitle>
        <CardDescription>Define up to 5 server configurations to compare</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex space-x-4">
            {configurations.map((config) => (
              <ConfigurationCard
                key={config.id}
                config={config}
                updateConfiguration={updateConfiguration}
                removeConfiguration={removeConfiguration}
                canRemove={configurations.length > 1}
              />
            ))}

            {configurations.length < 5 && (
              <div className="flex-shrink-0 w-80 h-96 flex items-center justify-center border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                <Button variant="outline" onClick={addConfiguration} className="flex items-center border-primary/20">
                  <PlusIcon className="h-4 w-4 mr-2 text-primary" />
                  Add Configuration
                </Button>
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between bg-primary/5 rounded-b-lg">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1 border-primary/20">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Button onClick={onCalculate} disabled={isCalculating} className="flex items-center gap-1">
          {isCalculating ? (
            <>
              <Loader2Icon className="h-4 w-4 mr-1 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <CalculatorIcon className="h-4 w-4 mr-1" />
              Calculate TCO
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

