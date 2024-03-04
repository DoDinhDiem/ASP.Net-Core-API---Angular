import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
    providedIn: 'root'
})
export class SanPhamService {


    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'SanPham/GetAll_SanPham')
    }
    create(SanPham: any): Observable<any> {
        return this.http.post<any>(baseUrl + 'SanPham/Create_SanPham', SanPham)
    }
    update(SanPham: any) {
        return this.http.put<any>(baseUrl + 'SanPham/Update_SanPham', SanPham)
    }

    toggleTrangThai(id: any) {
        return this.http.put<any>(baseUrl + `SanPham/Update_SanPham_TrangThaiHoatDong/${id}`, null)
    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(baseUrl + 'SanPham/Delete_SanPham/' + id)
    }
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'SanPham/GetById_SanPham/' + id)
    }
    deleteMany(listId: number[]): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: listId
        };
        return this.http.delete<any>(baseUrl + 'SanPham/DeleteMany_SanPham', httpOptions);
    }
    search(Keywork: string, MinGiaBan: number, MaxGiaBan: number): Observable<any[]> {
        const params = `Keywork=${Keywork}&MinGiaBan=${MinGiaBan}&MaxGiaBan=${MaxGiaBan}`;
        return this.http.get<any[]>(baseUrl + `SanPham/Search_SanPham?${params}`);
    }
    uploadFiles(files: File[]): Observable<any> {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        return this.http.post(baseUrl + 'SanPham/upload', formData)
    }
}