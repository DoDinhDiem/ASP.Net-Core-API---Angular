import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './Admin/layout/layout/app.layout.component';
import { AuthGuard } from './Guard/auth.guard';
import { LayoutComponent } from './Client/Layout/layout/layout.component';
import { AuthClientGuard } from './Guard/authClient.guard';

const routes: Routes = [
    {
        path: 'admin',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./Admin/pages/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'loai',
                loadChildren: () =>
                    import('./Admin/pages/loai/loai.module').then(
                        (m) => m.LoaiModule
                    ),
            },
            {
                path: 'hang',
                loadChildren: () =>
                    import('./Admin/pages/hang/hang.module').then(
                        (m) => m.HangModule
                    ),
            },
            {
                path: 'sanpham',
                loadChildren: () =>
                    import('./Admin/pages/sanpham/sanpham.module').then(
                        (m) => m.SanphamModule
                    ),
            },
            {
                path: 'chucvu',
                loadChildren: () =>
                    import('./Admin/pages/chucvu/chucvu.module').then(
                        (m) => m.ChucvuModule
                    ),
            },
            {
                path: 'nhanvien',
                loadChildren: () =>
                    import('./Admin/pages/nhansu/nhansu.module').then(
                        (m) => m.NhansuModule
                    ),
                canActivate: [AuthGuard],
                data: { requiredRole: 'Admin' },
            },
            {
                path: 'khachhang',
                loadChildren: () =>
                    import('./Admin/pages/khachhang/khachhang.module').then(
                        (m) => m.KhachhangModule
                    ),
                canActivate: [AuthGuard],
                data: { requiredRole: 'Admin' },
            },
            {
                path: 'danhmuc',
                loadChildren: () =>
                    import(
                        './Admin/pages/danhmuctintuc/danhmuctintuc.module'
                    ).then((m) => m.DanhmuctintucModule),
            },
            {
                path: 'tintuc',
                loadChildren: () =>
                    import('./Admin/pages/tintuc/tintuc.module').then(
                        (m) => m.TinTucModule
                    ),
            },
            {
                path: 'hoadonnhap',
                loadChildren: () =>
                    import('./Admin/pages/hoadonnhap/hoadonnhap.module').then(
                        (m) => m.HoadonnhapModule
                    ),
            },
            {
                path: 'hoadonban',
                loadChildren: () =>
                    import('./Admin/pages/hoadonban/hoadonban.module').then(
                        (m) => m.HoaDonBanModule
                    ),
            },
            {
                path: 'nhacungcap',
                loadChildren: () =>
                    import('./Admin/pages/nhacungcap/nhacungcap.module').then(
                        (m) => m.NhacungcapModule
                    ),
            },
            {
                path: 'slide',
                loadChildren: () =>
                    import('./Admin/pages/slide/slide.module').then(
                        (m) => m.SlideModule
                    ),
            },
        ],
        // , canActivate: [AuthGuard], data: { 'Nhân viên': 'Nhân viên' },
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./Admin/pages/login/login.module').then(
                (m) => m.LoginModule
            ),
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./Client/Pages/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
            {
                path: 'loaisp/:id',
                loadChildren: () =>
                    import(
                        './Client/Pages/loaisanpham/loaisanpham.module'
                    ).then((m) => m.LoaiSanPhamModule),
            },
            {
                path: 'chitiet/:id',
                loadChildren: () =>
                    import(
                        './Client/Pages/chitietsanpham/chitietsanpham.module'
                    ).then((m) => m.ChiTietSanPhamModule),
            },
            {
                path: 'cart',
                loadChildren: () =>
                    import('./Client/Pages/cart/cart.module').then(
                        (m) => m.CartModule
                    ),
            },
            {
                path: 'cart',
                loadChildren: () =>
                    import('./Client/Pages/cart/cart.module').then(
                        (m) => m.CartModule
                    ),
            },
            {
                path: 'payment',
                loadChildren: () =>
                    import('./Client/Pages/payment/payment.module').then(
                        (m) => m.PaymentModule
                    ),
                canActivate: [AuthClientGuard],
            },
            {
                path: 'catalog-news/:id',
                loadChildren: () =>
                    import('./Client/Pages/tintuc/tintuc.module').then(
                        (m) => m.TinTucModule
                    ),
            },
            {
                path: 'detail-news/:id',
                loadChildren: () =>
                    import(
                        './Client/Pages/chitiettintuc/chitiettintuc.module'
                    ).then((m) => m.ChiTietTinTucModule),
            },
        ],
    },
    {
        path: 'loginClient',
        loadChildren: () =>
            import('./Client/Pages/Authen/login/login.module').then(
                (m) => m.LoginModule
            ),
    },
    {
        path: 'register',
        loadChildren: () =>
            import('./Client/Pages/Authen/register/register.module').then(
                (m) => m.RegisterModule
            ),
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
