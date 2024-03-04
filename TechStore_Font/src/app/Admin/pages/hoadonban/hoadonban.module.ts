import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoaDonBanComponent } from './hoadonban.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: HoaDonBanComponent }
  ])],
  exports: [RouterModule]
})
export class HoaDonBanModule { }
