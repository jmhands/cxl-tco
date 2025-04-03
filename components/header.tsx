import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalculatorIcon, FileTextIcon, HomeIcon, InfoIcon } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <CalculatorIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">CXL TCO Calculator</h1>
        </div>
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
            <Link href="/">
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
            <Link href="/docs">
              <FileTextIcon className="h-4 w-4 mr-1" />
              Docs
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
            <Link href="/assumptions">
              <InfoIcon className="h-4 w-4 mr-1" />
              Assumptions
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

