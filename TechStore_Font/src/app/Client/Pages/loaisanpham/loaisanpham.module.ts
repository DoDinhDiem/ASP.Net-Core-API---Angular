import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaiSanPhamComponent } from '../loaisanpham/loaisanpham.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: LoaiSanPhamComponent }
  ])],
  exports: [RouterModule]
})
export class LoaiSanPhamModule { }
