import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
    providedIn: 'root'
})
export class ChucvuService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'ChucVu/GetAll_ChucVu')
    }
    create(ChucVu: any): Observable<any> {
        return this.http.post<any>(baseUrl + 'ChucVu/Create_ChucVu', ChucVu)
    }
    update(ChucVu: any) {
        return this.http.put<any>(baseUrl + 'ChucVu/Update_ChucVu', ChucVu)
    }

    toggleTrangThai(id: any) {
        return this.http.put<any>(baseUrl + `ChucVu/Update_ChucVu_TrangThai/${id}`, null)
    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(baseUrl + 'ChucVu/Delete_ChucVu/' + id)
    }
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'ChucVu/GetById_ChucVu/' + id)
    }
    deleteMany(listId: number[]): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: listId
        };
        return this.http.delete<any>(baseUrl + 'ChucVu/DeleteMany_ChucVu', httpOptions);
    }

    search(Keywork: string): Observable<any[]> {
        const params = `Keywork=${Keywork}`;
        return this.http.get<any[]>(baseUrl + `ChucVu/Search_ChucVu?${params}`);
    }
}
