import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'Slide/GetAll_Slide')
  }
  create(Slide: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'Slide/Create_Slide', Slide)
  }
  update(Slide: any) {
    return this.http.put<any>(baseUrl + 'Slide/Update_Slide', Slide)
  }

  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `Slide/Update_Slide_TrangThai/${id}`, null)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'Slide/GetById_Slide/' + id)
  }
  search(): Observable<any[]> {
    // const params = `Keywork=${Keywork}&Email=${Email}&DiaChi=${DiaChi}`;
    return this.http.get<any[]>(baseUrl + 'Slide/Search_Slide');
  }
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(baseUrl + 'Slide/upload', formData);
  }
}
