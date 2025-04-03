import { type NextRequest, NextResponse } from "next/server"
import type { Configuration, GlobalSettings } from "@/lib/types"
import { calculateTco } from "@/lib/calculator"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { globalSettings, configurations } = body as {
      globalSettings: GlobalSettings
      configurations: Configuration[]
    }

    // Use the JavaScript calculator instead of Python
    const results = calculateTco(globalSettings, configurations)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error calculating TCO:", error)
    return NextResponse.json({ error: "Failed to calculate TCO" }, { status: 500 })
  }
}

