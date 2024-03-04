import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class TinTucService {


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'TinTuc/GetAll_TinTuc')
  }
  create(TinTuc: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'TinTuc/Create_TinTuc', TinTuc)
  }
  update(TinTuc: any) {
    return this.http.put<any>(baseUrl + 'TinTuc/Update_TinTuc', TinTuc)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `TinTuc/Update_TinTuc_TrangThaiHoatDong/${id}`, null)
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'TinTuc/Delete_TinTuc/' + id)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'TinTuc/GetById_TinTuc/' + id)
  }
  deleteMany(listId: number[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: listId
    };
    return this.http.delete<any>(baseUrl + 'TinTuc/DeleteMany_TinTuc', httpOptions);
  }
  search(Keywork: string): Observable<any[]> {
    const params = `Keywork=${Keywork}`;
    return this.http.get<any[]>(baseUrl + `TinTuc/Search_TinTuc?${params}`);
  }
  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http.post(baseUrl + 'TinTuc/upload', formData)
  }
}
