import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDataType } from '../../types/transactions.type';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { DateConversionService } from '../../services/date-conversion.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
})
export class TransactionListComponent implements OnInit {
  transactions: TransactionDataType[] = [];

  constructor(
    public transactionService: TransactionService,
    private dateConversionService: DateConversionService
  ) {}

  ngOnInit(): void {
    this.loadTransactions('2024-01-01', '2024-12-31'); // Example dates
  }

  loadTransactions(startDate: string, endDate: string): void {
    this.transactionService.getTransactions(startDate, endDate).subscribe(
      (data) => {
        // Transform the dates after fetching the transactions
        this.transactions = data.map((transaction) => ({
          ...transaction,
          date: this.dateConversionService.convertTimestampToDate(
            transaction.date
          ),
        }));
      },
      (error) => {
        console.error('Failed to load transactions', error);
      }
    );
  }
}
