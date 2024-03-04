import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Http/baseUrl';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) {
    }

    countSanPham(): Observable<any> {
        return this.http.get<any>(baseUrl + 'Dashboard/CountSanPham')
    }

    countDonHang(): Observable<any> {
        return this.http.get<any>(baseUrl + 'Dashboard/CountDonHang')
    }

    countKhachHang(): Observable<any> {
        return this.http.get<any>(baseUrl + 'Dashboard/CountKhachHang')
    }

    countTinTuc(): Observable<any> {
        return this.http.get<any>(baseUrl + 'Dashboard/CountTinTuc')
    }

    //Thống kê năm
    getStatisticalHDBYear(year: number): Observable<any> {
        return this.http.get<any>(baseUrl + 'Dashboard/ThongKeNamHDB/' + year)
    }

    getStatisticalHDXYear(year: number): Observable<any> {
        return this.http.get<any>(baseUrl + 'Dashboard/ThongKeNamHDX/' + year)
    }

    //Thống kê ngày
    getStatisticalHDBDay(year: number, moth: number, day: number): Observable<any> {
        return this.http.get<any>(baseUrl + `Dashboard/ThongKeNgayHDB/${year}/${moth}/${day}`)
    }

    getStatisticalHDXDay(year: number, moth: number, day: number): Observable<any> {
        return this.http.get<any>(baseUrl + `Dashboard/ThongKeNgayHDX/${year}/${moth}/${day}`)
    }

    //Thống kê tháng
    getStatisticalHDBMoth(year: number): Observable<any> {
        return this.http.get<any>(baseUrl + `Dashboard/ThongKeTheoThang/${year}`)
    }

    getStatisticalHDXMoth(year: number): Observable<any> {
        return this.http.get<any>(baseUrl + `Dashboard/ThongKeTheoThangHDX/${year}`)
    }
}
