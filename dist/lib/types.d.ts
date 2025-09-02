import { z } from "zod";
export declare const InvoiceItemSchema: z.ZodObject<{
    description: z.ZodString;
    quantity: z.ZodNumber;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    description: string;
    quantity: number;
    price: number;
}, {
    description: string;
    quantity: number;
    price: number;
}>;
export declare const InvoiceFormSchema: z.ZodObject<{
    clientName: z.ZodString;
    clientAddress: z.ZodOptional<z.ZodString>;
    clientEmail: z.ZodOptional<z.ZodString>;
    fromName: z.ZodString;
    fromAddress: z.ZodOptional<z.ZodString>;
    fromEmail: z.ZodOptional<z.ZodString>;
    invoiceNumber: z.ZodString;
    date: z.ZodDate;
    items: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        description: string;
        quantity: number;
        price: number;
    }, {
        description: string;
        quantity: number;
        price: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    date: Date;
    clientName: string;
    fromName: string;
    invoiceNumber: string;
    items: {
        description: string;
        quantity: number;
        price: number;
    }[];
    clientAddress?: string | undefined;
    clientEmail?: string | undefined;
    fromAddress?: string | undefined;
    fromEmail?: string | undefined;
}, {
    date: Date;
    clientName: string;
    fromName: string;
    invoiceNumber: string;
    items: {
        description: string;
        quantity: number;
        price: number;
    }[];
    clientAddress?: string | undefined;
    clientEmail?: string | undefined;
    fromAddress?: string | undefined;
    fromEmail?: string | undefined;
}>;
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
export type InvoiceFormData = z.infer<typeof InvoiceFormSchema>;
