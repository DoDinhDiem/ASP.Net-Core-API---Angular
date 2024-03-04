import { Component } from '@angular/core';
import { ISanPham } from 'src/app/api/sanpham';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';
import { IHang } from 'src/app/api/hang';
import { ILoai } from 'src/app/api/loai';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/service/cart.service';

@Component({
    selector: 'app-loaisanpham',
    templateUrl: './loaisanpham.component.html',
    styleUrls: ['./loaisanpham.component.scss'],
    providers: [MessageService]
})
export class LoaiSanPhamComponent {
    sanphams!: ISanPham[];

    hangSanPhams!: IHang[];

    loais!: ILoai[];
    name!: string;

    id!: number;

    p: number = 1;

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']; // Chuyển đổi id sang kiểu số nếu cần thiết
            this.loadSanPham(this.id);
            this.loadHang(this.id);
            this.loadNameLoai(this.id);
            this.loadLoai();
        });
    }

    constructor(
        private clientService: ClientService,
        private messageService: MessageService,
        private cartService: CartService,
        private route: ActivatedRoute) { }

    loadSanPham(id: number) {
        this.clientService.getSanPhamByLoaiId(id).subscribe(data => {
            this.sanphams = data

        })
    }

    loadHang(id: number) {
        this.clientService.getSanPhamByHangId(id).subscribe(data => {
            this.hangSanPhams = data

        })
    }

    loadNameLoai(id: number) {
        this.clientService.getNameLoai(id).subscribe((data) => {
            this.name = data.name
        })
    }

    loadLoai() {
        this.clientService.getLoai().subscribe(data => {
            this.loais = data
        })
    }
    addToCart(product: any) {
        this.cartService.addToCart(product);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: "Thêm vào giỏ hàng thành công", life: 1000 });
    }
}
