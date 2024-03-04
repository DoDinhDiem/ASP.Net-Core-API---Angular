import { NgModule } from '@angular/core';
import { NhaCungCapComponent } from '../nhacungcap/nhacungcap.component';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NhaCungCapComponent }
    ])],
    exports: [RouterModule],
})
export class NhacungcapModule { }
