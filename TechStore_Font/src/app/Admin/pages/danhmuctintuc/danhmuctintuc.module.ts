import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhmuctintucComponent } from './danhmuctintuc.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DanhmuctintucComponent }
  ])],
  exports: [RouterModule]
})
export class DanhmuctintucModule { }
