import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ILoai } from 'src/app/api/loai';
import { LoaiService } from 'src/app/service/loai.service';

interface action {
    value: boolean;
    name: string;
}
@Component({
    selector: 'app-loai',
    templateUrl: './loai.component.html',
    providers: [MessageService, ConfirmationService],
})
export class LoaiComponent {
    title = 'Quản lý loại sản phẩm';
    loai!: ILoai;
    loais!: ILoai[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: ILoai[] | null;
    Save = 'Lưu';

    actions: action[] | undefined;
    selectAction: action | undefined;

    keyword: any = '';

    constructor(
        private loaiService: LoaiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadData(this.keyword);
        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' },
        ];
    }

    loadData(keyword: string) {
        this.loaiService.search(keyword).subscribe((data) => {
            this.loais = data;
        });
    }

    toggleTrangThai(loai: ILoai) {
        this.loaiService.toggleTrangThai(loai.id).subscribe(() => {
            this.loadData(this.keyword);
        });
    }
    onKeywordInput() {
        this.loadData(this.keyword);
    }
    openNew() {
        this.loai = {};
        this.submitted = false;
        this.Dialog = true;
        this.Save = 'Lưu';
    }

    deleteSelected() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các hãng sản phẩm đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selecteds) {
                    const ids = this.selecteds.map((loai) => loai.id as number);
                    this.loaiService.deleteMany(ids).subscribe((res) => {
                        this.loadData(this.keyword);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: res.message,
                            life: 3000,
                        });
                    });
                }
            },
        });
    }

    edit(loai: ILoai) {
        this.loaiService.getById(loai.id).subscribe((data) => {
            this.loai = data;
            this.Dialog = true;
            this.Save = 'Cập nhập';
        });
    }

    deleteOnly(loai: ILoai) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + loai.tenLoai + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.loaiService.delete(loai.id!).subscribe((res) => {
                    this.loadData(this.keyword);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: res.message,
                        life: 3000,
                    });
                });
            },
        });
    }

    hidenDialog() {
        this.Dialog = false;
        this.loai = {};
        this.submitted = false;
    }

    save() {
        this.loai.trangThai = this.selectAction?.value;
        this.submitted = true;

        if (this.loai.tenLoai) {
            if (this.loai.id) {
                this.loaiService.update(this.loai).subscribe({
                    next: (res) => {
                        this.loadData(this.keyword);
                        this.hidenDialog();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thông báo',
                            detail: res.message,
                            life: 3000,
                        });
                    },
                    error: (err) => {
                        this.loadData(this.keyword);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thông báo',
                            detail: 'Lỗi',
                            life: 3000,
                        });
                    },
                });
            } else {
                this.loaiService.create(this.loai).subscribe({
                    next: (res) => {
                        this.loadData(this.keyword);
                        this.hidenDialog();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thông báo',
                            detail: res.message,
                            life: 3000,
                        });
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thông báo',
                            detail: 'Lỗi',
                            life: 3000,
                        });
                    },
                });
            }
        }
    }
}
