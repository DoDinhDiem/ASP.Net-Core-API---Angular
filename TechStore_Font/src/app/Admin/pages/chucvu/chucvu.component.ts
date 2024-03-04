import { Component } from '@angular/core';
import { ChucvuService } from 'src/app/service/chucvu.service';
import { IChucVu } from 'src/app/api/chucvu';
import { ConfirmationService, MessageService } from 'primeng/api';

interface action {
    value: boolean;
    name: string;
}
@Component({
    selector: 'app-chucvu',
    templateUrl: './chucvu.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ChucvuComponent {
    title = "Quản lý chức vụ"
    chucvu!: IChucVu;
    chucvus!: IChucVu[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: IChucVu[] | null;
    Save = "Lưu";

    actions: action[] | undefined;
    selectAction: action | undefined;

    keyword: any = "";

    constructor(
        private chucvuService: ChucvuService,
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
        this.chucvuService.search(keyword).subscribe((data) => {
            this.chucvus = data
        })
    };

    toggleTrangThai(chucvu: IChucVu) {
        this.chucvuService.toggleTrangThai(chucvu.id).subscribe(() => {
            this.loadData(this.keyword);
        });
    }
    onKeywordInput() {
        this.loadData(this.keyword)
    }
    openNew() {
        this.chucvu = {};
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }

    deleteSelected() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các quyền đã chọn đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selecteds) {
                    const ids = this.selecteds.map((chucvu) => chucvu.id as number);
                    this.chucvuService.deleteMany(ids).subscribe((res) => {
                        this.loadData(this.keyword);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    edit(chucvu: IChucVu) {
        this.chucvuService.getById(chucvu.id).subscribe(
            data => {
                this.chucvu = data;
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }

    deleteOnly(chucvu: IChucVu) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + chucvu.tenChucVu + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.chucvuService.delete(chucvu.id!).subscribe((res) => {
                    this.loadData(this.keyword);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                })
            }
        });
    }

    hidenDialog() {
        this.Dialog = false;
        this.chucvu = {};
        this.submitted = false;
    }

    save() {
        this.chucvu.trangThai = this.selectAction?.value
        this.submitted = true;

        if (this.chucvu.tenChucVu) {
            if (this.chucvu.id) {
                this.chucvuService.update(this.chucvu).subscribe({
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
                this.chucvuService.create(this.chucvu).subscribe({
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
