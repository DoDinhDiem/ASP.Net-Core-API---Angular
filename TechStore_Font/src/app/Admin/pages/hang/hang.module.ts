import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HangComponent } from './hang.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: HangComponent }
  ])],
  exports: [RouterModule]
})
export class HangModule { }
