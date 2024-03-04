import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RegisterComponent }
  ])],
  exports: [RouterModule]
})
export class RegisterModule { }
