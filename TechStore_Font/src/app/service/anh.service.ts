import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
    providedIn: 'root'
})
export class AnhService {
    constructor(private http: HttpClient) { }
    getAll(id: any): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'AnhSanPham/GetAll_AnhSanPham/' + id)
    }
    create(AnhSanPham: any): Observable<any> {
        return this.http.post<any>(baseUrl + 'AnhSanPham/Create_AnhSanPham', AnhSanPham)
    }
    update(AnhSanPham: any) {
        return this.http.put<any>(baseUrl + 'AnhSanPham/Update_AnhSanPham', AnhSanPham)
    }

    toggleTrangThai(id: any) {
        return this.http.put<any>(baseUrl + `AnhSanPham/Update_AnhSanPham_TrangThai/${id}`, null)
    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(baseUrl + 'AnhSanPham/Delete_AnhSanPham/' + id)
    }
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'AnhSanPham/GetById_AnhSanPham/' + id)
    }
    deleteMany(listId: number[]): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: listId
        };
        return this.http.delete<any>(baseUrl + 'AnhSanPham/DeleteMany_AnhSanPham', httpOptions);
    }
}
