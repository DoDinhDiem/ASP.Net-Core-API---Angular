import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/Admin/layout/service/app.layout.service';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    barData: any;
    barDataDay: any;
    barDataYear: any;

    chartOptions: any;
    barOptions: any;

    subscription!: Subscription;

    donHang!: number;
    sanPham!: number;
    khachHang!: number;
    tinTuc!: number;



    //Tiền năm
    YearDate = new Date().getFullYear();
    totalYearHDB: number = 0;
    totalYearHDX: number = 0;

    //Tiền tháng
    MothDate = new Date().getFullYear();
    totalMothHDB: any[] = [];
    totalMothHDX: any[] = [];

    //Tiền ngày
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth() + 1;
    currentDay = new Date().getDate();
    totalDayHDB: number = 0;
    totalDayHDX: number = 0;




    constructor(
        public layoutService: LayoutService,
        private dashboardService: DashboardService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts();
        });
    }
    ngOnInit() {

        this.countSanPham();
        this.countDonHang();
        this.countTinTuc();
        this.countKhachHang();

        this.loadHoaDonNam(this.YearDate);
        this.loadHoaDonThang(this.MothDate);
        this.loadHoaDonNgay(this.currentYear, this.currentMonth, this.currentDay);
        this.initCharts();
    }

    countSanPham() {
        this.dashboardService.countSanPham().subscribe((data) => {
            this.sanPham = data
        })
    }

    countKhachHang() {
        this.dashboardService.countKhachHang().subscribe((data) => {
            this.khachHang = data
        })
    }

    countTinTuc() {
        this.dashboardService.countTinTuc().subscribe((data) => {
            this.tinTuc = data
        })
    }

    countDonHang() {
        this.dashboardService.countDonHang().subscribe((data) => {
            this.donHang = data
        })
    }

    initCharts() {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadHoaDonNam(YearDate: any) {
        const documentStyle = getComputedStyle(document.documentElement);

        this.dashboardService.getStatisticalHDBYear(YearDate).subscribe((dataHDB) => {
            this.totalYearHDB = dataHDB;

            this.dashboardService.getStatisticalHDXYear(YearDate).subscribe((dataHDX) => {
                this.totalYearHDX = dataHDX;

                this.barDataYear = {
                    labels: [this.YearDate],
                    datasets: [
                        {
                            label: 'Chi',
                            backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                            borderColor: documentStyle.getPropertyValue('--primary-500'),
                            data: [this.totalYearHDX]
                        },
                        {
                            label: 'Thu',
                            backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                            borderColor: documentStyle.getPropertyValue('--primary-200'),
                            data: [this.totalYearHDB]
                        }
                    ]
                };
            });
        });
    }

    loadHoaDonThang(MothDate: any) {
        const documentStyle = getComputedStyle(document.documentElement);

        this.dashboardService.getStatisticalHDBMoth(MothDate).subscribe((dataHDB) => {
            this.totalMothHDB = dataHDB;

            this.dashboardService.getStatisticalHDXMoth(MothDate).subscribe((dataHDX) => {
                this.totalMothHDX = dataHDX;

                this.barData = {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                    datasets: [
                        {
                            label: 'Chi',
                            backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                            borderColor: documentStyle.getPropertyValue('--primary-500'),
                            data: this.totalMothHDX.map(item => item.tongTien)
                        },
                        {
                            label: 'Thu',
                            backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                            borderColor: documentStyle.getPropertyValue('--primary-200'),
                            data: this.totalMothHDB.map(item => item.tongTien)
                        }
                    ]
                };
            });
        });
    }

    //Ngày
    loadHoaDonNgay(currentYear: any, currentMonth: any, currentDay: any) {
        const documentStyle = getComputedStyle(document.documentElement);

        this.dashboardService.getStatisticalHDBDay(currentYear, currentMonth, currentDay).subscribe((dataHDB) => {
            this.totalDayHDB = dataHDB;

            this.dashboardService.getStatisticalHDXDay(currentYear, currentMonth, currentDay).subscribe((dataHDX) => {
                this.totalDayHDX = dataHDX;

                this.barDataDay = {
                    labels: [this.currentDay + '/' + this.currentMonth + '/' + this.currentYear],
                    datasets: [
                        {
                            label: 'Chi',
                            backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                            borderColor: documentStyle.getPropertyValue('--primary-500'),
                            data: [this.totalDayHDX]
                        },
                        {
                            label: 'Thu',
                            backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                            borderColor: documentStyle.getPropertyValue('--primary-200'),
                            data: [this.totalDayHDB]
                        }
                    ]
                };
            });
        });
    }

    onMothDateChange() {
        this.loadHoaDonThang(this.MothDate);
    }
    onYearDateChange() {
        this.loadHoaDonNam(this.YearDate)
    }
    onNgayChange() {
        this.loadHoaDonNgay(this.currentYear, this.currentMonth, this.currentDay);
    }
}
