# Example Usage

Here's a simple example of how to use the @khouloud-bhlel/invoice-generator package:

## Installation

### From GitHub Packages

First, configure npm to use GitHub Packages for this scoped package:

```bash
npm config set @khouloud-bhlel:registry https://npm.pkg.github.com/
```

Then install the package:

```bash
npm install @khouloud-bhlel/invoice-generator
```

### Alternative: Using .npmrc

Create a `.npmrc` file in your project root with:

```
@khouloud-bhlel:registry=https://npm.pkg.github.com/
```

Then install:

```bash
npm install @khouloud-bhlel/invoice-generator
```

## Basic Usage

```jsx
import React from 'react';
import { InvoiceGenerator } from '@khouloud-bhlel/invoice-generator';
import '@khouloud-bhlel/invoice-generator/styles'; // Import styles

function App() {
  const handlePDFGenerated = (blob) => {
    console.log('PDF generated successfully!', blob);
    // You can now download or display the PDF
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleError = (error) => {
    console.error('Error generating PDF:', error);
  };

  const defaultInvoiceData = {
    invoiceNumber: 'INV-001',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    
    // From information
    fromName: 'Your Company Name',
    fromAddress: '123 Business Street\nCity, State 12345\nCountry',
    fromEmail: 'contact@yourcompany.com',
    
    // Client information
    clientName: 'Client Company',
    clientAddress: '456 Client Avenue\nClient City, State 67890\nClient Country',
    clientEmail: 'client@clientcompany.com',
    
    // Invoice items
    items: [
      {
        description: 'Web Development Services',
        quantity: 1,
        rate: 1500.00,
        amount: 1500.00
      },
      {
        description: 'Logo Design',
        quantity: 1,
        rate: 500.00,
        amount: 500.00
      }
    ],
    
    notes: 'Thank you for your business!'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Invoice Generator Example</h1>
      <InvoiceGenerator
        onPDFGenerated={handlePDFGenerated}
        onError={handleError}
        defaultValues={defaultInvoiceData}
      />
    </div>
  );
}

export default App;
```

## Props

### InvoiceGenerator Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onPDFGenerated` | `(blob: Blob) => void` | Yes | Callback function called when PDF is successfully generated |
| `onError` | `(error: Error) => void` | Yes | Callback function called when an error occurs during PDF generation |
| `defaultValues` | `InvoiceFormData` | No | Default values to populate the form |

### InvoiceFormData Interface

```typescript
interface InvoiceFormData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  fromName: string;
  fromAddress: string;
  fromEmail: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  notes?: string;
}
```

## Styling

The component comes with default styles. Make sure to import the CSS file:

```jsx
import '@khouloud-bhlel/invoice-generator/styles';
```

You can also override styles by targeting the component's CSS classes in your own stylesheet.

## Features

- ✅ Modern, responsive UI built with React and TypeScript
- ✅ Form validation with Zod schema validation
- ✅ Professional PDF generation with pdf-lib
- ✅ Real-time invoice preview
- ✅ Add/remove invoice line items dynamically
- ✅ Automatic total calculations
- ✅ Customizable styling
- ✅ TypeScript support out of the box

## Development

To run the development server:

```bash
npm run dev
```

To build the library:

```bash
npm run build:lib
```

## License

MIT
