import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class BinhLuanSanPhamService {

  constructor(private http: HttpClient) { }

  getAll(id: number): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'BinhLuanSanPham/GetAll_BinhLuanSanPham/' + id)
  }

  create(BinhLuanSanPham: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'BinhLuanSanPham/Create_BinhLuanSanPham', BinhLuanSanPham)
  }

  update(BinhLuanSanPham: any) {
    return this.http.put<any>(baseUrl + 'BinhLuanSanPham/Update_BinhLuanSanPham', BinhLuanSanPham)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `BinhLuanSanPham/Update_BinhLuanSanPham_TrangThai/${id}`, null)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'BinhLuanSanPham/Delete_BinhLuanSanPham/' + id)
  }

  getById(id: any, userId: any): Observable<any> {
    return this.http.get<any>(baseUrl + `BinhLuanSanPham/GetById_BinhLuanSanPham/${id}/${userId}`)
  }

}
