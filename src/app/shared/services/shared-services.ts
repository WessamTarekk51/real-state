import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServices {
  convertToArabicDate(isoDate: string): string {
    const date = new Date(isoDate);

    // Arabic months
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  printPage(){
    const printContent = document.getElementById('print-section')?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      location.reload(); // علشان يرجع الصفحة زي ما كانت
    }
  }
  printRow(rowId : string){
    const row = document.getElementById(rowId);
    if (!row) return;

    const printWindow = window.open('', '', 'width=900,height=600');

    printWindow!.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { direction: rtl; font-family: Arial }
            table { width: 100%; border-collapse: collapse }
            td, th { border: 1px solid #000; padding: 8px; }
          </style>
        </head>
        <body>
          <table>
            ${row.outerHTML}
          </table>
        </body>
      </html>
    `);

    printWindow!.document.close();
    printWindow!.print();
  }
}
