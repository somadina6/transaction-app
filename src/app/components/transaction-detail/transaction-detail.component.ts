import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDataType } from '../../types/transactions.type';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DateConversionService } from '../../services/date-conversion.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class TransactionDetailComponent implements OnInit {
  @Input({ required: true }) trans_id: string = '';
  @Output() closeDetail = new EventEmitter<void>();

  transactionForm: FormGroup;
  transaction: TransactionDataType | null = null;

  constructor(
    private route: ActivatedRoute,
    public transactionService: TransactionService,
    public router: Router,
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
    if (!this.trans_id) {
      console.error('Transaction ID is required');
      return;
    }

    try {
      const data = await firstValueFrom(
        this.transactionService.getTransactionById(this.trans_id)
      );
      this.transaction = data;
      this.transactionForm.patchValue({
        id: data.id,
        date: this.dateConversionService.convertTimestampToDate(data.date),
        comments: data.Comments,
      });
    } catch (error) {
      console.error('Failed to load transaction', error);
    }
  }

  updateTransaction(): void {
    if (!this.transaction) {
      console.error('No transaction data to update');
      return;
    }

    this.transactionService.updateTransaction(this.transaction).subscribe(
      (updatedTransaction) => {
        this.transaction = updatedTransaction;
        console.log('Transaction updated successfully');
        this.transactionService.getTransactions();
      },
      (error) => console.error('Failed to update transaction', error)
    );
    this.close();
  }
}
