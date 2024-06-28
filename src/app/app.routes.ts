import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import { NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const routes: Routes = [
  { path: 'transactions', component: TransactionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideHttpClient(withFetch())],
})
export class AppRoutingModule {}
