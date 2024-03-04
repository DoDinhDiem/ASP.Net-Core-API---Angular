import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class HangService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'HangSanXuat/GetAll_Hang')
  }
  create(Hang: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'HangSanXuat/Create_Hang', Hang)
  }
  update(Hang: any) {
    return this.http.put<any>(baseUrl + 'HangSanXuat/Update_Hang', Hang)
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'HangSanXuat/Delete_Hang/' + id)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'HangSanXuat/GetById_Hang/' + id)
  }
  deleteMany(listId: number[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: listId
    };
    return this.http.delete<any>(baseUrl + 'HangSanXuat/DeleteMany_Hang', httpOptions);
  }
  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `HangSanXuat/Update_HangSanXuat_TrangThai/${id}`, null)
  }

  search(Keywork: string): Observable<any[]> {
    const params = `Keywork=${Keywork}`;
    return this.http.get<any[]>(baseUrl + `HangSanXuat/Search_Hang?${params}`);
  }
}
