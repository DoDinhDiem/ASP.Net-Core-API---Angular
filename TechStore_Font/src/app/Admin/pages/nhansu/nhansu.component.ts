import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { INhanSu } from 'src/app/api/nhansu';
import { NhanSuService } from 'src/app/service/nhansu.service';
import { ChucvuService } from 'src/app/service/chucvu.service';
interface action {
    value: boolean;
    name: string;
}

interface gender {
    name: string;
}

interface role {
    name: string;
}

@Component({
    selector: 'app-nhansu',
    templateUrl: './nhansu.component.html',
    styleUrls: ['./nhansu.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class NhansuComponent {
    title = "Quản lý nhân viên"
    nhansu!: INhanSu;
    nhansus!: INhanSu[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: INhanSu[] | null;
    Save = "Lưu";

    actions: action[] | undefined;
    selectAction: action | undefined;

    genders: gender[] | undefined;
    selectGender: gender | undefined;

    fileOnly: File;

    fileOnlyImg: any;
    sequenceNumber = 0;

    role: role[] | undefined;
    selectRole: role | undefined;;

    chucvu: any[] = [];
    selectChucVu: any;

    shouldDisplayImage: boolean = false;

    keyword: any = "";
    email: any = "";
    diachi: any = "";

    constructor(
        private nhansuService: NhanSuService,
        private chucvuService: ChucvuService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }


    ngOnInit(): void {
        this.loadData(this.keyword, this.email, this.diachi);
        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' }
        ]
        this.genders = [
            { name: 'Nam' },
            { name: 'Nữ' }
        ]

        this.role = [
            { name: 'Admin' },
            { name: 'Nhân viên' }

        ]
    }



    loadData(keyword: string, email: string, diachi: string) {

        this.chucvuService.getAll().subscribe(data => {
            this.chucvu = data.map(item => ({
                id: item.id,
                name: item.tenChucVu
            }));
        })
        this.nhansuService.search(keyword, email, diachi).subscribe((data) => {
            this.nhansus = data
        })
    };

    toggleTrangThai(nhansu: INhanSu) {
        this.nhansuService.toggleTrangThai(nhansu.id).subscribe(() => {
            this.loadData(this.keyword, this.email, this.diachi);
        });
    }
    onKeywordInput() {
        this.loadData(this.keyword, this.email, this.diachi);
    }
    openNew() {
        this.nhansu = {};
        this.shouldDisplayImage = false;
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }

    edit(nhansu: INhanSu) {
        this.nhansuService.getById(nhansu.id).subscribe(
            data => {
                this.shouldDisplayImage = true;
                this.nhansu = data;
                this.fileOnly = { name: data.avartar } as File;
                this.selectRole = this.role.find(option => option.name === data.role);
                this.selectAction = this.actions.find(option => option.value == data.trangThai);
                this.selectGender = this.genders.find(option => option.name == data.gioiTinh);
                this.nhansu.ngaySinh = new Date(data.ngaySinh)
                this.nhansu.ngayVaoLam = new Date(data.ngayVaoLam)
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }


    hidenDialog() {

        this.Dialog = false;
        this.nhansu = {};
        this.submitted = false;
    }

    save() {
        if (this.fileOnly) {
            this.nhansu.avatar = this.fileOnly.name;
        }
        this.nhansu.passWord = "techstore@123"
        this.nhansu.chucVuId = this.selectChucVu.id;
        this.nhansu.role = this.selectRole.name;
        this.nhansu.gioiTinh = this.selectGender?.name;
        this.nhansu.trangThai = this.selectAction?.value;
        this.submitted = true;
        if (this.nhansu.firstName) {
            if (this.nhansu.id) {
                this.nhansuService.update(this.nhansu).subscribe({
                    next: res => {
                        this.loadData(this.keyword, this.email, this.diachi);
                        this.hidenDialog();
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.loadData(this.keyword, this.email, this.diachi);
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
            else {
                this.nhansuService.create(this.nhansu).subscribe({
                    next: res => {
                        this.loadData(this.keyword, this.email, this.diachi);
                        this.hidenDialog();
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: err.error.message, life: 3000 });
                    }
                })
            }
        }
    }

    onFileOnly(event) {
        const files: FileList = event.target.files;
        const file = files[0];
        if (file) {
            const newName = this.generateNewFileName(file.name);
            this.fileOnly = new File([file], newName, { type: file.type });
        }
    }

    generateNewFileName(oldFileName: string): string {
        const timestamp = new Date().getTime();
        const extension = oldFileName.split('.').pop();
        const newFileName = `personnel_${timestamp}_${this.sequenceNumber}.${extension}`;
        this.sequenceNumber++;
        return newFileName;
    }
    onUpload() {
        this.nhansuService.uploadFile(this.fileOnly).subscribe({
            next: response => {
            },
            error: err => {
            }
        })
    }
}
