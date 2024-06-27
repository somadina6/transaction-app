import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TransactionDataType } from '../types/transactions.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getTransactions(
    startDate: string,
    endDate: string
  ): Observable<TransactionDataType[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http
      .get<TransactionDataType[]>(this.API_URL, { params })
      .pipe(
        catchError(
          this.handleError<TransactionDataType[]>('getTransactions', [])
        )
      );
  }

  getTransactionById(id: string): Observable<TransactionDataType> {
    const params = new HttpParams().set('id', id);

    return this.http
      .get<TransactionDataType>(this.API_URL, { params })
      .pipe(
        catchError(this.handleError<TransactionDataType>('getTransactionById'))
      );
  }

  updateTransaction(
    transaction: TransactionDataType
  ): Observable<TransactionDataType> {
    const url = `${this.API_URL}/${transaction.id}`;

    return this.http
      .put<TransactionDataType>(url, transaction)
      .pipe(
        catchError(this.handleError<TransactionDataType>('updateTransaction'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
