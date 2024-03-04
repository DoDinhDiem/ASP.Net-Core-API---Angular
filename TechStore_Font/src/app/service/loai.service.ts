import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LoaiService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'Loai/GetAll_Loai')
  }
  create(Loai: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'Loai/Create_Loai', Loai)
  }
  update(Loai: any) {
    return this.http.put<any>(baseUrl + 'Loai/Update_Loai', Loai)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `Loai/Update_Loai_TrangThai/${id}`, null)
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'Loai/Delete_Loai/' + id)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'Loai/GetById_Loai/' + id)
  }
  deleteMany(listId: number[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: listId
    };
    return this.http.delete<any>(baseUrl + 'Loai/DeleteMany_Loai', httpOptions);
  }

  search(Keywork: string): Observable<any[]> {
    const params = `Keywork=${Keywork}`;
    return this.http.get<any[]>(baseUrl + `Loai/Search_Loai?${params}`);
  }
}
