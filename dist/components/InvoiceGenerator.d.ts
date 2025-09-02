import { InvoiceFormData } from "../lib/types";
export interface InvoiceGeneratorProps {
    /**
     * Optional CSS class name to apply to the container
     */
    className?: string;
    /**
     * Custom title for the invoice generator
     * @default "Invoice Generator"
     */
    title?: string;
    /**
     * Custom description for the invoice generator
     * @default "Create professional invoices for your clients with our easy-to-use generator"
     */
    description?: string;
    /**
     * Default values for the invoice form
     */
    defaultValues?: Partial<InvoiceFormData>;
    /**
     * Callback function called when PDF generation is successful
     */
    onPDFGenerated?: (data: InvoiceFormData) => void;
    /**
     * Callback function called when an error occurs
     */
    onError?: (error: Error) => void;
}
export declare function InvoiceGenerator({ className, title, description, defaultValues, onPDFGenerated, onError, }: InvoiceGeneratorProps): import("react/jsx-runtime").JSX.Element;
