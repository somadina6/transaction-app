import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateConversionService {
  constructor() {}

  convertTimestampToDate(timestamp: number | string): string {
    const date = new Date(timestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
