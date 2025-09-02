export { InvoiceGenerator } from './components/InvoiceGenerator';
export { generatePDF } from './lib/pdf-generator';
export type { InvoiceFormData, InvoiceItem } from './lib/types';
export { InvoiceFormSchema, InvoiceItemSchema } from './lib/types';

// Export utility functions
export { cn } from './lib/utils';

// Re-export important UI components that users might want to style
export { Button } from './components/ui/button';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
export { Input } from './components/ui/input';
export { Textarea } from './components/ui/textarea';
export { Badge } from './components/ui/badge';
export { Separator } from './components/ui/separator';
export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
