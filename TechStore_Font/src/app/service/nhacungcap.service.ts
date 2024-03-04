import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class NhaCungcapService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'NhaCungCap/GetAll_NhaCungCap')
  }
  create(NhaCungCap: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'NhaCungCap/Create_NhaCungCap', NhaCungCap)
  }
  update(NhaCungCap: any) {
    return this.http.put<any>(baseUrl + 'NhaCungCap/Update_NhaCungCap', NhaCungCap)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `NhaCungCap/Update_NhaCungCap_TrangThai/${id}`, null)
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'NhaCungCap/Delete_NhaCungCap/' + id)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'NhaCungCap/GetById_NhaCungCap/' + id)
  }
  deleteMany(listId: number[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: listId
    };
    return this.http.delete<any>(baseUrl + 'NhaCungCap/DeleteMany_NhaCungCap', httpOptions);
  }

  search(Keywork: string): Observable<any[]> {
    const params = `Keywork=${Keywork}`;
    return this.http.get<any[]>(baseUrl + `NhaCungCap/Search_NhaCungCap?${params}`);
  }
}
