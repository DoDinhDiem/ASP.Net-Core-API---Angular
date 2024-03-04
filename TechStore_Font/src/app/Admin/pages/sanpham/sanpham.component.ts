import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SanPhamService } from 'src/app/service/sanpham.service';
import { ISanPham } from 'src/app/api/sanpham';
import { LoaiService } from 'src/app/service/loai.service';
import { IAnh } from 'src/app/api/anhSanPham';
import { IThongSo } from 'src/app/api/thongso';
import { AnhService } from 'src/app/service/anh.service';
import { HangService } from 'src/app/service/hang.service';
import { ThongsoService } from 'src/app/service/thongso.service';

interface action {
    value: boolean;
    name: string;
}
interface statusProduct {
    name: string;
}

@Component({
    selector: 'app-sanpham',
    templateUrl: './sanpham.component.html',
    styleUrls: ['./sanpham.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class SanphamComponent {

    title = "Quản lý sản phẩm"
    sanpham: ISanPham;
    sanphams!: ISanPham[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: ISanPham[] | null;
    Save = "Lưu";
    shouldDisplayImage: boolean = false;
    //select của trạng thái hoạt động
    actions!: action[];
    selectAction!: action;

    //select của trạng thái sản phẩm
    status!: statusProduct[];
    selectStatus!: statusProduct;

    //select và hiển ở table của loại 
    loai: any[] = [];
    selectedLoaiId: any;

    //select và hiển ở table của 
    hang: any[] = [];
    selectedHangId: any;

    //Key search
    keyword: any = "";
    minGiaBan: any = "";
    maxGiaBan: any = "";

    //Ảnh sản phẩm 
    fileOnly: any
    selectedFiles: any[];
    sequenceNumber = 0;

    //Thông số sản phẩm
    selectedItem: string; // Hoặc bất kỳ kiểu dữ liệu nào phù hợp
    productParameters: any[] = [];

    constructor(
        private sanphamService: SanPhamService,
        private loaiService: LoaiService,
        private hangService: HangService,
        private anhService: AnhService,
        private thongsoService: ThongsoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {

        this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' }
        ]
        this.status = [
            { name: 'Sản phẩm thường' },
            { name: 'Sản phẩm mới' },
            { name: 'Sản phẩm hot' },
            { name: 'Sản phẩm Khuyến mại' }
        ]
    }


    //Hiển thị dữ liệu
    loadData(keyword: string, minGiaBan: number, maxGiaBan: number) {
        this.loaiService.getAll().subscribe(data => {
            this.loai = data.map(item => ({
                id: item.id,
                name: item.tenLoai
            }));
        })
        this.hangService.getAll().subscribe(data => {
            this.hang = data.map(item => ({
                id: item.id,
                name: item.tenHang
            }));
        })
        this.sanphamService.search(keyword, minGiaBan, maxGiaBan).subscribe((data) => {
            this.sanphams = data
        })
    };

    //Nút ẩn hiện của sản phẩm
    toggleTrangThai(sanpham: ISanPham) {
        this.sanphamService.toggleTrangThai(sanpham.id).subscribe(() => {
            this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
        });
    }

    //Load lại khi tìm kiếm
    onKeywordInput() {
        this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan)
    }

    //Đặt kiểu number cho giá trong tìm kiếm
    onKeyPress(event: any) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }

    //Mở dialog
    openNew() {
        this.fileOnly = [];
        this.selectedFiles = [];
        this.sanpham = {};
        this.productParameters = [];
        this.shouldDisplayImage = false;
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }

    //Xóa nhiều
    deleteSelected() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selecteds) {
                    const ids = this.selecteds.map((sanpham) => sanpham.id as number);
                    this.sanphamService.deleteMany(ids).subscribe((res) => {
                        this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    //Xóa 1 sản phẩm
    deleteOnly(sanpham: ISanPham) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + sanpham.tenSanPham + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.sanphamService.delete(sanpham.id!).subscribe((res) => {
                    this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                })
            }
        });
    }

    //Mở dialog khi sửa
    edit(sanpham: ISanPham) {
        this.sanphamService.getById(sanpham.id).subscribe(
            data => {
                this.sanpham = data;
                this.shouldDisplayImage = true
                this.selectStatus = this.status.find(option => option.name === data.trangThaiSanPham);
                this.selectAction = this.actions.find(option => option.value == data.trangThaiHoatDong);
                this.selectedLoaiId = this.loai.find(option => option.name == data.loaiId);
                this.selectedHangId = this.hang.find(option => option.name == data.hangSanXuatId);
                this.selectedFiles = data.anhSanPhamList.map(item => ({ name: item.duongDanAnh }));
                this.productParameters = data.thongSos.map(item => ({ tenThongSo: item.tenThongSo, moTa: item.moTa }))
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }



    //Đóng dialog sản phẩm
    hidenDialog() {
        this.Dialog = false;
        this.sanpham = {};
        this.submitted = false;
    }

    //Thêm sửa sản phẩm
    save() {

        //Ảnh sản phẩm
        this.sanpham.anhSanPhams = [];
        for (let i = 0; i < this.selectedFiles.length; i++) {
            const file = this.selectedFiles[i];
            const img = {
                duongDanAnh: file.name,
                trangThai: false
            };
            this.sanpham.anhSanPhams.push(img);
        }

        //Thông số sản phẩm
        this.sanpham.thongSos = [];
        for (let i = 0; i < this.productParameters.length; i++) {
            const parameter = this.productParameters[i];
            const thongSo = {
                tenThongSo: parameter.tenThongSo,
                moTa: parameter.moTa,
                trangThai: true
            };
            this.sanpham.thongSos.push(thongSo);
        }

        this.sanpham.trangThaiHoatDong = this.selectAction?.value;
        this.sanpham.trangThaiSanPham = this.selectStatus?.name;
        this.sanpham.loaiId = this.selectedLoaiId.id;
        this.sanpham.hangSanXuatId = this.selectedHangId.id;
        this.onUpload();
        this.submitted = true;
        if (this.sanpham.id) {
            this.sanphamService.update(this.sanpham).subscribe({
                next: res => {
                    this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                    this.hidenDialog();
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                },
                error: err => {
                    this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                }
            })
        }
        else {
            this.sanphamService.create(this.sanpham).subscribe({
                next: res => {
                    this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
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
        const newFileName = `product_${timestamp}_${this.sequenceNumber}.${extension}`;
        this.sequenceNumber++;
        return newFileName;
    }
    onUpload() {
        if (this.selectedFiles && this.selectedFiles.length > 0) {
            this.sanphamService.uploadFiles(this.selectedFiles).subscribe({
                next: response => {
                    // Add any further handling code here
                },
                error: err => {
                    // Add error handling code here
                }
            });
        }
    }

    //Thông số sản phẩm
    addProductParameter() {
        this.productParameters.push({
            tenThongSo: '',
            moTa: ''
        });
    }
    removeProductParameter(index: number) {
        this.productParameters.splice(index, 1);
    }

    //Ảnh sản phẩm
    DialogImg: boolean = false;
    DialogImgDetail: boolean = false
    currentSanphamId: number;
    anh!: IAnh;
    anhs!: IAnh[];
    titleImg = "Quản lý ảnh sản phẩm"
    selectedImg: IAnh[] | null;

    openImg(sanpham: ISanPham) {
        this.DialogImg = true
        this.currentSanphamId = sanpham.id
        this.loadImg(sanpham.id)
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

    //Xóa 1 sản phẩm
    deleteOnlyImg(anh: IAnh) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + anh.duongDanAnh + '?',
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
    toggleTrangThaiImg(anh: IAnh) {
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
    editImg(anh: IAnh) {
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
        this.anh.sanPhamId = this.currentSanphamId
        this.anh.duongDanAnh = this.fileOnly[0].name;
        this.submitted = true;
        if (this.anh.id) {
            this.anhService.update(this.anh).subscribe({
                next: res => {
                    this.loadImg(this.currentSanphamId);
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
                    this.loadImg(this.currentSanphamId);
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
            this.sanphamService.uploadFiles(this.fileOnly).subscribe({
                next: response => {
                },
                error: err => {
                }
            })
        }
    }

    //Thông số sản phẩm
    thongso!: IThongSo;
    thongsos!: IThongSo[];
    DialogParameter: boolean = false;
    DialogParameterDetail: boolean = false;
    titleParameter = "Quản lý thông số sản phẩm";
    selectedParameter: IThongSo[] | null;

    openParameter(sanpham: ISanPham) {
        this.DialogParameter = true
        this.currentSanphamId = sanpham.id
        this.loadParameter(sanpham.id)
    }

    loadParameter(id: any) {
        this.thongsoService.getAll(id).subscribe(data => {
            this.thongsos = data
        })
    }

    //Xóa nhiều
    deleteSelectedParameter() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa các thông số sản phẩm đã chọn?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selectedParameter) {
                    const ids = this.selectedParameter.map((thongso) => thongso.id as number);
                    this.thongsoService.deleteMany(ids).subscribe((res) => {
                        this.loadParameter(res.id[0]);
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    });
                }
            }
        });
    }

    //Xóa 1 sản phẩm
    deleteOnlyParameter(thongso: IThongSo) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + thongso.tenThongSo + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.thongsoService.delete(thongso.id!).subscribe((res) => {
                    this.loadParameter(res.id);
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                })
            }
        });
    }
    toggleTrangThaiParameter(thongso: IThongSo) {
        this.thongsoService.toggleTrangThai(thongso.id).subscribe((data) => {
            this.loadParameter(data.id);
        });
    }
    openParameterDetail() {
        this.thongso = {};
        this.DialogParameterDetail = true
        this.submitted = false;
        this.Save = 'Lưu'
    }
    hidenDialogParameter() {
        this.DialogParameterDetail = false;
        this.thongso = {};
        this.submitted = false;
    }
    editParameter(thongso: IThongSo) {
        this.thongsoService.getById(thongso.id).subscribe(
            data => {
                this.thongso = data;
                this.DialogParameterDetail = true;
                this.Save = "Cập nhập";
            }
        )
    }
    saveParameter() {
        this.thongso.sanPhamId = this.currentSanphamId
        this.thongso.trangThai = this.selectAction?.value;
        this.submitted = true;
        if (this.thongso.id) {
            this.thongsoService.update(this.thongso).subscribe({
                next: res => {
                    this.loadParameter(this.currentSanphamId);
                    this.hidenDialogParameter();
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                },
                error: err => {
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                }
            })
        }
        else {
            this.thongsoService.create(this.thongso).subscribe({
                next: res => {
                    this.loadParameter(this.currentSanphamId);
                    this.hidenDialogParameter();
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                },
                error: err => {
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                }
            });
        }
    }
    onDialogHide() {
        this.loadData(this.keyword, this.minGiaBan, this.maxGiaBan);
    }
}
