import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Http/baseUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientService {


    constructor(private http: HttpClient) { }

    getSanPhamMoi(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/SanPhamMoi')
    }

    getSanPhamKhuyenMai(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/SanPhamKhuyenMai')
    }

    getSanPhamBanChay(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/SanPhamBanChay')
    }

    getChiTiet(id: number): Observable<any> {
        return this.http.get<any>(baseUrl + 'Client/ChiTietSanPham/' + id)
    }

    getAnhSanPham(id: number): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/AnhSanPham/' + id)
    }

    getThongSo(id: number): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/ThongSo/' + id)
    }

    getLoai(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/LoaiSanPham')
    }

    getSanPhamTuongTu(id: number, id1: number): Observable<any[]> {
        const params = `${id}/${id1}`
        return this.http.get<any[]>(baseUrl + 'Client/SanPhamTuongTu/' + params)
    }

    getSanPhamByLoaiId(id: number): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/SanPhamTheoLoai/' + id)
    }

    getSanPhamByHangId(id: number): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/LayHangSanPham/' + id)
    }

    getSlide(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/GetAll_Slide/')
    }

    getDienThoai(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/LayDienThoai')
    }

    getLapTop(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/LayLapTop')
    }

    //Tin tức
    getDanhMucTinTuc(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/DanhMucTinTuc')
    }

    getTinTucByDanhMucId(id: number): Observable<any> {
        return this.http.get<any>(baseUrl + 'Client/TinTuc/' + id)
    }

    getChiTietTinTuc(id: number): Observable<any> {
        return this.http.get<any>(baseUrl + 'Client/ChiTietTinTuc/' + id)
    }

    getCongNghe(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/TinTucCongNghe')
    }

    getKhamPha(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/KhamPha')
    }

    getTGames(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Client/TGames')
    }

    //Lấy tên
    getNameLoai(id: number): Observable<any> {
        return this.http.get<any>(baseUrl + 'Client/LayTenLoai/' + id)
    }

    getNameTinTuc(id: number): Observable<any> {
        return this.http.get<any>(baseUrl + 'Client/LayTenTinTuc/' + id)
    }
}
