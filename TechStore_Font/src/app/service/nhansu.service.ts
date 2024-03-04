import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
    providedIn: 'root'
})
export class NhanSuService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'NhanSu/GetAll_NhanSu')
    }
    create(NhanSu: any): Observable<any> {
        return this.http.post<any>(baseUrl + 'NhanSu/Create_NhanSu', NhanSu)
    }
    update(NhanSu: any) {
        return this.http.put<any>(baseUrl + 'NhanSu/Update_NhanSu', NhanSu)
    }

    toggleTrangThai(id: any) {
        return this.http.put<any>(baseUrl + `NhanSu/Update_NhanSu_TrangThai/${id}`, null)
    }
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'NhanSu/GetById_NhanSu/' + id)
    }
    search(Keywork: string, Email: string, DiaChi: string): Observable<any[]> {
        const params = `Keywork=${Keywork}&Email=${Email}&DiaChi=${DiaChi}`;
        return this.http.get<any[]>(baseUrl + `NhanSu/Search_NhanSu?${params}`);
    }
    uploadFile(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post(baseUrl + 'NhanSu/upload', formData);
    }
}
