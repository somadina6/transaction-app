import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    TransactionDetailComponent,
    TransactionListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'transaction-app';
}
