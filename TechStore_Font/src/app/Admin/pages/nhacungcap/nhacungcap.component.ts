import { Component } from '@angular/core';
import { INhaCungCap } from 'src/app/api/nhacungcap';
import { NhaCungcapService } from 'src/app/service/nhacungcap.service';
import { ConfirmationService, MessageService } from 'primeng/api';

interface action {
    value: boolean;
    name: string
}
@Component({
    selector: 'app-nhacungcap',
    templateUrl: './nhacungcap.component.html',
    providers: [MessageService, ConfirmationService]
})
export class NhaCungCapComponent {
    title = "Quản lý loại sản phẩm"
    nhacungcap!: INhaCungCap;
    nhacungcaps!: INhaCungCap[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: INhaCungCap[] | null;
    Save = "Lưu";

    actions: action[] | undefined;
    selectAction: action | undefined;

    keyword: any = "";

    constructor(
        private nhacungcapService: NhaCungcapService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }


    ngOnInit(): void {
        this.loadData(this.keyword);
        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' }
        ]
    }



    loadData(keyword: string) {
        this.nhacungcapService.search(keyword).subscribe((data) => {
            this.nhacungcaps = data
        })
    };

    toggleTrangThai(nhacungcap: INhaCungCap) {
        this.nhacungcapService.toggleTrangThai(nhacungcap.id).subscribe(() => {
            this.loadData(this.keyword);
        });
    }
    onKeywordInput() {
        this.loadData(this.keyword)
    }
    openNew() {
        this.nhacungcap = {};
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }

    deleteSelected() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các hãng sản phẩm đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selecteds) {
                    const ids = this.selecteds.map((nhacungcap) => nhacungcap.id as number);
                    this.nhacungcapService.deleteMany(ids).subscribe((res) => {
                        this.loadData(this.keyword);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    edit(nhacungcap: INhaCungCap) {
        this.nhacungcapService.getById(nhacungcap.id).subscribe(
            data => {
                this.nhacungcap = data;
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }

    deleteOnly(nhacungcap: INhaCungCap) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + nhacungcap.tenNhaCungCap + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.nhacungcapService.delete(nhacungcap.id!).subscribe((res) => {
                    this.loadData(this.keyword);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                })
            }
        });
    }

    hidenDialog() {

        this.Dialog = false;
        this.nhacungcap = {};
        this.submitted = false;
    }

    save() {
        this.nhacungcap.trangThai = this.selectAction?.value
        this.submitted = true;

        if (this.nhacungcap.tenNhaCungCap) {
            if (this.nhacungcap.id) {
                this.nhacungcapService.update(this.nhacungcap).subscribe({
                    next: res => {
                        this.loadData(this.keyword);
                        this.hidenDialog();
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.loadData(this.keyword);
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
            else {
                this.nhacungcapService.create(this.nhacungcap).subscribe({
                    next: res => {
                        this.loadData(this.keyword);
                        this.hidenDialog();
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
        }
    }
}
