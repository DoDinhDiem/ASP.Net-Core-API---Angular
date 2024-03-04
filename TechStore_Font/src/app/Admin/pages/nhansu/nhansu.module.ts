import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhansuComponent } from './nhansu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: NhansuComponent}
  ])],
  exports: [RouterModule]
})
export class NhansuModule { }
