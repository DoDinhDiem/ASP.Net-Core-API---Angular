import { Component } from '@angular/core';
import { ITinTuc } from 'src/app/api/tintuc';
import { TinTucService } from 'src/app/service/tintuc.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DanhMucTinTucService } from 'src/app/service/danhmuctintuc.service';
import { IAnhTinTuc } from 'src/app/api/anhtintuc';
import { AnhTinTucService } from 'src/app/service/anhtintuc.service';

interface action {
    value: boolean;
    name: string;
}
@Component({
    selector: 'app-tintuc',
    templateUrl: './tintuc.component.html',
    styleUrls: ['./tintuc.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class TinTucComponent {
    title = "Quản lý tin tức"
    tintuc: ITinTuc;
    tintucs!: ITinTuc[];
    submitted: boolean = false;
    Dialog: boolean = false;

    selecteds!: ITinTuc[] | null;
    Save = "Lưu";
    shouldDisplayImage: boolean = false;
    //select của trạng thái hoạt động
    actions!: action[];
    selectAction!: action;


    //select và hiển ở table của loại 
    loai: any[] = [];
    selectedLoaiId: any;

    //Key search
    keyword: any = "";

    //Ảnh sản phẩm 
    fileOnly: any
    selectedFiles: any[];
    sequenceNumber = 0;


    constructor(
        private tintucService: TinTucService,
        private danhmucService: DanhMucTinTucService,
        private anhService: AnhTinTucService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {

        this.loadData(this.keyword);
        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' }
        ]

    }


    //Hiển thị dữ liệu
    loadData(keyword: string) {
        this.danhmucService.getAll().subscribe(data => {
            this.loai = data.map(item => ({
                id: item.id,
                name: item.tenDanhMuc
            }));
        })
        this.tintucService.search(keyword).subscribe((data) => {
            this.tintucs = data
        })
    };

    //Nút ẩn hiện của sản phẩm
    toggleTrangThai(tintuc: ITinTuc) {
        this.tintucService.toggleTrangThai(tintuc.id).subscribe(() => {
            this.loadData(this.keyword);
        });
    }

    //Load lại khi tìm kiếm
    onKeywordInput() {
        this.loadData(this.keyword)
    }

    //Mở dialog
    openNew() {
        this.selectedFiles = [];
        this.tintuc = {};
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }

    //Xóa nhiều
    deleteSelected() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các tin tức đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selecteds) {
                    const ids = this.selecteds.map((tintuc) => tintuc.id as number);
                    this.tintucService.deleteMany(ids).subscribe((res) => {
                        this.loadData(this.keyword);
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    //Xóa 1 sản phẩm
    deleteOnly(tintuc: ITinTuc) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + tintuc.tieuDe + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.tintucService.delete(tintuc.id!).subscribe((res) => {
                    this.loadData(this.keyword);
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                })
            }
        });
    }

    //Mở dialog khi sửa
    edit(tintuc: ITinTuc) {
        this.tintucService.getById(tintuc.id).subscribe(
            data => {
                this.tintuc = data;
                this.shouldDisplayImage = true
                this.selectAction = this.actions.find(option => option.value == data.trangThaiHoatDong);
                this.selectedLoaiId = this.loai.find(option => option.name == data.loaiId);
                this.selectedFiles = data.anhTinTucList.map(item => ({ name: item.duongDan }));
                
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }



    //Đóng dialog sản phẩm
    hidenDialog() {
        this.Dialog = false;
        this.tintuc = {};
        this.submitted = false;
    }

    //Thêm sửa sản phẩm
    save() {
        //Ảnh sản phẩm
        this.tintuc.anhTinTucs = [];
        for (let i = 0; i < this.selectedFiles.length; i++) {
            const file = this.selectedFiles[i];
            const img = {
                duongDan: file.name,
                trangThai: true
            };

            this.tintuc.anhTinTucs.push(img);
        }
        this.tintuc.danhMucId = this.selectedLoaiId?.id;
        this.tintuc.trangThai = this.selectAction?.value;
        this.submitted = true;
        if (this.tintuc.id) {
            this.tintucService.update(this.tintuc).subscribe({
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
            this.tintucService.create(this.tintuc).subscribe({
                next: res => {
                    this.loadData(this.keyword);
                    this.hidenDialog();
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                },
                error: err => {
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                }
            });
        }
    }

    //Upload 
    onFilesSelected(event) {
        const files: FileList = event.target.files;
        this.selectedFiles = Array.from(files).map(file => {
            const newName = this.generateNewFileName(file.name);
            return new File([file], newName, { type: file.type });
        });
    }
    onFileOnly(event) {
        const files: FileList = event.target.files;
        this.fileOnly = Array.from(files).map(file => {
            const newName = this.generateNewFileName(file.name);
            return new File([file], newName, { type: file.type });
        });
    }
    generateNewFileName(oldFileName: string): string {
        const timestamp = new Date().getTime();
        const extension = oldFileName.split('.').pop();
        const newFileName = `news_${timestamp}_${this.sequenceNumber}.${extension}`;
        this.sequenceNumber++;
        return newFileName;
    }
    onUpload() {
        if (this.selectedFiles && this.selectedFiles.length > 0) {
            this.tintucService.uploadFiles(this.selectedFiles).subscribe({

                next: response => {
                },
                error: err => {
                }
            });
        }

    }

    //Ảnh sản phẩm
    DialogImg: boolean = false;
    DialogImgDetail: boolean = false
    currenttintucId: number;
    anh!: IAnhTinTuc;
    anhs!: IAnhTinTuc[];
    titleImg = "Quản lý ảnh tin tức"
    selectedImg: IAnhTinTuc[] | null;

    openImg(tintuc: ITinTuc) {
        this.DialogImg = true
        this.currenttintucId = tintuc.id
        this.loadImg(tintuc.id)
    }

    loadImg(id: any) {
        this.anhService.getAll(id).subscribe(data => {
            this.anhs = data
        })
    }

    //Xóa nhiều
    deleteSelectedImg() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các ảnh sản phẩm đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selectedImg) {
                    const ids = this.selectedImg.map((anh) => anh.id as number);
                    this.anhService.deleteMany(ids).subscribe((res) => {
                        this.loadImg(res.id[0]);
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    //Xóa 1 ảnh
    deleteOnlyImg(anh: IAnhTinTuc) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + anh.duongDan + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.anhService.delete(anh.id!).subscribe((res) => {
                    this.loadImg(res.id);
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                })
            }
        });
    }
    toggleTrangThaiImg(anh: IAnhTinTuc) {
        this.anhService.toggleTrangThai(anh.id).subscribe((data) => {
            this.loadImg(data.id);
        });
    }
    openImgDetail() {
        this.fileOnly = [];
        this.anh = {};
        this.DialogImgDetail = true
        this.submitted = false;
        this.Save = 'Lưu'
    }
    hidenDialogImg() {

        this.DialogImgDetail = false;
        this.anh = {};
        this.submitted = false;
    }
    editImg(anh: IAnhTinTuc) {
        this.anhService.getById(anh.id).subscribe(
            data => {

                this.anh = data;
                this.shouldDisplayImage = true
                this.fileOnly = [{ name: data.duongDanAnh }];
                this.DialogImgDetail = true;
                this.Save = "Cập nhập";
            }
        )
    }
    saveImg() {
        this.anh.tinTucId = this.currenttintucId
        this.anh.duongDan = this.fileOnly[0].name;
        this.submitted = true;
        if (this.anh.id) {
            this.anhService.update(this.anh).subscribe({
                next: res => {
                    this.loadImg(this.currenttintucId);
                    this.hidenDialogImg();
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                },
                error: err => {
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                }
            })
        }
        else {
            this.anhService.create(this.anh).subscribe({
                next: res => {
                    this.loadImg(this.currenttintucId);
                    this.hidenDialogImg();
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                },
                error: err => {
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                }
            });
        }
    }
    onUploadImg() {
        if (this.fileOnly && this.fileOnly.length > 0) {
            this.tintucService.uploadFiles(this.fileOnly).subscribe({
                next: response => {
                },
                error: err => {
                }
            })
        }
    }
    onDialogHide() {
        this.loadData(this.keyword);
    }
}
