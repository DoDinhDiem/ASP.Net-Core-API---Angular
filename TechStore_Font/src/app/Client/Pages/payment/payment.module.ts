import { NgModule } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: PaymentComponent }
  ])],
  exports: [RouterModule]
})
export class PaymentModule { }
