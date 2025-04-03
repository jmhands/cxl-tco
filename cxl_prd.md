#   Product Requirements Document CXL TCO Calculator

##   Introduction

Compute Express Link (CXL) is a high-speed, low-latency interconnect standard that enables memory expansion, pooling, and heterogeneous acceleration. [cite: 1, 2] It addresses performance and cost bottlenecks in compute infrastructure by allowing servers to scale beyond traditional DRAM limits. [cite: 2, 3] However, understanding its value requires modeling cost, performance, and infrastructure impact, especially across diverse workloads. [cite: 3]

The CXL TCO Calculator is a web-based tool for IT, finance, and product teams to quantify the Total Cost of Ownership (TCO) and performance benefits of CXL-enabled systems. [cite: 4] Users can compare configurations-ranging from traditional servers to CXL-enabled architectures-using realistic component models and simplified inputs. [cite: 5, 6]

##   Value Proposition

* **Informed Decisions:** Show cost and performance trade-offs between DRAM-only and CXL-enhanced infrastructure. [cite: 6]
* **Ease of Use:** Reduce complexity by offering pre-built templates, intelligent defaults, and guided flows. [cite: 7]
* **Quantified Benefits:** Don't rely on guesswork to evaluate memory disaggregation ROI. [cite: 8, 9] Our TCO calculator helps quantify DRAM savings, power reduction, and workload efficiencies across time - enabling confident business case modeling for CXL-based systems, including, but not limited to:
    * Memory consolidation = fewer servers
    * Lower CapEx and OpEx
    * Higher work-per-dollar metrics (e.g., QPS, TFLOPS/\$)
    * ESG and power/cooling impact
* **Accelerate Adoption:** Help vendors and end-users justify CXL deployment. [cite: 9]

##   Target Personas

* IT Infrastructure Architects & Engineers [cite: 10]
* Data Center Strategists (CIOS, CTOS, IT Managers) [cite: 10]
* Procurement and Finance Teams [cite: 10]
* Sales Engineers / Solution Architects [cite: 10]
* Product Managers (OEMS, DRAM, CXL SOC vendors) [cite: 10]
* Business Owners [cite: 10]

##   Goals and Objectives (MVP)

* **Goal 1: Functional TCO Comparison**
    * Up to 5 configurations (1 baseline + 4 alternatives) [cite: 12]
    * Component-level input (CPU, DRAM, Storage, CXL) [cite: 12]
    * TCO output over 1/3/5-year cycles [cite: 12]
* **Goal 2: Performance Insight**
    * Select workload profile [cite: 12]
    * Estimate "work done" uplift (e.g., QPS, server consolidation, training time) [cite: 12]
* **Goal 3: Simple User Experience**
    * Wizard-style or guided input flow [cite: 13]
    * Minimal required inputs; smart defaults [cite: 13]
    * Clear visual output (tabular comparison, summary) [cite: 13]

##   Deliverables (MVP)

* Web-hosted TCO Calculator App [cite: 13]
* A minimal list of component vendors (CPU, Memory, CXL, Storage, networking, etc.) [cite: 13]
* Calculation engine for TCO/performance modeling [cite: 13]
* Document how the calculations are performed using ToolTips and Documentation [cite: 15]
* Example/Sample workload templates (Quick Start) [cite: 15]
* Exportable summary output (CSV/PDF) [cite: 15]
* Documentation (User Guide) [cite: 15]
* Internal metrics (anonymized) are used to capture information on tool usage to improve the tool. [cite: 15]

##   Key Features & Functionality

###   Included in MVP

* Up to 5 Configs: Nameable, editable, side-by-side comparison [cite: 16]
* Baseline Flag: Define one config as the comparison base (no CXL in the config) [cite: 16]
* Simplified Inputs: [cite: 16, 17]
    * CPU Make, Model, Core Count, Frequency, # of PCIe Lanes, etc. [cite: 16]
    * DRAM Generation/Type/Speed/Capacity [cite: 16]
    * Storage Capacity and Bandwidth [cite: 16]
    * CXL (focus on Type 3) [cite: 16]
        * Memory Expansion for a single server. [cite: 17]
        * Direct attached (CXL 1.1) [cite: 17]
