import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class DanhMucTinTucService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'DanhMucTinTuc/GetAll_DanhMucTinTuc')
  }
  create(DanhMucTinTuc: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'DanhMucTinTuc/Create_DanhMucTinTuc', DanhMucTinTuc)
  }
  update(DanhMucTinTuc: any) {
    return this.http.put<any>(baseUrl + 'DanhMucTinTuc/Update_DanhMucTinTuc', DanhMucTinTuc)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `DanhMucTinTuc/Update_DanhMucTinTuc_TrangThai/${id}`, null)
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'DanhMucTinTuc/Delete_DanhMucTinTuc/' + id)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'DanhMucTinTuc/GetById_DanhMucTinTuc/' + id)
  }
  deleteMany(listId: number[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: listId
    };
    return this.http.delete<any>(baseUrl + 'DanhMucTinTuc/DeleteMany_DanhMucTinTuc', httpOptions);
  }

  search(Keywork: string): Observable<any[]> {
    const params = `Keywork=${Keywork}`;
    return this.http.get<any[]>(baseUrl + `DanhMucTinTuc/Search_DanhMucTinTuc?${params}`);
  }
}
