import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AssumptionsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>TCO Calculation Assumptions</CardTitle>
            <CardDescription>These assumptions are used in the TCO calculations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-bold mb-4">Cost Assumptions</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Assumption</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Power</TableCell>
                    <TableCell>Cost per kWh</TableCell>
                    <TableCell>$0.12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rack Space</TableCell>
                    <TableCell>Cost per rack unit per month</TableCell>
                    <TableCell>$30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Maintenance</TableCell>
                    <TableCell>Annual cost as percentage of CapEx</TableCell>
                    <TableCell>15%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Administration</TableCell>
                    <TableCell>Annual cost per server</TableCell>
                    <TableCell>$500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CPU - Entry Tier</TableCell>
                    <TableCell>Cost per socket</TableCell>
                    <TableCell>$500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CPU - Mid Tier</TableCell>
                    <TableCell>Cost per socket</TableCell>
                    <TableCell>$1,200</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CPU - High Tier</TableCell>
                    <TableCell>Cost per socket</TableCell>
                    <TableCell>$3,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DRAM - DDR4</TableCell>
                    <TableCell>Cost per GB</TableCell>
                    <TableCell>$8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DRAM - DDR5</TableCell>
                    <TableCell>Cost per GB</TableCell>
                    <TableCell>$10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CXL Memory - Standard</TableCell>
                    <TableCell>Cost per GB</TableCell>
                    <TableCell>$9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CXL Memory - High Performance</TableCell>
                    <TableCell>Cost per GB</TableCell>
                    <TableCell>$12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Storage - Entry (HDD)</TableCell>
                    <TableCell>Cost per TB</TableCell>
                    <TableCell>$100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Storage - Mid (SATA SSD)</TableCell>
                    <TableCell>Cost per TB</TableCell>
                    <TableCell>$200</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Storage - High (NVMe SSD)</TableCell>
                    <TableCell>Cost per TB</TableCell>
                    <TableCell>$400</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Networking</TableCell>
                    <TableCell>Cost per GbE</TableCell>
                    <TableCell>$10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Power Assumptions</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Assumption</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>PUE (Power Usage Effectiveness)</TableCell>
                    <TableCell>Cooling and power delivery overhead</TableCell>
                    <TableCell>1.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CPU - Entry Tier</TableCell>
                    <TableCell>Power consumption per socket</TableCell>
                    <TableCell>65W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CPU - Mid Tier</TableCell>
                    <TableCell>Power consumption per socket</TableCell>
                    <TableCell>125W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CPU - High Tier</TableCell>
                    <TableCell>Power consumption per socket</TableCell>
                    <TableCell>250W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DRAM</TableCell>
                    <TableCell>Power consumption per 16GB</TableCell>
                    <TableCell>3W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CXL Memory - Standard</TableCell>
                    <TableCell>Power consumption per 16GB</TableCell>
                    <TableCell>2.5W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CXL Memory - High Performance</TableCell>
                    <TableCell>Power consumption per 16GB</TableCell>
                    <TableCell>3W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Storage - Entry (HDD)</TableCell>
                    <TableCell>Power consumption per TB</TableCell>
                    <TableCell>10W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Storage - Mid (SATA SSD)</TableCell>
                    <TableCell>Power consumption per TB</TableCell>
                    <TableCell>15W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Storage - High (NVMe SSD)</TableCell>
                    <TableCell>Power consumption per TB</TableCell>
                    <TableCell>25W</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Base Server</TableCell>
                    <TableCell>Power consumption for fans, etc.</TableCell>
                    <TableCell>50W</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Performance Assumptions</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workload</TableHead>
                    <TableHead>Metric</TableHead>
                    <TableHead>Calculation Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>In-Memory Database (IMDB)</TableCell>
                    <TableCell>QPS Improvement</TableCell>
                    <TableCell>70% of memory expansion ratio translates to performance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Relational Database (RDBMS)</TableCell>
                    <TableCell>QPS Improvement</TableCell>
                    <TableCell>50% of memory expansion ratio translates to performance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>AI/ML Training</TableCell>
                    <TableCell>Training Time Reduction</TableCell>
                    <TableCell>60% of memory expansion ratio translates to performance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Virtualization</TableCell>
                    <TableCell>VM Density Increase</TableCell>
                    <TableCell>80% of memory expansion ratio translates to performance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Other</TableCell>
                    <TableCell>General Performance Uplift</TableCell>
                    <TableCell>40% of memory expansion ratio translates to performance</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Memory expansion ratio is calculated as (DRAM + CXL Memory) / DRAM. For
                  example, a server with 512GB DRAM and 1024GB CXL Memory has an expansion ratio of 3x.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Memory Latency Assumptions</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Memory Type</TableHead>
                    <TableHead>Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>DDR4</TableCell>
                    <TableCell>120ns</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DDR5</TableCell>
                    <TableCell>100ns</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CXL Memory - Standard</TableCell>
                    <TableCell>150ns</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CXL Memory - High Performance</TableCell>
                    <TableCell>130ns</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

