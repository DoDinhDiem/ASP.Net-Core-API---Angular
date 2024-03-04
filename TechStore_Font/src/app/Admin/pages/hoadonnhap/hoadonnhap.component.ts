import { Component } from '@angular/core';
import { IHoaDonNhap } from 'src/app/api/hoadonnhap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HoaDonNhapService } from 'src/app/service/hoadonnhap.service';
import { SanPhamService } from 'src/app/service/sanpham.service';
import { NhaCungcapService } from 'src/app/service/nhacungcap.service';
import { AccountService } from 'src/app/service/account.service';

interface action {
    value: boolean;
    name: string;
}
@Component({
    selector: 'app-hoadonnhap',
    templateUrl: './hoadonnhap.component.html',
    styleUrls: ['./hoadonnhap.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class HoaDonNhapComponent {
    title = "Quản lý sản phẩm"
    hoadonnhap: IHoaDonNhap = {};
    hoadonnhaps!: IHoaDonNhap[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: IHoaDonNhap[] | null;
    Save = "Lưu";
    shouldDisplayImage: boolean = false;
    //select của trạng thái hoạt động

    actions!: action[];
    selectAction!: action;

    //select và hiển ở table của loại 
    sanpham: any[] = [];
    selectedSanPhamId: any;

    //select và hiển ở table của 
    nhacungcap: any[] = [];
    selectedNhaCungCapId: any;

    //Key search
    selectedItem: string;

    orderDetail: any[] = [];

    visible: boolean = false;
    DialogEdit: boolean = false;

    chiTietHoaDons: any[] = [];

    constructor(
        private hoadonnhapService: HoaDonNhapService,
        private sanphamService: SanPhamService,
        private nhacungcapService: NhaCungcapService,
        private accontService: AccountService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {

        this.loadData();

        this.actions = [
            { value: true, name: 'Đã thanh toán' },
            { value: false, name: 'Chưa thanh toán' }
        ]
    }


    //Hiển thị dữ liệu
    loadData() {
        this.sanphamService.getAll().subscribe(data => {
            this.sanpham = data.map(item => ({
                id: item.id,
                name: item.tenSanPham
            }));
        })
        this.nhacungcapService.getAll().subscribe(data => {
            this.nhacungcap = data.map(item => ({
                id: item.id,
                name: item.tenNhaCungCap
            }));
        })

        this.hoadonnhapService.search().subscribe(data => {
            this.hoadonnhaps = data
        })
    };

    //Mở dialog
    openNew() {
        this.hoadonnhap = {};
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }


    //Mở dialog khi sửa
    edit(hoadonnhap: IHoaDonNhap) {
        this.hoadonnhapService.getByIdUD(hoadonnhap.id).subscribe(
            data => {
                this.hoadonnhap = data;
                this.selectAction = this.actions.find(option => option.value == data.trangThaiThanhToan);
                this.selectedNhaCungCapId = this.nhacungcap.find(option => option.name == data.nhaCungCapId);
                this.DialogEdit = true;
                this.Save = "Cập nhập";
            }
        )
    }

    //Đóng dialog sản phẩm
    hidenDialog() {
        this.Dialog = false;
        this.hoadonnhap = {};
        this.submitted = false;
    }

    //Thêm sửa sản phẩm
    save() {

        this.hoadonnhap.nhaCungCapId = this.selectedNhaCungCapId?.id;
        this.hoadonnhap.trangThaiThanhToan = this.selectAction?.value;
        this.hoadonnhap.userId = Number(this.accontService.getUserId());

        this.hoadonnhap.chiTietHoaDonNhaps = [];
        for (let i = 0; i < this.orderDetail.length; i++) {
            const order = this.orderDetail[i];
            const soLuong: number = Number(order.soLuongNhap);
            const giaNhap: number = Number(order.giaNhap);
            const chitiet = {
                sanPhamId: order.selectedSanPhamId.id,
                soLuongNhap: order.soLuongNhap,
                giaNhap: order.giaNhap,
                thanhTien: soLuong * giaNhap
            };
            this.hoadonnhap.chiTietHoaDonNhaps.push(chitiet);
        }
        this.submitted = true;

        this.hoadonnhapService.create(this.hoadonnhap).subscribe({
            next: res => {
                this.loadData();
                this.hidenDialog();
                this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
            },
            error: err => {
                this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
            }
        });
    }

    update() {

        this.hoadonnhap.nhaCungCapId = this.selectedNhaCungCapId.id;
        this.hoadonnhap.trangThaiThanhToan = this.selectAction.value;
        this.hoadonnhapService.update(this.hoadonnhap).subscribe((data) => {
            this.DialogEdit = false
            this.loadData();
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: data.message, life: 3000 });
        })
    }

    //Thông số sản phẩm
    addProductOrder() {
        this.orderDetail.push({
            selectedSanPhamId: "",
            soLuongNhap: "",
            giaNhap: ""
        });
    }
    removeProductOrder(index: number) {
        this.orderDetail.splice(index, 1);
    }

    showDialog() {
        this.visible = true;
    }

    InHoaDon(hoadonnhap: IHoaDonNhap) {
        this.hoadonnhapService.getById(hoadonnhap.id).subscribe(
            data => {
                this.hoadonnhap = data;
                this.chiTietHoaDons = data.chiTietHoaDon
                this.showDialog()
            }
        )
    }

    printFunction() {
        window.print();
    }

}
