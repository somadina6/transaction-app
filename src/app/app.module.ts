import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule, FormsModule],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [],
})
export class AppModule {}
