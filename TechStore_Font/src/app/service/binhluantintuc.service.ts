import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class BinhLuanTinTucService {

  constructor(private http: HttpClient) { }

  getAll(id: number): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'BinhLuanTinTuc/GetAll_BinhLuanTinTuc/' + id)
  }

  create(BinhLuanTinTuc: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'BinhLuanTinTuc/Create_BinhLuanTinTuc', BinhLuanTinTuc)
  }

  update(BinhLuanTinTuc: any) {
    return this.http.put<any>(baseUrl + 'BinhLuanTinTuc/Update_BinhLuanTinTuc', BinhLuanTinTuc)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `BinhLuanTinTuc/Update_BinhLuanTinTuc_TrangThai/${id}`, null)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'BinhLuanTinTuc/Delete_BinhLuanTinTuc/' + id)
  }

  getById(id: any, userId: any): Observable<any> {
    return this.http.get<any>(baseUrl + `BinhLuanTinTuc/GetById_BinhLuanTinTuc/${id}/${userId}`)
  }
}
