import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ThongsoService {
  constructor(private http: HttpClient) { }
  getAll(id: any): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'ThongSo/GetAll_ThongSo/' + id)
  }
  create(ThongSo: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'ThongSo/Create_ThongSo', ThongSo)
  }
  update(ThongSo: any) {
    return this.http.put<any>(baseUrl + 'ThongSo/Update_ThongSo', ThongSo)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `ThongSo/Update_ThongSo_TrangThai/${id}`, null)
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'ThongSo/Delete_ThongSo/' + id)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'ThongSo/GetById_ThongSo/' + id)
  }
  deleteMany(listId: number[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: listId
    };
    return this.http.delete<any>(baseUrl + 'ThongSo/DeleteMany_ThongSo', httpOptions);
  }
}
