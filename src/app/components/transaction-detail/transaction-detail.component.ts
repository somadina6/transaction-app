import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDataType } from '../../types/transactions.type';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DateConversionService } from '../../services/date-conversion.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export class TransactionDetailComponent implements OnInit {
  trans_id: string | null = '';
  @Output() closeDetail = new EventEmitter<void>();

  transactionForm: FormGroup;
  transaction: TransactionDataType | null = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public transactionService: TransactionService,
    public dateConversionService: DateConversionService
  ) {
    this.transactionForm = new FormGroup({
      id: new FormControl<string>(''),
      date: new FormControl<string>(''),
      comments: new FormControl<string>('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadTransaction();

    this.transactionForm.get('comments')?.valueChanges.subscribe((value) => {
      if (this.transaction) {
        this.transaction.Comments = value;
      }
    });
  }

  close(): void {
    this.closeDetail.emit();
  }

  async loadTransaction(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('Transaction ID is required');
      return;
    }

    try {
      this.transaction = await this.transactionService.getTransactionById(id);
      this.transactionForm.patchValue({
        id: this.transaction.id,
        date: this.dateConversionService.convertTimestampToDate(
          this.transaction.date
        ),
        comments: this.transaction.Comments,
      });
    } catch (error) {
      console.error('Failed to load transaction', error);
    }
  }

  async updateTransaction(): Promise<void> {
    if (!this.transaction) {
      console.error('No transaction data to update');
      return;
    }

    try {
      const updatedTransaction =
        await this.transactionService.updateTransaction(this.transaction);
      console.log('Transaction updated successfully:', updatedTransaction);
      await this.transactionService.getTransactions(); // Update the transaction list
    } catch (error) {
      console.error('Failed to update transaction:', error);
    } finally {
      this.router.navigateByUrl('/transactions');
    }
  }
}
