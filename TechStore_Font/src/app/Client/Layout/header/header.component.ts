import { Component } from '@angular/core';
import { IDanhMucTinTuc } from 'src/app/api/danhmuctintuc';
import { ILoai } from 'src/app/api/loai';
import { ClientService } from 'src/app/service/client.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    loais!: ILoai[];

    tinTuc!: IDanhMucTinTuc[];

    constructor(private clientService: ClientService) { }

    ngOnInit() {
        this.loadLoai();
        this.loadDanhMuc();
    }

    loadLoai() {
        this.clientService.getLoai().subscribe(data => {
            this.loais = data
        })
    }

    loadDanhMuc() {
        this.clientService.getDanhMucTinTuc().subscribe(data => {
            this.tinTuc = data
        })
    }
}
