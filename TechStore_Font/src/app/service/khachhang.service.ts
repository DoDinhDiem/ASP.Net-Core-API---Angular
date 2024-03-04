import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'KhachHang/GetAll_KhachHang')
  }
  create(KhachHang: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'KhachHang/Create_KhachHang', KhachHang)
  }
  update(KhachHang: any) {
    return this.http.put<any>(baseUrl + 'KhachHang/Update_KhachHang', KhachHang)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `KhachHang/Update_KhachHang_TrangThai/${id}`, null)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'KhachHang/GetById_KhachHang/' + id)
  }
  search(Keywork: string, Email: string, DiaChi: string): Observable<any[]> {
    const params = `Keywork=${Keywork}&Email=${Email}&DiaChi=${DiaChi}`;
    return this.http.get<any[]>(baseUrl + `KhachHang/Search_KhachHang?${params}`);
  }
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(baseUrl + 'KhachHang/upload', formData);
  }
}
