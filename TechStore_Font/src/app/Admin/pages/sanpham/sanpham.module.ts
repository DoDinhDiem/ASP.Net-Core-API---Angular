import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SanphamComponent } from './sanpham.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: SanphamComponent }
  ])],
  exports: [RouterModule]
})
export class SanphamModule { }