* \[Stretch Goal] Memory Pooling across servers in a rack (CXL 2.x/3.x with a single layer of switches) [cite: 18]
* Networking Tier (10/25/100/200/400GbE) [cite: 18]
* Software License Costs [cite: 18]
* Workload Selector: [cite: 18]
    * In-Memory DB (IMDB) [cite: 18]
    * Relational DB (RDBMS) [cite: 18]
    * AI/ML Training [cite: 18]
    * Virtualization [cite: 18]
    * Other [cite: 18]
* Amortization Periods: 1, 3, 5, 7 years [cite: 18]
* Output: [cite: 18, 19]
    * CapEx, OpEx, Total TCO [cite: 18, 19]
    * Performance Uplift (based on workload model and unit of work - QPS, RPS, Tokens/sec, etc) [cite: 19]
    * Server consolidation estimate at ISO SLA [cite: 19]
    * VM count increases at ISO SLA [cite: 19]
    * Power & cooling estimates [cite: 19]
    * Exportable Summary [cite: 19]
    * Assumptions Disclosure: Inline tooltip and dedicated view [cite: 19]

##   MVP Requirements

These are the requirements for the Minimal Viable Product (MVP)

###   UI/UX

* Responsive web design [cite: 20]
* Wizard-style input process [cite: 20]
* Tooltips on technical inputs to help the user [cite: 20]
* Comparison view with: [cite: 20]
    * Config specs [cite: 20]
    * TCO breakdown [cite: 20]
    * % savings [cite: 20]
    * Performance metrics [cite: 20]

###   Configuration Inputs

* Name / Label: Text [cite: 20]
* Server Count: Unsigned Integer [cite: 20]
* CPU: Sockets, Tier (Entry, Mid, High-End) [cite: 20]
* DRAM: Total GB/TB, Type (DDR4/DDR5), Speed [cite: 20]
* CXL Memory: [cite: 20, 21, 22]
    * Yes/No toggle [cite: 20, 21, 22]
    * Capacity [cite: 22]
    * Type (Standard, High-Perf, Gen version mapped internally) [cite: 22]
* Storage: Tier, Capacity [cite: 22]
* Network: NIC Speed [cite: 22]
* Software License Costs: [cite: 22]

###   Global Inputs

* Workload [cite: 22]
* TCO period [cite: 22]
* Currency (default \$) [cite: 22]
* \[Optional] Power Cost, Rack Cost [cite: 22]

###   Calculation Engine

* CapEx: [cite: 22]
    * Server HW + CXL HW + Storage/NIC [cite: 22]
    * Basic software costs (OS, hypervisor flat rates) [cite: 22]
* OpEx: [cite: 22, 23]
    * Power (Watts \* PUE \* \$/kWh) [cite: 22, 23]
    * Cooling (% of power or PUE factor) [cite: 23]
    * Rack Cost (RU x \$/month) [cite: 23]
    * Admin & Maintenance (% of CapEx) [cite: 24]
* TCO: CapEx + (OpEx x years) [cite: 24]
* Performance Modeling (Workload Dependent): [cite: 24]
    * IMDB: Memory footprint fit → QPS uplift [cite: 24]
    * RDBMS: Query latency/model fit → uplift [cite: 24]
    * AI/ML: Model fit to memory → training time savings [cite: 24]
    * Virtualization: VMs/server → server consolidation [cite: 24]

###   Outputs

* Tabular/Card config comparison [cite: 24]
* Summary: [cite: 24]
    * TCO per config [cite: 24]
    * Savings vs. baseline [cite: 24]
    * Performance improvement [cite: 24]
    * Server count change [cite: 24]
* Export to CSV/PDF [cite: 24]
* Link to view model assumptions & calculations [cite: 24]

##   Use Cases (MVP)

* **Use Case 1:** IMDB Consolidation [cite: 26]

    * 10TB DB across 5 servers → CXL-enabled 2-server setup [cite: 26]
    * Output: Server reduction, CapEx/OpEx savings, QPS uplift [cite: 26]
