import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { AccountService } from 'src/app/service/account.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    role = this.accountService.getRole()

    constructor(public layoutService: LayoutService,
        private accountService: AccountService) { }

    ngOnInit() {

        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }
                ]
            },

            {
                label: 'Sản phẩm',
                items: [
                    { label: 'Slide', icon: 'pi pi-fw pi-images', routerLink: ['/admin/slide'] },
                    { label: 'Loại sản phẩm', icon: 'pi pi-fw pi-list', routerLink: ['/admin/loai'] },
                    { label: 'Hãng sản phẩm', icon: 'pi pi-fw pi-list', routerLink: ['/admin/hang'] },
                    { label: 'Nhà cung cấp', icon: 'pi pi-fw pi-truck', routerLink: ['/admin/nhacungcap'] },
                    { label: 'Sản phẩm', icon: 'pi pi-fw pi-list', routerLink: ['/admin/sanpham'] },
                ]
            },

            {
                label: 'Bài viết',
                items: [
                    { label: 'Danh mục tin tức', icon: 'pi pi-fw pi-th-large', routerLink: ['/admin/danhmuc'] },
                    { label: 'Tin tức', icon: 'pi pi-fw pi-globe', routerLink: ['/admin/tintuc'] },
                ]
            },

            {
                label: 'Hóa đơn',
                items: [
                    { label: 'Hóa đơn nhập', icon: 'pi pi-fw pi-credit-card', routerLink: ['/admin/hoadonnhap'] },
                    { label: 'Hóa đơn bán', icon: 'pi pi-fw pi-credit-card', routerLink: ['/admin/hoadonban'] },
                ]
            },

            {
                label: 'Phân loại',
                items: [
                    { label: 'Chức vụ', icon: 'pi pi-fw pi-list', routerLink: ['/admin/chucvu'] },
                ]
            },
            // {
            //     label: 'Con người',
            //     items: [
            //         { label: 'Nhân viên', icon: 'pi pi-fw pi-users', routerLink: ['/admin/nhanvien'] },
            //         { label: 'Khách hàng', icon: 'pi pi-fw pi-users', routerLink: ['/admin/khachhang'] },

            //     ]
            // },

        ];
        if (this.role == "Admin") {
            const conNguoiMenu = {
                label: 'Con người',
                items: [
                    { label: 'Nhân viên', icon: 'pi pi-fw pi-users', routerLink: ['/admin/nhanvien'] },
                    { label: 'Khách hàng', icon: 'pi pi-fw pi-users', routerLink: ['/admin/khachhang'] },
                ]
            };
            this.model.push(conNguoiMenu);
        }

    }
}
