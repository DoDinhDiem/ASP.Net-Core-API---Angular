import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaiComponent } from './loai.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: LoaiComponent }
  ])],
  exports: [RouterModule]
})
export class LoaiModule { }
