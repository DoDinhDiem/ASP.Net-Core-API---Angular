import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiTietTinTucComponent } from './chitiettintuc.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ChiTietTinTucComponent }
  ])],
  exports: [RouterModule]
})
export class ChiTietTinTucModule { }
