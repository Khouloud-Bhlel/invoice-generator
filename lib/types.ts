import { z } from "zod";

export const InvoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
});

export const InvoiceFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientAddress: z.string().optional(),
  clientEmail: z.string().email().optional(),
  fromName: z.string().min(1, "Your name is required"),
  fromAddress: z.string().optional(),
  fromEmail: z.string().email().optional(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  date: z.date(),
  items: z.array(InvoiceItemSchema).min(1, "At least one item is required"),
});

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
export type InvoiceFormData = z.infer<typeof InvoiceFormSchema>;