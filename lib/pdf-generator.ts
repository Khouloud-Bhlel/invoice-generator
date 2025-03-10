"use client";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { InvoiceFormData } from "./types";
import { format } from "date-fns";

export async function generatePDF(data: InvoiceFormData) {
  try {
    const pdfDoc = await PDFDocument.create();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    // Create A4 page
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();

    // Define colors
    const primaryColor = rgb(0.2, 0.4, 0.6); // Deep blue
    const accentColor = rgb(0.8, 0.3, 0.3); // Red accent
    const lightGray = rgb(0.95, 0.95, 0.95); // Light gray for backgrounds
    const darkGray = rgb(0.3, 0.3, 0.3); // Dark gray for text
    const mediumGray = rgb(0.6, 0.6, 0.6); // Medium gray for secondary text

    // Helper functions for drawing
    const drawText = (
      text: string,
      x: number,
      y: number,
      {
        size = 10,
        font = "helvetica",
        color = darkGray,
        align = "left",
        lineHeight = 1.2,
        maxWidth = 0,
      } = {}
    ) => {
      let fontToUse = helveticaFont;
      switch (font) {
        case "helvetica-bold":
          fontToUse = helveticaBold;
          break;
        case "times":
          fontToUse = timesRomanFont;
          break;
        case "times-bold":
          fontToUse = timesRomanBold;
          break;
        case "times-italic":
          fontToUse = timesRomanItalic;
          break;
      }

      // Handle multi-line text if maxWidth is specified
      if (maxWidth > 0) {
        const words = text.split(" ");
        let line = "";
        let currentY = y;

        for (const word of words) {
          const testLine = line + (line ? " " : "") + word;
          const testWidth = fontToUse.widthOfTextAtSize(testLine, size);

          if (testWidth > maxWidth && line !== "") {
            // Draw current line and move to next line
            let xPos = x;
            if (align === "center") xPos = x - fontToUse.widthOfTextAtSize(line, size) / 2;
            else if (align === "right") xPos = x - fontToUse.widthOfTextAtSize(line, size);

            page.drawText(line, {
              x: xPos,
              y: height - currentY,
              size,
              font: fontToUse,
              color,
            });

            line = word;
            currentY += size * lineHeight;
          } else {
            line = testLine;
          }
        }

        // Draw the last line
        if (line) {
          let xPos = x;
          if (align === "center") xPos = x - fontToUse.widthOfTextAtSize(line, size) / 2;
          else if (align === "right") xPos = x - fontToUse.widthOfTextAtSize(line, size);

          page.drawText(line, {
            x: xPos,
            y: height - currentY,
            size,
            font: fontToUse,
            color,
          });
        }

        return currentY - y + size; // Return total height used
      } else {
        // Single line text
        let xPos = x;
        if (align === "center") xPos = x - fontToUse.widthOfTextAtSize(text, size) / 2;
        else if (align === "right") xPos = x - fontToUse.widthOfTextAtSize(text, size);

        page.drawText(text, {
          x: xPos,
          y: height - y,
          size,
          font: fontToUse,
          color,
        });
        return size;
      }
    };

    const drawRect = (x: number, y: number, w: number, h: number, color = lightGray) => {
      page.drawRectangle({
        x,
        y: height - y - h,
        width: w,
        height: h,
        color,
      });
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, thickness = 1, color = mediumGray) => {
      page.drawLine({
        start: { x: x1, y: height - y1 },
        end: { x: x2, y: height - y2 },
        thickness,
        color,
      });
    };

    // Draw header background
    drawRect(0, 0, width, 120, primaryColor);

    // Draw a simple horizontal accent bar (replacing the rotated rectangle)
    drawRect(width - 200, 60, 200, 30, accentColor);

    // Draw invoice title
    drawText("INVOICE", width / 2, 50, {
      size: 36,
      font: "helvetica-bold",
      color: rgb(1, 1, 1),
      align: "center",
    });

    drawText(format(data.date, "MMMM dd, yyyy"), width / 2, 90, {
      size: 12,
      font: "helvetica",
      color: rgb(1, 1, 1),
      align: "center",
    });

    // Draw invoice number in circular badge
    const badgeRadius = 40;
    const badgeX = 80;
    const badgeY = 180;

    page.drawCircle({
      x: badgeX,
      y: height - badgeY,
      size: badgeRadius * 2, // Diameter = radius * 2
      color: accentColor,
    });

    page.drawCircle({
      x: badgeX,
      y: height - badgeY,
      size: (badgeRadius - 3) * 2, // Diameter = radius * 2
      color: rgb(1, 1, 1),
    });

    drawText("#", badgeX, badgeY - 15, {
      size: 12,
      font: "helvetica",
      color: rgb(1, 1, 1),
      align: "center",
    });

    drawText(data.invoiceNumber.replace("INV-", ""), badgeX, badgeY + 5, {
      size: 11,
      font: "helvetica-bold",
      color: rgb(1, 1, 1),
      align: "center",
      maxWidth: 60,
    });

    // Draw company info section
    const companyX = 160;
    const companyY = 150;

    drawText("FROM", companyX  + 5, companyY, {
      size: 10,
      font: "helvetica",
      color: mediumGray,
    });

    drawText("Your Company Name", companyX  + 30, companyY + 20, {
      size: 18,
      font: "helvetica-bold",
      color: primaryColor,
    });

    drawText("123 Business Street", companyX  + 10, companyY + 40, {
      size: 10,
      font: "helvetica",
    });

    drawText("City, State 12345", companyX  + 10, companyY + 55, {
      size: 10,
      font: "helvetica",
    });

    drawText("yourcompany@example.com", companyX  + 10, companyY + 70, {
      size: 10,
      font: "helvetica",
    });

    // Draw client info section
    const clientX = 160;
    const clientY = 240;

    drawRect(clientX - 10, clientY - 15, 300, 100, lightGray);

    drawText("BILL TO", clientX + 5, clientY, {
      size: 10,
      font: "helvetica",
      color: mediumGray,
    });

    drawText(data.clientName, clientX  + 30, clientY + 20, {
      size: 18,
      font: "helvetica-bold",
      color: primaryColor,
    });

    drawText("Client Address Line 1", clientX  + 10, clientY + 40, {
      size: 10,
      font: "helvetica",
    });

    drawText("Client Address Line 2", clientX  + 10, clientY + 55, {
      size: 10,
      font: "helvetica",
    });

    drawText("client@example.com", clientX  + 10, clientY + 70, {
      size: 10,
      font: "helvetica",
    });

    // Draw items table header
    const tableX = 50;
    let tableY = 360;
    const col1 = tableX;
    const col2 = tableX + 280;
    const col3 = tableX + 380;
    const col4 = tableX + 480;
    const tableWidth = col4 + 50 - tableX;

    // Table header background
    drawRect(tableX, tableY, tableWidth, 30, primaryColor);

    // Table header text
    drawText("DESCRIPTION", col1 + 10, tableY + 20, {
      size: 12,
      font: "helvetica-bold",
      color: rgb(1, 1, 1),
    });

    drawText("QTY", col2, tableY + 20, {
      size: 12,
      font: "helvetica-bold",
      color: rgb(1, 1, 1),
      align: "right",
    });

    drawText("PRICE", col3, tableY + 20, {
      size: 12,
      font: "helvetica-bold",
      color: rgb(1, 1, 1),
      align: "right",
    });

    drawText("AMOUNT", col4, tableY + 20, {
      size: 12,
      font: "helvetica-bold",
      color: rgb(1, 1, 1),
      align: "right",
    });

    // Table rows
    tableY += 30;
    let itemCount = 0;

    for (const item of data.items) {
      itemCount++;
      const rowColor = itemCount % 2 === 0 ? lightGray : rgb(1, 1, 1);

      // Draw row background
      drawRect(tableX, tableY, tableWidth, 30, rowColor);

      // Draw row content
      drawText(item.description, col1 + 10, tableY + 20, {
        size: 10,
        maxWidth: 260,
      });

      drawText(item.quantity.toString(), col2, tableY + 20, {
        size: 10,
        align: "right",
      });

      drawText(`$${item.price.toFixed(2)}`, col3, tableY + 20, {
        size: 10,
        align: "right",
      });

      drawText(`$${(item.quantity * item.price).toFixed(2)}`, col4, tableY + 20, {
        size: 10,
        font: "helvetica-bold",
        align: "right",
      });

      tableY += 30;
    }

    // Calculate totals
    const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxRate = 0.1; // 10% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Draw table footer for totals
    tableY += 10;

    // Subtotal
    drawText("Subtotal:", col3 - 70, tableY, {
      size: 10,
      font: "helvetica-bold",
      align: "right",
    });

    drawText(`$${subtotal.toFixed(2)}`, col4, tableY, {
      size: 10,
      align: "right",
    });

    // Tax
    tableY += 20;
    drawText(`Tax (${(taxRate * 100).toFixed(0)}%):`, col3 - 70, tableY, {
      size: 10,
      font: "helvetica-bold",
      align: "right",
    });

    drawText(`$${tax.toFixed(2)}`, col4, tableY, {
      size: 10,
      align: "right",
    });

    // Total
    tableY += 30;
    drawRect(col3 - 80, tableY - 10, col4 + 50 - (col3 - 80), 40, primaryColor);

    drawText("TOTAL:", col3 - 25, tableY + 10, {
      size: 14,
      font: "helvetica-bold",
      color: rgb(1, 1, 1),
      align: "right",
    });

    drawText(`$${total.toFixed(2)}`, col4, tableY + 10, {
      size: 14,
      font: "helvetica-bold",
      color: rgb(1, 1, 1),
      align: "right",
    });

    // Draw footer
    const footerY = height - 50;
    drawLine(tableX, footerY - 20, width - tableX, footerY - 20, 1, mediumGray);

    drawText("Thank you for your business", width / 2, height - 30, {
      size: 12,
      font: "times-italic",
      color: primaryColor,
      align: "center",
    });

    drawText("Payment due within 30 days", width / 2, height - 45, {
      size: 10,
      font: "helvetica",
      color: mediumGray,
      align: "center",
    });

    // Draw page number
    drawText("Page 1 of 1", width - 50, height - 30, {
      size: 8,
      font: "helvetica",
      color: mediumGray,
      align: "right",
    });

    // Generate PDF bytes and trigger download
    const pdfBytes = await pdfDoc.save();
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
  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}
