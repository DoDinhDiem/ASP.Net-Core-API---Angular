import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IDanhMucTinTuc } from 'src/app/api/danhmuctintuc';
import { DanhMucTinTucService } from 'src/app/service/danhmuctintuc.service';

interface action {
    value: boolean;
    name: string;
}
@Component({
    selector: 'app-danhmuctintuc',
    templateUrl: './danhmuctintuc.component.html',
    providers: [MessageService, ConfirmationService]
})
export class DanhmuctintucComponent {
    title = "Quản lý danh mục tin tức"
    danhmuc!: IDanhMucTinTuc;
    danhmucs!: IDanhMucTinTuc[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: IDanhMucTinTuc[] | null;
    Save = "Lưu";

    actions: action[] | undefined;
    selectAction: action | undefined;

    keyword: any = "";

    constructor(
        private danhmucService: DanhMucTinTucService,
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
        this.danhmucService.search(keyword).subscribe((data) => {
            this.danhmucs = data
        })
    };

    toggleTrangThai(danhmuc: IDanhMucTinTuc) {
        this.danhmucService.toggleTrangThai(danhmuc.id).subscribe(() => {
            this.loadData(this.keyword);
        });
    }
    onKeywordInput() {
        this.loadData(this.keyword)
    }
    openNew() {
        this.danhmuc = {};
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
                    const ids = this.selecteds.map((danhmuc) => danhmuc.id as number);
                    this.danhmucService.deleteMany(ids).subscribe((res) => {
                        this.loadData(this.keyword);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    edit(danhmuc: IDanhMucTinTuc) {
        this.danhmucService.getById(danhmuc.id).subscribe(
            data => {
                this.danhmuc = data;
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }

    deleteOnly(danhmuc: IDanhMucTinTuc) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + danhmuc.tenDanhMuc + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.danhmucService.delete(danhmuc.id!).subscribe((res) => {
                    this.loadData(this.keyword);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                })
            }
        });
    }

    hidenDialog() {

        this.Dialog = false;
        this.danhmuc = {};
        this.submitted = false;
    }

    save() {
        this.danhmuc.trangThai = this.selectAction?.value
        this.submitted = true;

        if (this.danhmuc.tenDanhMuc) {
            if (this.danhmuc.id) {
                this.danhmucService.update(this.danhmuc).subscribe({
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
                this.danhmucService.create(this.danhmuc).subscribe({
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
