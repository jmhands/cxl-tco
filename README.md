# CXL TCO Calculator

A web-based tool for IT, finance, and product teams to quantify the Total Cost of Ownership (TCO) and performance benefits of CXL-enabled systems. This calculator helps users compare configurations ranging from traditional servers to CXL-enabled architectures using realistic component models and simplified inputs.

## Features

- Compare up to 5 configurations (1 baseline + 4 alternatives)
- Component-level input (CPU, DRAM, Storage, CXL)
- TCO output over 1/3/5-year cycles
- Workload-specific performance insights
- Exportable results (CSV/PDF)
- Modern, responsive UI with guided input flow

## Target Users

- IT Infrastructure Architects & Engineers
- Data Center Strategists (CIOS, CTOS, IT Managers)
- Procurement and Finance Teams
- Sales Engineers / Solution Architects
- Product Managers (OEMS, DRAM, CXL SOC vendors)
- Business Owners

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/cxl-tco.git
cd cxl-tco
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file in the root directory (optional):
```bash
# Add any environment variables here
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
pnpm build
```

### Running Production Build

```bash
pnpm start
```

## Project Structure

```
cxl-tco/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions and shared logic
├── hooks/           # Custom React hooks
├── styles/          # Global styles
├── public/          # Static assets
└── types/           # TypeScript type definitions
```

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [pnpm](https://pnpm.io/) - Package manager

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on the CXL TCO Calculator Product Requirements Document
- Built with modern web technologies for optimal performance and user experience