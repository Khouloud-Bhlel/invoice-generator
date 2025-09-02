# @khouloud-bhlel/invoice-generator

A modern React component library for generating professional invoices with PDF export functionality.

## Installation

```bash
npm install @khouloud-bhlel/invoice-generator
```

## Usage

### Basic Usage

```tsx
import React from 'react';
import { InvoiceGenerator } from '@khouloud-bhlel/invoice-generator';
import '@khouloud-bhlel/invoice-generator/styles';

function App() {
  return (
    <div className="App">
      <InvoiceGenerator />
    </div>
  );
}

export default App;
```

### Advanced Usage with Custom Props

```tsx
import React from 'react';
import { InvoiceGenerator, InvoiceFormData } from '@khouloud-bhlel/invoice-generator';
import '@khouloud-bhlel/invoice-generator/styles';

function App() {
  const handlePDFGenerated = (data: InvoiceFormData) => {
    console.log('Invoice generated:', data);
  };

  const handleError = (error: Error) => {
    console.error('Error generating invoice:', error);
  };

  return (
    <div className="App">
      <InvoiceGenerator
        title="My Custom Invoice Generator"
        description="Create invoices for my business"
        defaultValues={{
          fromName: "My Company",
          fromEmail: "hello@mycompany.com",
          fromAddress: "123 Business St\nCity, State 12345"
        }}
        onPDFGenerated={handlePDFGenerated}
        onError={handleError}
        className="my-custom-class"
      />
    </div>
  );
}

export default App;
```

### Using Individual Components

```tsx
import React from 'react';
import { generatePDF, InvoiceFormData } from '@khouloud-bhlel/invoice-generator';

const MyComponent = () => {
  const handleGeneratePDF = async () => {
    const invoiceData: InvoiceFormData = {
      clientName: "John Doe",
      clientEmail: "john@example.com",
      clientAddress: "456 Client Ave\nClient City, CC 67890",
      fromName: "My Business",
      fromEmail: "me@mybusiness.com", 
      fromAddress: "123 Business St\nBusiness City, BC 12345",
      invoiceNumber: "INV-001",
      date: new Date(),
      items: [
        {
          description: "Web Development Services",
          quantity: 10,
          price: 100
        }
      ]
    };

    try {
      await generatePDF(invoiceData);
      console.log('PDF generated successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleGeneratePDF}>
      Generate Invoice PDF
    </button>
  );
};
```

## Props

### InvoiceGenerator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Optional CSS class name to apply to the container |
| `title` | `string` | `"Invoice Generator"` | Custom title for the invoice generator |
| `description` | `string` | `"Create professional invoices..."` | Custom description for the invoice generator |
| `defaultValues` | `Partial<InvoiceFormData>` | `undefined` | Default values for the invoice form |
| `onPDFGenerated` | `(data: InvoiceFormData) => void` | `undefined` | Callback function called when PDF generation is successful |
| `onError` | `(error: Error) => void` | `undefined` | Callback function called when an error occurs |

## Types

### InvoiceFormData

```typescript
interface InvoiceFormData {
  clientName: string;
  clientAddress?: string;
  clientEmail?: string;
  fromName: string;
  fromAddress?: string;
  fromEmail?: string;
  invoiceNumber: string;
  date: Date;
  items: InvoiceItem[];
}
```

### InvoiceItem

```typescript
interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}
```

## Features

- 📝 **Dynamic Invoice Creation** - Add client and company details with multiple invoice items
- 👀 **Real-Time Preview** - See exactly how your invoice will look before generating the PDF
- 📄 **Professional PDF Generation** - Download beautifully formatted invoices as PDFs
- 🎨 **Customizable** - Fully customizable with Tailwind CSS classes
- ⚛️ **React Ready** - Built with modern React hooks and TypeScript
- 📱 **Responsive** - Works perfectly on desktop and mobile devices
- 🎯 **Type Safe** - Full TypeScript support with proper type definitions

## Dependencies

This package requires the following peer dependencies:

- React 16.8.0 or higher
- React DOM 16.8.0 or higher

## CSS Styling

The component uses Tailwind CSS for styling. You need to either:

1. Import the included styles (recommended):
   ```tsx
   import '@khouloud-bhlel/invoice-generator/styles';
   ```

2. Or ensure Tailwind CSS is configured in your project and the component classes are included in your purge/content configuration.

## License

MIT © Khouloud Bhlel

## Contributing

Issues and pull requests are welcome! Please check out the [GitHub repository](https://github.com/Khouloud-Bhlel/invoice-generator) for more information.
