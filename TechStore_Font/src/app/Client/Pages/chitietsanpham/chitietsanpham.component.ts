import { Component, ElementRef, OnDestroy } from '@angular/core';
import { ISanPham } from 'src/app/api/sanpham';
import { IAnh } from 'src/app/api/anhSanPham';
import { IThongSo } from 'src/app/api/thongso';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';
import { IBinhLuanSanPham } from 'src/app/api/binhluansanpham';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BinhLuanSanPhamService } from 'src/app/service/binhluansanpham.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
    selector: 'app-chitietsanpham',
    templateUrl: './chitietsanpham.component.html',
    styleUrls: ['./chitietsanpham.component.scss'],
    providers: [MessageService]
})
export class ChiTietSanPhamComponent implements OnDestroy {
    sanpham: ISanPham = {};
    sanphams!: ISanPham[];
    anhsanphams!: IAnh[];
    thongsos!: IThongSo[];

    sanphamtts: ISanPham[] = [];

    currentIndex: number = 0;
    interval: any;

    id!: number;

    comentProduct: IBinhLuanSanPham = {};
    comentProducts!: IBinhLuanSanPham[];

    maxCharacters = 3500;
    displayedContent: string;
    showMoreLessButton = false;
    isContentExpanded = false;

    currentIndexProduct: number = 0;
    intervalId: any;

    idClient = this.accountService.getUserIdClient();

    p: number = 1;

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']; // Chuyển đổi id sang kiểu số nếu cần thiết
            this.loadAnh(this.id);
            this.loadThongSo(this.id);
            this.loadChiTiet(this.id);
            this.getAllCommet(this.id);
            this.startAutoNext()
            this.canActivate();
        });
    }

    constructor(
        private clientService: ClientService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private binhluanService: BinhLuanSanPhamService,
        private messageService: MessageService,
        private accountService: AccountService,
        private jwtHelper: JwtHelperService) { }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadAnh(id: number) {
        this.clientService.getAnhSanPham(id).subscribe((data) => {
            this.anhsanphams = data;
        })
    }

    loadThongSo(id: number) {
        this.clientService.getThongSo(id).subscribe((data) => {
            this.thongsos = data
        })
    }

    loadChiTiet(id: number) {
        this.clientService.getChiTiet(id).subscribe(data => {
            this.sanpham = data;
            const loaiId = data.loaiId
            this.updateDisplayedContent();
            this.loadSanPhamTT(data.loaiId, id)
        })
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.anhsanphams.length) % this.anhsanphams.length;
        this.updateSlider();

    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.anhsanphams.length;
        this.updateSlider();
    }

    updateSlider() {
        const container = document.querySelector('.img-small-container') as HTMLElement;
        if (container) {
            const offset = this.currentIndex * (container.clientWidth / 5);
            container.style.transform = `translateX(-${offset}px)`;
        }
    }

    updateDisplayedContent() {
        const content = this.sanpham.moTa || '';
        if (content.length > this.maxCharacters) {
            this.displayedContent = content.slice(0, this.maxCharacters) + '...';
            this.showMoreLessButton = true;
        } else {
            this.displayedContent = content;
            this.showMoreLessButton = false;
        }
    }

    toggleContent() {
        this.isContentExpanded = !this.isContentExpanded;

        if (this.isContentExpanded) {
            this.displayedContent = this.sanpham.moTa;
        } else {
            this.displayedContent = this.sanpham.moTa.slice(0, this.maxCharacters);
        }
    }

    loadSanPhamTT(id: number, id1: number) {
        this.clientService.getSanPhamTuongTu(id, id1).subscribe((data) => {
            this.sanphamtts = data
        })
    }

    get visibleProducts(): ISanPham[] {
        if (this.sanphamtts) {
            const startIndex = this.currentIndexProduct;
            const endIndex = startIndex + 5;
            return this.sanphamtts.slice(startIndex, endIndex);
        } else {
            return [];
        }
    }

    onNextClickProduct() {
        if (this.currentIndexProduct + 5 < this.sanphamtts.length) {
            this.currentIndexProduct += 1;
        }
        else {
            this.currentIndexProduct = 0;
        }
    }

    // Hàm xử lý khi ấn prev
    onPrevClickProduct() {
        if (this.currentIndexProduct - 5 >= 0) {
            this.currentIndexProduct -= 5;
        }

    }

    startAutoNext() {
        this.intervalId = setInterval(() => {
            this.onNextClickProduct();
        }, 3000);
    }

    getAllCommet(id: number) {
        this.binhluanService.getAll(id).subscribe((data) => {
            this.comentProducts = data
        })
    }

    save() {
        this.comentProduct.userId = Number(this.idClient);
        this.comentProduct.sanPhamId = this.id

        if (this.idClient) {
            if (this.comentProduct.id) {
                this.binhluanService.update(this.comentProduct).subscribe({
                    next: res => {
                        this.comentProduct = {};
                        this.getAllCommet(this.id);
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
            else {
                this.binhluanService.create(this.comentProduct).subscribe({
                    next: res => {
                        this.comentProduct = {};
                        this.getAllCommet(this.id);
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Hãy đăng nhập để tiếp tục', life: 3000 });
        }

    }

    canActivate() {
        const token = localStorage.getItem('tokenClient');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const userId = decodedToken?.UserId;
            this.accountService.setUserIdClient(userId);
            this.idClient = this.accountService.getUserIdClient()
        }
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: "Thêm vào giỏ hàng thành công", life: 1000 });
    }
}
