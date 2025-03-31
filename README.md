# Invoice Generator

A modern web application built with Next.js, TypeScript, and Shadcn UI that allows users to create, preview, and download professional invoices as PDFs.


## Features

### Dynamic Invoice Creation
- Add client and company details
- Add multiple invoice items with descriptions, quantities, and prices
- Automatically calculate subtotal, tax, and grand total

### Real-Time Preview
- Preview the invoice as you fill out the form
- See exactly how your invoice will look before generating the PDF

### PDF Generation
- Download beautifully formatted invoices as PDFs with a single click
- Professional styling with custom fonts, colors, and layout

### User-Friendly Interface
- Clean, intuitive form layout
- Add and remove invoice items dynamically
- Responsive design works on desktop and mobile devices

## Technologies Used

### Frontend
- **Next.js** - React framework for server-rendered applications
- **TypeScript** - Type-safe JavaScript
- **Shadcn UI** - Beautiful and customizable UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful and consistent icons

### Form Management
- **React Hook Form** - Flexible and performant form management
- **Zod** - Schema validation for TypeScript

### PDF Generation
- **pdf-lib** - Library for creating and modifying PDF documents
- Custom PDF layout engine with multi-line text support


## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or Yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Khouloud-Bhlel/invoice-generator.git
cd invoice-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
/invoice-generator
├── /app                    # Next.js app directory
├── /components             # Reusable UI components
│   └── invoice-generator.tsx  # Main invoice generator component
├── /lib                    # Utility functions and types
│   ├── pdf-generator.ts    # PDF generation logic
│   └── types.ts            # TypeScript type definitions
├── /public                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Usage

1. Fill out the client information and invoice details
2. Add items to your invoice with descriptions, quantities, and prices
3. Review the live preview of your invoice
4. Click "Generate PDF" to download your invoice as a PDF file

## Customization

### Changing Colors
Edit the primary and accent colors in the `pdf-generator.ts` file:

```typescript
// Define colors
const primaryColor = rgb(0.2, 0.4, 0.6); // Deep blue
const accentColor = rgb(0.8, 0.3, 0.3);  // Red accent
```

### Modifying Tax Rate
Change the tax rate in both the `invoice-generator.tsx` and `pdf-generator.ts` files:

```typescript
// In invoice-generator.tsx
const tax = total * 0.1; // 10% tax rate

// In pdf-generator.ts
const taxRate = 0.1; // 10% tax
```

### Adding Company Information
Update the company details in the `pdf-generator.ts` file:

```typescript
drawText("Your Company Name", companyX + 30, companyY + 20, {
  size: 18,
  font: "helvetica-bold",
  color: primaryColor,
});

drawText("123 Business Street", companyX + 10, companyY + 40, {
  size: 10,
  font: "helvetica",
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [pdf-lib](https://pdf-lib.js.org/) for the PDF generation library
- [Lucide Icons](https://lucide.dev/) for the icons
- [React Hook Form](https://react-hook-form.com/) for the form handling
- [Zod](https://github.com/colinhacks/zod) for schema validation

---

Built with ❤️ bykhouloud ben hlel
