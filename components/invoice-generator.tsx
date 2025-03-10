"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Plus,
  Trash2,
  FileDown,
  RefreshCw,
  Calendar,
  DollarSign,
  Hash,
  FileText,
  User,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InvoiceFormData, InvoiceFormSchema } from "@/lib/types";
import { generatePDF } from "@/lib/pdf-generator";

export default function InvoiceGenerator() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceFormSchema),
    defaultValues: {
      clientName: "",
      invoiceNumber: `INV-${format(new Date(), "yyyyMMdd")}-001`,
      date: new Date(),
      items: [{ description: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      setIsGenerating(true);
      setError(null); // Clear any previous errors
      await generatePDF(data);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const total = form.watch("items").reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0
  );

  const subtotal = total;
  const tax = total * 0.1; // 10% tax rate example
  const grandTotal = subtotal + tax;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Invoice Generator</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Create professional invoices for your clients with our easy-to-use generator
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form Section */}
        <Card className="lg:col-span-3 shadow-lg">
          <CardHeader className="bg-primary/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Details
            </CardTitle>
            <CardDescription>
              Fill in the details to generate your invoice
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Client Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter client name"
                              className="border-primary/20 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Invoice Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              value={format(field.value, "yyyy-MM-dd")}
                              onChange={(e) => field.onChange(new Date(e.target.value))}
                              className="border-primary/20 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        Invoice Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-primary/20 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Invoice Items
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ description: "", quantity: 1, price: 0 })}
                            className="border-primary/30 hover:bg-primary/10 hover:text-primary"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add a new line item to your invoice</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {fields.map((field, index) => (
                    <Card key={field.id} className="overflow-hidden border-primary/10">
                      <CardHeader className="bg-slate-50 dark:bg-slate-900 p-4 pb-2">
                        <CardTitle className="text-base flex justify-between items-center">
                          <span>Item #{index + 1}</span>
                          {fields.length > 1 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove this item</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="grid gap-4">
                          <FormField
                            control={form.control}
                            name={`items.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Item description"
                                    className="border-primary/20 focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid gap-4 sm:grid-cols-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Quantity</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="1"
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                      className="border-primary/20 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`items.${index}.price`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    Price
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                      className="border-primary/20 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    className="border-primary/30 hover:bg-primary/10 hover:text-primary"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating PDF..." : "Generate PDF"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              Invoice Preview
              <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                {format(form.watch("date"), "MMMM yyyy")}
              </Badge>
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Live preview of your invoice
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                <p className="text-xl font-semibold">
                  {form.watch("clientName") || "Client Name"}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Hash className="h-3 w-3" /> Invoice Number
                  </h3>
                  <p className="font-mono">{form.watch("invoiceNumber")}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Date
                  </h3>
                  <p>{format(form.watch("date"), "MMMM dd, yyyy")}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <ClipboardList className="h-3 w-3" /> Items
                </h3>
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-900">
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {form.watch("items").map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.description || "Item description"}
                        </TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ${(item.quantity * item.price).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {form.watch("items").length < 3 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground italic">
                          {form.watch("items").length === 0
                            ? "No items added yet"
                            : "Add more items to your invoice"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <div className="w-48 space-y-2">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Tax (10%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 dark:bg-slate-900 flex justify-between items-center text-sm text-muted-foreground">
            <p>Thank you for your business</p>
            <p>{format(new Date(), "yyyy")}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
