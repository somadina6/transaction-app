import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDataType } from '../../types/transactions.type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DateConversionService } from '../../services/date-conversion.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class TransactionDetailComponent implements OnInit {
  transaction: TransactionDataType = {
    id: '1',
    date: '',
    sender: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      IDNumber: '',
    },
    recipient: {
      firstName: '',
      lastName: '',
      email: '',
      accountNumber: '',
      bank: 'D',
    },
    Amount: 0,
    CurrencyCd: 'CAD',
    Comments: '',
    status: 'PENDING',
  };

  constructor(
    private route: ActivatedRoute,
    public transactionService: TransactionService,
    public router: Router,
    public dateConversionService: DateConversionService
  ) {}

  ngOnInit(): void {
    this.loadTransaction();
  }

  async loadTransaction() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Transaction ID is required');
    }

    this.transactionService.getTransactionById(id).subscribe(
      (data) => (this.transaction = data),
      (error) => console.error('Failed to load transaction', error)
    );
  }

  updateTransaction() {
    if (!this.transaction) {
      console.error('No transaction data to update');
      return;
    }

    this.transactionService.updateTransaction(this.transaction).subscribe(
      (updatedTransaction) => {
        this.transaction = updatedTransaction;
        console.log('Transaction updated successfully');
        this.router.navigate(['/transactions']); // Navigate to the transactions list or another appropriate route
      },
      (error) => console.error('Failed to update transaction', error)
    );
  }
}
