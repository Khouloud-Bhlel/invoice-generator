"use client";
import { __awaiter } from "tslib";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { format } from "date-fns";
export function generatePDF(data) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pdfDoc = yield PDFDocument.create();
            const helveticaFont = yield pdfDoc.embedFont(StandardFonts.Helvetica);
            const helveticaBold = yield pdfDoc.embedFont(StandardFonts.HelveticaBold);
            // Create A4 page
            const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
            const { width, height } = page.getSize();
            // Define colors
            const black = rgb(0, 0, 0);
            const white = rgb(1, 1, 1);
            const lightGray = rgb(0.95, 0.95, 0.95);
            const mediumGray = rgb(0.8, 0.8, 0.8);
            const darkGray = rgb(0.4, 0.4, 0.4);
            // Margins
            const margin = 50;
            const contentWidth = width - (margin * 2);
            // Helper functions
            const drawText = (text, x, y, options = {}) => {
                const { size = 10, font = "normal", color = black, align = "left", maxWidth = 0 } = options;
                const fontToUse = font === "bold" ? helveticaBold : helveticaFont;
                let xPos = x;
                const textWidth = fontToUse.widthOfTextAtSize(text, size);
                if (align === "center") {
                    xPos = x - textWidth / 2;
                }
                else if (align === "right") {
                    xPos = x - textWidth;
                }
                if (maxWidth > 0 && textWidth > maxWidth) {
                    const words = text.split(" ");
                    let line = "";
                    let lineY = y;
                    for (const word of words) {
                        const testLine = line + (line ? " " : "") + word;
                        const testWidth = fontToUse.widthOfTextAtSize(testLine, size);
                        if (testWidth > maxWidth && line !== "") {
                            page.drawText(line, {
                                x: align === "right" ? xPos - fontToUse.widthOfTextAtSize(line, size) + maxWidth : xPos,
                                y: height - lineY,
                                size,
                                font: fontToUse,
                                color,
                            });
                            line = word;
                            lineY += size * 1.4;
                        }
                        else {
                            line = testLine;
                        }
                    }
                    if (line) {
                        page.drawText(line, {
                            x: align === "right" ? xPos - fontToUse.widthOfTextAtSize(line, size) + maxWidth : xPos,
                            y: height - lineY,
                            size,
                            font: fontToUse,
                            color,
                        });
                    }
                    return lineY + size * 1.4; // Return the final Y position
                }
                else {
                    page.drawText(text, {
                        x: xPos,
                        y: height - y,
                        size,
                        font: fontToUse,
                        color,
                    });
                    return y + size * 1.4;
                }
            };
            const drawRect = (x, y, w, h, color) => {
                page.drawRectangle({
                    x,
                    y: height - y - h,
                    width: w,
                    height: h,
                    color,
                });
            };
            let currentY = 60;
            // 1. HEADER SECTION - Logo and Invoice Number
            drawText("YOUR", margin, currentY, {
                size: 14,
                font: "bold",
                color: black,
            });
            drawText("LOGO", margin, currentY + 18, {
                size: 14,
                font: "bold",
                color: black,
            });
            // Format invoice number to match image (NO. 000001)
            const formattedNumber = ((_a = data.invoiceNumber.split('-').pop()) === null || _a === void 0 ? void 0 : _a.padStart(6, '0')) || '000001';
            drawText(`NO. ${formattedNumber}`, width - margin, currentY + 9, {
                size: 14,
                font: "normal",
                color: black,
                align: "right",
            });
            // 2. LARGE INVOICE TITLE
            currentY = 160;
            drawText("INVOICE", margin, currentY, {
                size: 64,
                font: "bold",
                color: black,
            });
            // 3. DATE
            currentY = 240;
            drawText(`Date: ${format(data.date, "dd MMMM, yyyy")}`, margin, currentY, {
                size: 12,
                font: "bold",
                color: black,
            });
            // 4. BILLING INFORMATION
            currentY = 290;
            const leftColWidth = 200;
            const rightColX = width - margin - leftColWidth;
            // Billed to (left side)
            drawText("Billed to:", margin, currentY, {
                size: 12,
                font: "bold",
                color: black,
            });
            let billedToY = currentY + 25;
            // Client Name (bold)
            drawText(data.clientName || "Studio Shodwe", margin, billedToY, {
                size: 11,
                font: "bold",
                color: black,
                maxWidth: leftColWidth,
            });
            billedToY += 20;
            // Client Address (if provided)
            if (data.clientAddress && data.clientAddress.trim()) {
                const addressLines = data.clientAddress.split('\n');
                for (const line of addressLines) {
                    if (line.trim()) {
                        drawText(line.trim(), margin, billedToY, {
                            size: 10,
                            font: "normal",
                            color: black,
                            maxWidth: leftColWidth,
                        });
                        billedToY += 15;
                    }
                }
            }
            // Client Email (if provided)
            if (data.clientEmail && data.clientEmail.trim()) {
                drawText(data.clientEmail, margin, billedToY, {
                    size: 10,
                    font: "normal",
                    color: black,
                    maxWidth: leftColWidth,
                });
                billedToY += 15;
            }
            // From (right side)
            drawText("From:", rightColX, currentY, {
                size: 12,
                font: "bold",
                color: black,
            });
            let fromY = currentY + 25;
            // From Name (bold)
            drawText(data.fromName || "Olivia Wilson", rightColX, fromY, {
                size: 11,
                font: "bold",
                color: black,
                maxWidth: leftColWidth,
            });
            fromY += 20;
            // From Address (if provided)
            if (data.fromAddress && data.fromAddress.trim()) {
                const addressLines = data.fromAddress.split('\n');
                for (const line of addressLines) {
                    if (line.trim()) {
                        drawText(line.trim(), rightColX, fromY, {
                            size: 10,
                            font: "normal",
                            color: black,
                            maxWidth: leftColWidth,
                        });
                        fromY += 15;
                    }
                }
            }
            // From Email (if provided)
            if (data.fromEmail && data.fromEmail.trim()) {
                drawText(data.fromEmail, rightColX, fromY, {
                    size: 10,
                    font: "normal",
                    color: black,
                    maxWidth: leftColWidth,
                });
                fromY += 15;
            }
            // 5. ITEMS TABLE
            currentY = Math.max(billedToY, fromY) + 60;
            // Table header with light gray background
            const tableHeaderHeight = 40;
            drawRect(margin, currentY, contentWidth, tableHeaderHeight, lightGray);
            // Column positions (matching the image layout)
            const itemCol = margin + 15;
            const qtyCol = margin + 320;
            const priceCol = margin + 400;
            const amountCol = margin + contentWidth - 15;
            // Table headers
            drawText("Item", itemCol, currentY + 25, {
                size: 12,
                font: "bold",
                color: black,
            });
            drawText("Quantity", qtyCol, currentY + 25, {
                size: 12,
                font: "bold",
                color: black,
                align: "center",
            });
            drawText("Price", priceCol, currentY + 25, {
                size: 12,
                font: "bold",
                color: black,
                align: "center",
            });
            drawText("Amount", amountCol, currentY + 25, {
                size: 12,
                font: "bold",
                color: black,
                align: "right",
            });
            currentY += tableHeaderHeight;
            // Table rows
            const rowHeight = 35;
            data.items.forEach((item, index) => {
                // Alternate row background for better readability
                if (index % 2 === 0) {
                    drawRect(margin, currentY, contentWidth, rowHeight, rgb(0.99, 0.99, 0.99));
                }
                drawText(item.description || "Item description", itemCol, currentY + 22, {
                    size: 11,
                    font: "normal",
                    color: black,
                    maxWidth: 280,
                });
                drawText(item.quantity.toString(), qtyCol, currentY + 22, {
                    size: 11,
                    font: "normal",
                    color: black,
                    align: "center",
                });
                drawText(`${item.price.toFixed(0)}`, priceCol, currentY + 22, {
                    size: 11,
                    font: "normal",
                    color: black,
                    align: "center",
                });
                drawText(`${(item.quantity * item.price).toFixed(0)}`, amountCol, currentY + 22, {
                    size: 11,
                    font: "normal",
                    color: black,
                    align: "right",
                });
                currentY += rowHeight;
            });
            // Table border
            page.drawLine({
                start: { x: margin, y: height - (currentY - (data.items.length * rowHeight) - tableHeaderHeight) },
                end: { x: margin + contentWidth, y: height - (currentY - (data.items.length * rowHeight) - tableHeaderHeight) },
                thickness: 1,
                color: mediumGray,
            });
            page.drawLine({
                start: { x: margin, y: height - currentY },
                end: { x: margin + contentWidth, y: height - currentY },
                thickness: 1,
                color: mediumGray,
            });
            // 6. TOTAL SECTION (matching the image layout)
            currentY += 40;
            const totalBoxWidth = 150;
            const totalBoxX = margin + contentWidth - totalBoxWidth;
            drawText("Total", totalBoxX, currentY, {
                size: 14,
                font: "bold",
                color: black,
            });
            const total = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
            drawText(`${total.toFixed(0)}`, amountCol, currentY, {
                size: 14,
                font: "bold",
                color: black,
                align: "right",
            });
            // 7. PAYMENT INFO
            currentY += 80;
            drawText("Payment method: Cash", margin, currentY, {
                size: 11,
                font: "bold",
                color: black,
            });
            drawText("Note: Thank you for choosing us!", margin, currentY + 25, {
                size: 11,
                font: "bold",
                color: black,
            });
            // 8. DECORATIVE FOOTER WAVES (matching the image style)
            const waveStartY = height - 180;
            // Create smooth wave curves
            const wavePoints1 = [];
            const wavePoints2 = [];
            for (let x = 0; x <= width; x += 5) {
                const progress = x / width;
                // First wave (lighter gray)
                const wave1Y = waveStartY + Math.sin(progress * Math.PI * 3) * 30 + 20;
                wavePoints1.push({ x, y: wave1Y });
                // Second wave (darker gray)
                const wave2Y = waveStartY + Math.sin(progress * Math.PI * 2 + 0.5) * 40 + 60;
                wavePoints2.push({ x, y: wave2Y });
            }
            // Draw the waves using multiple line segments for smooth curves
            // Light gray wave
            for (let i = 0; i < wavePoints1.length - 1; i++) {
                const start = wavePoints1[i];
                const end = wavePoints1[i + 1];
                page.drawLine({
                    start: { x: start.x, y: start.y },
                    end: { x: end.x, y: end.y },
                    thickness: 3,
                    color: rgb(0.85, 0.85, 0.85),
                });
            }
            // Fill area below light wave
            for (let x = 0; x < width; x += 10) {
                const progress = x / width;
                const waveY = waveStartY + Math.sin(progress * Math.PI * 3) * 30 + 20;
                drawRect(x, waveY, 10, height - waveY, rgb(0.85, 0.85, 0.85));
            }
            // Dark gray wave
            for (let i = 0; i < wavePoints2.length - 1; i++) {
                const start = wavePoints2[i];
                const end = wavePoints2[i + 1];
                page.drawLine({
                    start: { x: start.x, y: start.y },
                    end: { x: end.x, y: end.y },
                    thickness: 4,
                    color: darkGray,
                });
            }
            // Fill area below dark wave
            for (let x = 0; x < width; x += 10) {
                const progress = x / width;
                const waveY = waveStartY + Math.sin(progress * Math.PI * 2 + 0.5) * 40 + 60;
                drawRect(x, waveY, 10, height - waveY, darkGray);
            }
            // Generate and download PDF
            const pdfBytes = yield pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `invoice-${data.invoiceNumber}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            return true;
        }
        catch (error) {
            console.error("PDF Generation Error:", error);
            throw new Error("Failed to generate PDF. Please try again.");
        }
    });
}
//# sourceMappingURL=pdf-generator.js.map