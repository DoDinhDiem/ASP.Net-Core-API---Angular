import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiTietSanPhamComponent } from '../chitietsanpham/chitietsanpham.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ChiTietSanPhamComponent }
  ])],
  exports: [RouterModule]
})
export class ChiTietSanPhamModule { }