* **Use Case 2:** AI Model Fit [cite: 26, 27]

    * DRAM limit forces paging; CXL memory enables full model in RAM [cite: 26, 27]
    * Output: Reduced training time and power usage [cite: 27]
* **Use Case 3:** Virtualization Efficiency [cite: 27]

    * Older 10-node rack → 4-node CXL setup [cite: 27]
    * Output: Consolidation savings over 5 years [cite: 27]

##   User Flow

1.  **Entry:** The user accesses the calculator's web page. [cite: 28]
2.  **Initial Setup:** [cite: 28, 29]
    * The user is prompted to select the primary Workload [cite: 28, 29]
    * The user is prompted to select the TCO Amortization Period [cite: 28, 29]
3.  **Baseline Configuration:** [cite: 29, 30]
    * The user enters details for "Configuration 1" (implicitly the Baseline). [cite: 29, 30]
    * Inputs: Name Number of Servers CPU, DRAM Storage Networking [cite: 30]
    * The CXL section is disabled or set to "No" for the Baseline. [cite: 30, 31]
4.  **Add Comparison Configuration(s):** [cite: 31, 32]
    * The user clicks "Add Configuration". [cite: 31, 32]
    * The user enters details for "Configuration 2" (and optionally 3, 4, and 5). [cite: 31, 32]
    * The inputs are the same, but now the CXL Memory Expansion options can be enabled and configured. [cite: 32]
5.  **Calculate & View Results:** [cite: 33, 34]
    * The user clicks "Calculate TCO" / "Compare". [cite: 33, 34]
    * The results page loads, displaying the side-by-side comparison table, TCO summaries, savings, and performance uplift metrics. [cite: 34, 35]
6.  **Refine (Optional):** The user can navigate back to edit configuration inputs and recalculate. [cite: 35, 36, 37]
7.  **Export/Download/Share Report:** The user clicks "Export Summary" to get the results table's basic CSV/text output. [cite: 36, 37]
8.  **View Assumptions:** The user can click a link/button to view the underlying assumptions used in the calculations. [cite: 37, 38]

##   Future Enhancements (Roadmap)

###   General Ideas

* More Granular Inputs: Specific CPU SKUs, detailed power/cooling cost inputs, labor rates, rack PDU/Infra costs. [cite: 39, 40, 41]
* Advanced Component Selection: Specific vendor/model selection for CPU, DRAM, Storage, CXL devices (with associated specs). [cite: 40, 41] Integration with vendor data feeds if possible or scrape the websites. [cite: 40, 41]
* Detailed Software Licensing: Models for OS, Hypervisor, Database (per core, per socket, subscription), and other major software. [cite: 42, 43, 44, 45]
* Expanded Workloads: VDI, Genomics, Financial Modeling, HPC (specific simulation types), Content Delivery Networks. [cite: 43, 44, 45]
* CXL Features: Support for CXL Type 1 & 2 devices (Accelerators), Memory Pooling/Sharing scenarios (more complex modeling). [cite: 44, 45]
* GPU Integration: Model GPU configurations and how CXL memory interacts (e.g., unified memory benefits). [cite: 45, 46, 47]
* Enhanced Performance Models: More sophisticated performance estimation, potentially integrating benchmark data or allowing user input for baseline performance. [cite: 46, 47]
* Sensitivity Analysis: Allow users to tweak key assumptions (power cost, hardware cost %, discount rate) to see the impact on TCO. [cite: 47, 48, 49, 50]
* Regionalization: Options for different currencies and regional cost variations (power, labor). [cite: 48, 49, 50]
* Advanced Visualization: More interactive charts and graphs for TCO breakdown and trends over time. [cite: 49, 50]
* API Access: Provide an API for programmatic use or integration into other tools. [cite: 50, 51, 52]
* User Accounts: Save/load configurations and manage custom cost profiles. [cite: 51, 52]
* Library: Create a library of models. [cite: 52] Allow users to save/submit their model to the library for others to use. [cite: 52, 53, 54, 55, 56, 57]
* Telemetry/Metrics: Improve the telemetry and metrics collected for internal use for tool improvements. [cite: 53, 54, 55, 56, 57]
* User Feedback and Survey Tools [cite: 54, 55, 56, 57]
* A/B Testing [cite: 54, 55, 56, 57]
* SEO Analytics [cite: 54, 55, 56, 57]
* Heatmap and Session Recording [cite: 54, 55, 56, 57]
* Smart Modeling & Guidance [cite: 54, 55, 56, 57]
* "Best Config for Budget": Allow the user to enter their total budget and the calculator suggests the top 2-3 configurations. [cite: 55, 56, 57]
* AI-based config optimization [cite: 55, 56, 57]
* Sensitivity analysis sliders [cite: 55, 56, 57]

