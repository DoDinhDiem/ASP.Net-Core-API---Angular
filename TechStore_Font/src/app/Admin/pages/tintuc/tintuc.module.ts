import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinTucComponent } from './tintuc.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TinTucComponent }
  ])],
  exports: [RouterModule]
})
export class TinTucModule { }
