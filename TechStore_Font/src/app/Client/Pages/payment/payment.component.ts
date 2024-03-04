import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IHoaDonBan } from 'src/app/api/hoadonban';
import { IKhachHang } from 'src/app/api/khachhang';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { HoaDonBanService } from 'src/app/service/hoadonban.service';
import { KhachhangService } from 'src/app/service/khachhang.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    providers: [MessageService],
})
export class PaymentComponent {
    cartItems: any[] = [];
    quantity = 0;
    totalPrice: number = 0;
    price: number = 0;

    khachhang: IKhachHang = {};

    hoadonban: IHoaDonBan = {};

    isShipBoxChecked: boolean = false;

    idClient = this.accountService.getUserIdClient();

    constructor(
        private cartService: CartService,
        private accountService: AccountService,
        private khachhangService: KhachhangService,
        private hoadonbanService: HoaDonBanService,
        private messageService: MessageService
    ) {}
    ngOnInit() {
        this.cartService.loadCart();
        this.cartService.products$.subscribe((products) => {
            this.getQuantity();
            this.calculateTotalPrice();
        });
        this.cartItems = this.cartService.getProduct();
        this.loadClient();
    }

    getQuantity() {
        this.quantity = this.cartService.getQuantity();
    }
    calculateTotalPrice() {
        this.totalPrice = this.cartService.getTotalPrice();
    }
    removeFromCart(product: any) {
        this.cartService.removeProduct(product);
        this.cartItems = this.cartService.getProduct();
        this.getQuantity();
        this.calculateTotalPrice();
    }

    incrementQuantity(cart: any) {
        this.cartService.incrementQuantity(cart);
    }

    decrementQuantity(cart: any) {
        this.cartService.decrementQuantity(cart);
    }

    calculateSubtotal(cart: any): number {
        const discountedPrice = cart.giaBan - cart.khuyenMai;
        return discountedPrice * cart.soLuong;
    }
    giaBan(cart: any): number {
        const discountedPrice = cart.giaBan - cart.khuyenMai;
        return discountedPrice;
    }

    loadClient() {
        this.khachhangService.getById(this.idClient).subscribe((data) => {
            this.khachhang = data;
        });
    }

    GetByIdClient(email: string) {}

    onsSubmit() {
        this.hoadonban.tongTien = this.totalPrice;
        this.hoadonban.chiTietHoaDonBans = [];
        this.hoadonban.userId = Number(this.idClient);

        this.hoadonban.trangThai = 'Đơn hàng mới';
        this.hoadonban.trangThaiThanhToan = false;

        for (let i = 0; i < this.cartItems.length; i++) {
            const order = this.cartItems[i];
            const soLuong: number = Number(order.soLuongNhap);
            const giaNhap: number = Number(order.giaNhap);
            const chitiet = {
                sanPhamId: order.id,
                soLuong: order.soLuong,
                giaBan: Number(this.giaBan(order)),
                thanhTien: Number(this.calculateSubtotal(order)),
            };
            this.hoadonban.chiTietHoaDonBans.push(chitiet);
        }
        if (this.isShipBoxChecked === false) {
            this.hoadonban.hoTen =
                this.khachhang.firstName + ' ' + this.khachhang.lastName;
            this.hoadonban.soDienThoai = this.khachhang.soDienThoai;
            this.hoadonban.email = this.khachhang.email;
            this.hoadonban.diaChi = this.khachhang.diaChi;
        }

        this.hoadonbanService.create(this.hoadonban).subscribe({
            next: (res) => {
                this.khachhangService.update(this.khachhang).subscribe();
                this.cartService.clearProducts();
                this.cartService.loadCart();
                this.cartItems = [];
                this.totalPrice = 0;
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
