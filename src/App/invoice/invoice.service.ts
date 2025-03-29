import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class InvoiceService {
  create(res: Response) {
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(res);

    const boldFont = 'Helvetica-Bold';
    const regularFont = 'Helvetica';
    const mainColor = '#333333';

    doc
      .font(boldFont)
      .fontSize(24)
      .fillColor(mainColor)
      .text('INVOICE', { align: 'center' })
      .moveDown(1.5);

    const clientInfo = {
      issuedTo: `Richard Sanchez\nThynk Unlimited\n123 Anywhere St., Any City`,
      payTo: `Borcele Bank\nAccount Name: Adeline Palmerston\nAccount No.: 0123 4567 8901`,
    };

    doc
      .font(regularFont)
      .fontSize(10)
      .text('ISSUED TO:', { continued: true, lineBreak: true })
      .font(boldFont)
      .text(clientInfo.issuedTo, { lineBreak: true })
      .moveUp(3)
      .text('PAY TO:', 350, undefined, { lineBreak: true })
      .font(regularFont)
      .text(clientInfo.payTo, 350);

    doc.moveTo(50, 200).lineTo(550, 200).strokeColor('#cccccc').stroke();

    const invoiceDetails = {
      number: 'INVOICE NO:',
      date: 'DATE: 11.02.2030',
      dueDate: 'DUE DATE: 11.03.2030',
    };

    doc
      .font(boldFont)
      .fontSize(10)
      .fillColor(mainColor)
      .text(invoiceDetails.number, 50, 220)
      .text(invoiceDetails.date, 200, 220)
      .text(invoiceDetails.dueDate, 400, 220);

    doc.moveTo(50, 250).lineTo(550, 250).stroke();

    const tableHeaders = ['DESCRIPTION', 'UNIT PRICE', 'QTY', 'TOTAL'];
    const tableTop = 270;

    doc
      .font(boldFont)
      .fontSize(10)
      .text(tableHeaders[0], 50, tableTop)
      .text(tableHeaders[1], 300, tableTop, { width: 80, align: 'right' })
      .text(tableHeaders[2], 380, tableTop, { width: 50, align: 'right' })
      .text(tableHeaders[3], 450, tableTop, { width: 80, align: 'right' });

    // Datos de la tabla
    const items = [
      ['Brand consultation', 100, 1, 100],
      ['logo design', 100, 1, 100],
      ['Website design', 100, 1, 100],
      ['Social media templates', 100, 1, 100],
      ['Brand photography', 100, 1, 100],
      ['Brand guide', 100, 1, 100],
    ];

    let y = tableTop + 25;
    items.forEach((item, index) => {
      doc
        .font(regularFont)
        .fontSize(10)
        .text(item[0] as string, 50, y)
        .text(`$ ${(item[1] as number).toFixed(2)}`, 300, y, {
          width: 80,
          align: 'right',
        })
        .text(item[2].toString(), 380, y, { width: 50, align: 'right' })
        .text(`$ ${(item[3] as number).toFixed(2)}`, 450, y, {
          width: 80,
          align: 'right',
        });

      y += 25;
    });

    // Totales
    doc
      .font(boldFont)
      .text('SUBTOTAL', 400, y + 20)
      .text('Tax TOTAL', 400, y + 40)
      .font(regularFont)
      .text('$600.00', 450, y + 20, { width: 80, align: 'right' })
      .text('$0.00', 450, y + 40, { width: 80, align: 'right' });

    // Finalizar documento
    doc.end();
  }
}
