import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDataType } from '../../types/transactions.type';
import { DateConversionService } from '../../services/date-conversion.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [TransactionDetailComponent],
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

  async loadTransactions(): Promise<void> {
    try {
      this.transactions = await this.transactionService.getTransactions();
      this.transactions.forEach((transaction) => {
        transaction.date = this.dateConversionService.convertTimestampToDate(
          transaction.date
        );
      });
    } catch (error) {
      console.error('Failed to load transactions:', error);
      // Handle error as needed
    }
  }
}
