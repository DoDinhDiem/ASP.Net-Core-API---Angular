import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChucvuComponent } from './chucvu.component';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ChucvuComponent }
    ])],
    exports: [RouterModule]
})
export class ChucvuModule { }
