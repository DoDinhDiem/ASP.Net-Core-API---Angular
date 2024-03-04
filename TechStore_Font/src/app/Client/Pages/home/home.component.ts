import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ISanPham } from 'src/app/api/sanpham';
import { CartService } from 'src/app/service/cart.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MessageService]
})
export class HomeComponent {
    cartItems: any[] = [];
    sanphamNew!: ISanPham;
    sanphamNews!: ISanPham[];

    sanphamKM!: ISanPham;
    sanphamKMs!: ISanPham[];

    sanphamBC!: ISanPham;
    sanphamBCs!: ISanPham[];

    dienThoais!: any[];

    lapTops!: any[]

    congNghes!: any[];

    khamPhas!: any[];

    tGames!: any[];

    images!: any[];

    currentIndex: number = 0;
    interval: any;

    product: any;

    quantity = 0;

    constructor(
        private clientService: ClientService,
        private cartService: CartService,
        private messageService: MessageService,) { }

    ngOnInit() {
        this.startSlideshow();
        this.loadSanPhamMoi();
        this.loadSanPhamKhuyenMai();
        this.loadSanPhamBanChay();
        this.loadSlide();
        this.loadDienThoai();
        this.loadLapTop();
        this.loadCongNghe();
        this.loadKhamPha();
        this.loadTGames();
    }


    startSlideshow() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 7000);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    loadSanPhamMoi() {
        this.clientService.getSanPhamMoi().subscribe((data) => {
            this.sanphamNews = data
        })
    }

    loadSanPhamKhuyenMai() {
        this.clientService.getSanPhamKhuyenMai().subscribe((data) => {
            this.sanphamKMs = data
        })
    }

    loadSanPhamBanChay() {
        this.clientService.getSanPhamBanChay().subscribe((data) => {
            this.sanphamBCs = data
        })
    }

    loadSlide() {
        this.clientService.getSlide().subscribe((data) => {
            this.images = data
        })
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: "Thêm vào giỏ hàng thành công", life: 1000 });
    }

    loadDienThoai() {
        this.clientService.getDienThoai().subscribe((data) => {
            this.dienThoais = data
        })
    }

    loadLapTop() {
        this.clientService.getLapTop().subscribe((data) => {
            this.lapTops = data
        })
    }

    loadCongNghe() {
        this.clientService.getCongNghe().subscribe((data) => {
            this.congNghes = data
        })
    }

    loadKhamPha() {
        this.clientService.getKhamPha().subscribe((data) => {
            this.khamPhas = data
        })
    }

    loadTGames() {
        this.clientService.getTGames().subscribe((data) => {
            this.tGames = data
        })
    }
}
