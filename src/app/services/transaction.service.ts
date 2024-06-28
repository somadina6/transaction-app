import { Injectable } from '@angular/core';
import axios from 'axios';
import { TransactionDataType } from '../types/transactions.type';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private API_URL = environment.API_URL;

  constructor() {}

  async getTransactions(): Promise<TransactionDataType[]> {
    try {
      const response = await axios.get<TransactionDataType[]>(this.API_URL);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw error;
    }
  }

  async getTransactionById(id: string): Promise<TransactionDataType> {
    try {
      const response = await axios.get<TransactionDataType>(this.API_URL, {
        params: {
          id: id,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch transaction with ID ${id}:`, error);
      throw error;
    }
  }

  async updateTransaction(
    transaction: TransactionDataType
  ): Promise<TransactionDataType> {
    const url = `${this.API_URL}/${transaction.id}`;
    try {
      const response = await axios.put<TransactionDataType>(url, transaction);
      return response.data;
    } catch (error) {
      console.error(
        `Failed to update transaction with ID ${transaction.id}:`,
        error
      );
      throw error;
    }
  }
}
