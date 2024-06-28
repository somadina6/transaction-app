import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDataType } from '../../types/transactions.type';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { DateConversionService } from '../../services/date-conversion.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    TransactionDetailComponent,
  ],
})
export class TransactionListComponent implements OnInit {
  transactions: TransactionDataType[] = [];
  isTransactionDetailShowing = false;
  selectedTransactionId = '';

  constructor(
    public transactionService: TransactionService,
    private dateConversionService: DateConversionService
  ) {}

  ngOnInit(): void {
    this.loadTransactions(); // Example dates
  }

  viewDetails(id: string) {
    this.selectedTransactionId = id;
    this.isTransactionDetailShowing = true;
  }

  async onCloseDetail(): Promise<void> {
    this.loadTransactions(); // Reload the transactions
    this.isTransactionDetailShowing = false;
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (data) => {
        // Filter transactions based on status
        const filteredData = data.filter((transaction) =>
          ['COMPLETED', 'IN PROGRESS', 'REJECTED'].includes(transaction.status)
        );

        // Transform the dates after filtering the transactions
        this.transactions = filteredData.map((transaction) => ({
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
