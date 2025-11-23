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
}
