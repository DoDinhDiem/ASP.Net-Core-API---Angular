import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class HoaDonBanService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'HoaDonBan/GetAll_HoaDonBan')
  }
  create(HoaDonBan: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'HoaDonBan/Create_HoaDonBan', HoaDonBan)
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'HoaDonBan/GetById_HoaDonBan/' + id)
  }
  update(HoaDonBan: any) {
    return this.http.put<any>(baseUrl + 'HoaDonBan/Update_HoaDonBan', HoaDonBan)
  }
  search(): Observable<any[]> {
    // const params = `Keywork=${Keywork}`;
    return this.http.get<any[]>(baseUrl + 'HoaDonBan/Search_HoaDonBan');
  }
}
