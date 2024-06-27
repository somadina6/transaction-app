import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule, FormsModule],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [],
})
export class AppModule {}