###   Advanced Inputs

* Real CPU models [cite: 55, 56, 57]
* Full SKU-based BOM mapping [cite: 55, 56, 57]
* Live/Near-Live vendor pricing feeds [cite: 55, 56, 57]

###   Environmental Metrics

* $GHG/CO_2$ impact from power usage [cite: 57]
* Environmental, Social, and Corporate Governance (ESG) dashboards [cite: 57]
* Green equivalency stats (trees, oil barrels, etc.) [cite: 57]

###   Component & Fabric Expansion

* Support for CXL Type 1 (accelerators) [cite: 57]
* Pooling/shared memory (CXL switch modeling) [cite: 57]
* GPU memory sharing via CXL [cite: 57]

###   Visual Enhancements

* Graphs for TCO trend, breakouts [cite: 57]
* Interactive workload impact charts [cite: 57]

###   Platform Expansion

* Save/load configs via login [cite: 57]
* Share/Save/Load configs in a public library [cite: 57]
* Regionalized cost models (EU, APAC, US) [cite: 57]
* API for partner integration (OEM portals) [cite: 57]

##   UI/UX Design Proposal

###   Application Overview

The calculator is structured as a single-page web application (SPA) with a progressive flow, segmented into four main steps: [cite: 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]

1.  Landing & Setup [cite: 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]
2.  Configuration Input (1-5 servers) [cite: 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]
3.  Workload Selection & Calculation [cite: 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]
4.  Comparison Output & Export [cite: 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]

Each step is a collapsible card or tab, with a navigation progress bar across the top. [cite: 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]

###   Page Structure & Navigation

####   Top Navigation Bar

| Item                     | Function                |
| :----------------------- | :---------------------- |
| Logo + "CXL TCO Calculator" | Branding                |
| \[Home] \[Docs] \[Assumptions] | Links (right-aligned)   |
| "Export" Button          | PDF/CSV export of results |

###   Step 1: Landing & Setup

* Purpose: Establish workload context and amortization period. [cite: 62, 63, 64]

| Field                      | Type     | Values                        |
| :------------------------- | :------- | :---------------------------- |
| Select Workload            | Dropdown | IMDB, RDBMS, AI/ML, Virtualization |
| TCO Amortization Period    | Dropdown | 1 year, 3 years, 5 years        |
| Currency Symbol (Optional) | Dropdown | \$, €, ¥, £                     |
| Button: "Next: Configure Systems" | Primary Button | Proceeds to Config Input        |

###   Step 2: Server Configuration Inputs

* Purpose: Define up to 5 configurations. [cite: 65, 66, 67, 68, 69, 70, 71, 72]
* Design: A horizontally scrollable list of config cards. [cite: 65, 66, 67, 68, 69, 70, 71, 72] One card is always the Baseline (flagged). [cite: 65, 66, 67, 68, 69, 70, 71, 72]
* Each Configuration Card Includes [cite: 67, 68, 69, 70, 71, 72]
    * Header [cite: 67, 68, 69, 70, 71, 72]
        * Name (editable text) [cite: 67, 68, 69, 70, 71, 72]
        * "Set as Baseline" radio toggle [cite: 67, 68, 69, 70, 71, 72]
        * "Delete" (if more than 1 config) [cite: 67, 68, 69, 70, 71, 72]
    * Input Sections (accordion or tabs per config): [cite: 67, 68, 69, 70, 71, 72]

