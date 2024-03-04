import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoaDonNhapComponent } from '../hoadonnhap/hoadonnhap.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: HoaDonNhapComponent }
  ])],
  exports: [RouterModule]
})
export class HoadonnhapModule { }
