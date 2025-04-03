import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>CXL TCO Calculator Documentation</CardTitle>
            <CardDescription>
              Learn how to use the CXL TCO Calculator to compare different server configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-bold mb-2">Introduction</h2>
              <p>
                Compute Express Link (CXL) is a high-speed, low-latency interconnect standard that enables memory
                expansion, pooling, and heterogeneous acceleration. It addresses performance and cost bottlenecks in
                compute infrastructure by allowing servers to scale beyond traditional DRAM limits.
              </p>
              <p className="mt-2">
                The CXL TCO Calculator helps IT, finance, and product teams quantify the Total Cost of Ownership (TCO)
                and performance benefits of CXL-enabled systems. Users can compare configurations—ranging from
                traditional servers to CXL-enabled architectures—using realistic component models and simplified inputs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">How to Use the Calculator</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Select Workload & Setup:</strong> Choose your primary workload type, TCO amortization period,
                  and currency.
                </li>
                <li>
                  <strong>Configure Systems:</strong> Define up to 5 server configurations, with one designated as the
                  baseline. The baseline configuration should not include CXL memory.
                </li>
                <li>
                  <strong>View Results:</strong> After calculating, review the comparison table showing CapEx, OpEx,
                  TCO, and performance metrics.
                </li>
                <li>
                  <strong>Export Results:</strong> Download the results as a CSV file for further analysis or reporting.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">Understanding the Inputs</h2>
              <h3 className="text-lg font-semibold mt-4">Workload Types</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>In-Memory Database (IMDB):</strong> Databases that primarily operate in memory, like Redis or
                  SAP HANA.
                </li>
                <li>
                  <strong>Relational Database (RDBMS):</strong> Traditional relational databases like MySQL, PostgreSQL,
                  or SQL Server.
                </li>
                <li>
                  <strong>AI/ML Training:</strong> Machine learning model training workloads.
                </li>
                <li>
                  <strong>Virtualization:</strong> Server virtualization environments running multiple VMs.
                </li>
                <li>
                  <strong>Other:</strong> Generic workloads not fitting the above categories.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Server Configuration</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>CPU:</strong> Processor sockets, tier, and core count.
                </li>
                <li>
                  <strong>DRAM:</strong> Traditional memory capacity, type, and speed.
                </li>
                <li>
                  <strong>CXL Memory:</strong> CXL-attached memory expansion capacity and tier.
                </li>
                <li>
                  <strong>Storage:</strong> Storage tier and capacity.
                </li>
                <li>
                  <strong>Networking:</strong> Network interface speed.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">Understanding the Results</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>CapEx:</strong> Capital expenditure for hardware acquisition.
                </li>
                <li>
                  <strong>OpEx:</strong> Annual operational expenditure including power, cooling, maintenance, and
                  administration.
                </li>
                <li>
                  <strong>TCO:</strong> Total Cost of Ownership over the selected amortization period.
                </li>
                <li>
                  <strong>Performance Uplift:</strong> Estimated performance improvement based on workload type.
                </li>
                <li>
                  <strong>Workload-Specific Metrics:</strong> Additional metrics relevant to the selected workload type.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">Calculation Methodology</h2>
              <p>The TCO Calculator uses the following formula:</p>
              <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-x-auto">
                Total TCO = Total CapEx + (Total Annual OpEx * Amortization Period in Years)
              </pre>

              <h3 className="text-lg font-semibold mt-4">CapEx Components</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Server hardware costs (CPU, DRAM, storage, networking)</li>
                <li>CXL memory expansion devices</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">OpEx Components</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Power consumption (CPU, memory, storage, base system)</li>
                <li>Cooling (calculated using PUE)</li>
                <li>Rack space costs</li>
                <li>Maintenance (percentage of CapEx)</li>
                <li>Administration costs</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Performance Modeling</h3>
              <p>
                Performance uplift is calculated based on the memory expansion ratio and workload type. Different
                workloads benefit differently from additional memory capacity:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>In-memory databases benefit significantly from avoiding data paging</li>
                <li>Virtualization environments can host more VMs per server</li>
                <li>AI/ML workloads can fit larger models in memory</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

