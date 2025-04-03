import { Calculator } from "@/components/calculator"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <Calculator />
      </div>
    </main>
  )
}