| Section     | Fields                                                        |
| :---------- | :------------------------------------------------------------ |
| CPU         | Sockets, Tier (Dropdown), Cores (optional override)           |
| DRAM        | Total Capacity, Type, Speed                                   |
| CXL Memory  | Toggle On/Off Capacity, Device Tier (mapped to Gen/type)       |
| Storage     | Tier (Dropdown), Capacity                                     |
| Networking  | NIC Speed                                                     |
| Quantity    | Number of Servers                                             |
| Notes (optional) | Free text for user comments                               |
|             | Add a Config Button: Add a "+ Add Configuration" button that creates a new config (up to 5 max) |

###   Step 3: Calculation and Workload Tuning

* Purpose: Trigger TCO/Performance modeling. [cite: 70, 71, 72]

| Components     | Field / Action                               | Type           |
| :------------- | :------------------------------------------- | :------------- |
| \[Calculate] Button | Primary Action                             |                |
| Inline Spinner   | While loading                                |                |
| Link: "Edit Assumptions" | Opens modal with editable cost model (read-only in MVP) |                |

###   Step 4: Results Page - Comparison View

* Purpose: Compare cost and performance metrics across configurations. [cite: 73, 74, 75, 76, 77, 78]
* Layout: Tabular with fixed Baseline column on the left. [cite: 73, 74, 75, 76, 77, 78] Configs 2-5 scroll horizontally if needed. [cite: 73, 74, 75, 76, 77, 78]

####   Section 1: Summary Table

| Metric                     | Baseline | Config 2            |
| :------------------------- | :------- | :------------------ |
| Servers                    | 5        | 2                     |
| DRAM Total                 | 10TB     | 10TB                  |
| CXL Memory Added           | 0        | 4TB                   |
| CapEx                      | \$300K   | \$180K                |
| OpEx/year                  | \$90K    | \$60K                 |
| TCO (3 yrs)                | \$570K   | \$360K                |
| TCO Savings vs. Baseline   |          | \$210K↓               |
| Performance Uplift         |          | +30% QPS              |
| Server Consolidation Ratio |          | 5-2                   |

####   Additional Features

* Tooltip on each row header for definition [cite: 76]
* Visual: Up/down arrows, percentage bars, etc. [cite: 76]

####   Section 2: Export & Feedback

* "Download PDF/CSV" [cite: 77, 78]
* "Start Over" or "Edit Configurations" buttons [cite: 77, 78]
* Modal: Assumptions [cite: 77, 78]
    * Triggered from Step 3 or 4. [cite: 77, 78]

| Assumption               | Value   |
| :----------------------- | :------ |
| Power cost per kWh       | \$0.12  |
| Rack cost per U/month    | \$30     |
| PUE                      | 1.5     |
| Maintenance Cost         | 15% CapEx |
| Admin Overhead           | \$500/server/year |
| Memory latency assumptions | 100ns (DDR5), 150ns (CXL) |

##   Maths for the TCO Calculator

Let's break down the mathematics required for the CXL TCO Calculator MVP. [cite: 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]

The fundamental TCO formula is:

**Total TCO = Total CapEx + (Total Annual OpEx \* Amortization Period in Years)** [cite: 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]

We need to calculate each component for every configuration being compared. [cite: 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]

###   I. Variable Definitions (Inputs & Assumptions)

We'll need the following values for each configuration (either from user input or internal assumptions based on tier selections): [cite: 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]

* `N_servers`: Number of servers in this configuration. [cite: 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]
* `Amortization_Period`: User-selected period in years (e.g., 1, 3, 5). [cite: 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]

####   Per Server Values (Estimated based on user inputs like tiers, capacity):

* `Cost_HW_Server`: Estimated hardware cost per server (sum of CPU, base DRAM, storage, NIC, chassis costs based on selected tiers/specs). [cite: 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]
* `Cost_CXL_HW_Server`: Estimated cost of CXL hardware (memory expanders) per server (0 if CXL is not used). [cite: 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]
* `Cost_SW_Server_Annual`: Estimated annual software cost per server (e.g., OS/Hypervisor subscription, or an amortized license cost - MVP Simplification: Assume an annual subscription model or % of HW CapEx / Amortization Period).