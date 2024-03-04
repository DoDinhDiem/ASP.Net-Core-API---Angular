import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from '../menu/app.menu.component';
import { AppMenuitemComponent } from '../menu/app.menuitem.component';
import { AppTopBarComponent } from '../topbar/app.topbar.component';
import { AppFooterComponent } from '../footer/app.footer.component';
import { AppConfigModule } from '../config/config.module';
import { AppSidebarComponent } from "../sidebar/app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LoaiComponent } from 'src/app/Admin/pages/loai/loai.component';
import { HangComponent } from 'src/app/Admin/pages/hang/hang.component';
import { SanphamComponent } from 'src/app/Admin/pages/sanpham/sanpham.component';
import { ChucvuComponent } from 'src/app/Admin/pages/chucvu/chucvu.component';
import { NhansuComponent } from 'src/app/Admin/pages/nhansu/nhansu.component';
import { KhachhangComponent } from 'src/app/Admin/pages/khachhang/khachhang.component';
import { DanhmuctintucComponent } from 'src/app/Admin/pages/danhmuctintuc/danhmuctintuc.component';
import { TinTucComponent } from 'src/app/Admin/pages/tintuc/tintuc.component';
import { LoginComponent } from 'src/app/Admin/pages/login/login.component';
import { HoaDonNhapComponent } from 'src/app/Admin/pages/hoadonnhap/hoadonnhap.component';
import { NhaCungCapComponent } from 'src/app/Admin/pages/nhacungcap/nhacungcap.component';
import { SlideComponent } from '../../pages/slide/slide.component';
import { HoaDonBanComponent } from '../../pages/hoadonban/hoadonban.component';

//module
import { LoaiModule } from 'src/app/Admin/pages/loai/loai.module';
import { HangModule } from 'src/app/Admin/pages/hang/hang.module';
import { SanphamModule } from 'src/app/Admin/pages/sanpham/sanpham.module';
import { ChucvuModule } from 'src/app/Admin/pages/chucvu/chucvu.module';
import { NhansuModule } from 'src/app/Admin/pages/nhansu/nhansu.module';
import { KhachhangModule } from 'src/app/Admin/pages/khachhang/khachhang.module';
import { DanhmuctintucModule } from 'src/app/Admin/pages/danhmuctintuc/danhmuctintuc.module';
import { TinTucModule } from 'src/app/Admin/pages/tintuc/tintuc.module';
import { LoginModule } from 'src/app/Admin/pages/login/login.module';
import { HoadonnhapModule } from 'src/app/Admin/pages/hoadonnhap/hoadonnhap.module';
import { NhacungcapModule } from 'src/app/Admin/pages/nhacungcap/nhacungcap.module';
import { SlideModule } from '../../pages/slide/slide.module';
import { HoaDonBanModule } from '../../pages/hoadonban/hoadonban.module';
import { DashboardsRoutingModule } from '../../pages/dashboard/dashboard-routing.module';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,

        LoaiComponent,
        HangComponent,
        SanphamComponent,
        ChucvuComponent,
        NhansuComponent,
        KhachhangComponent,
        DanhmuctintucComponent,
        TinTucComponent,
        LoginComponent,
        HoaDonNhapComponent,
        NhaCungCapComponent,
        SlideComponent,
        HoaDonBanComponent,

    ],
    imports: [
        //Module
        LoaiModule,
        HangModule,
        SanphamModule,
        ChucvuModule,
        NhansuModule,
        KhachhangModule,
        DanhmuctintucModule,
        TinTucModule,
        LoginModule,
        HoadonnhapModule,
        NhacungcapModule,
        SlideModule,
        HoaDonBanModule,
        DashboardsRoutingModule,

        //PrimeNG
        BrowserModule,
        AvatarModule,
        AvatarGroupModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RippleModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BadgeModule,
        BreadcrumbModule,
        BlockUIModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        ChipModule,
        ColorPickerModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ContextMenuModule,
        VirtualScrollerModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DockModule,
        DragDropModule,
        DropdownModule,
        DynamicDialogModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        InputNumberModule,
        ImageModule,
        KnobModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrganizationChartModule,
        OrderListModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressSpinnerModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        SelectButtonModule,
        SidebarModule,
        ScrollerModule,
        ScrollPanelModule,
        ScrollTopModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SpeedDialModule,
        SpinnerModule,
        SplitterModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TriStateCheckboxModule,
        TreeModule,
        TreeSelectModule,
        TreeTableModule,
        AnimateModule,
        CardModule,
        RouterModule,
        AppConfigModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
