import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhachhangComponent } from './khachhang.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: KhachhangComponent }
  ])],
  exports: [RouterModule]
})
export class KhachhangModule { }
