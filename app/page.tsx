import InvoiceGenerator from "@/components/invoice-generator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">Invoice Generator</h1>
        <InvoiceGenerator />
      </div>
    </main>
  );
}