import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
    providedIn: 'root'
})
export class AnhTinTucService {
    constructor(private http: HttpClient) { }
    getAll(id: any): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'AnhTinTuc/GetAll_AnhTinTuc/' + id)
    }
    create(AnhTinTuc: any): Observable<any> {
        return this.http.post<any>(baseUrl + 'AnhTinTuc/Create_AnhTinTuc', AnhTinTuc)
    }
    update(AnhTinTuc: any) {
        return this.http.put<any>(baseUrl + 'AnhTinTuc/Update_AnhTinTuc', AnhTinTuc)
    }

    toggleTrangThai(id: any) {
        return this.http.put<any>(baseUrl + `AnhTinTuc/Update_AnhTinTuc_TrangThai/${id}`, null)
    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(baseUrl + 'AnhTinTuc/Delete_AnhTinTuc/' + id)
    }
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'AnhTinTuc/GetById_AnhTinTuc/' + id)
    }
    deleteMany(listId: number[]): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: listId
        };
        return this.http.delete<any>(baseUrl + 'AnhTinTuc/DeleteMany_AnhTinTuc', httpOptions);
    }
}
