import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IKhachHang } from 'src/app/api/khachhang';
import { KhachhangService } from 'src/app/service/khachhang.service';

@Component({
    selector: 'app-khachhang',
    templateUrl: './khachhang.component.html',
    styleUrls: ['./khachhang.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class KhachhangComponent {
    title = "Quản lý nhân viên"
    khachhang!: IKhachHang;
    khachhangs!: IKhachHang[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: IKhachHang[] | null;
    Save = "Lưu";

    keyword: any = "";
    email: any = "";
    diachi: any = "";

    constructor(
        private khachhangService: KhachhangService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }


    ngOnInit(): void {
        this.loadData(this.keyword, this.email, this.diachi);
    }

    loadData(keyword: string, email: string, diachi: string) {
        this.khachhangService.search(keyword, email, diachi).subscribe((data) => {
            this.khachhangs = data
        })
    };
    onKeywordInput() {
        this.loadData(this.keyword, this.email, this.diachi);
    }
}
