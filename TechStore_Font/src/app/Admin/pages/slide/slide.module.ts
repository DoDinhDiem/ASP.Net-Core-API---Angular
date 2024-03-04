import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from '../slide/slide.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: SlideComponent }
  ])],
  exports: [RouterModule]
})
export class SlideModule { }
