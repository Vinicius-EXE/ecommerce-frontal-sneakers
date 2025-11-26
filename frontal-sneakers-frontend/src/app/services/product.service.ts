import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:8080/products';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    private getHeaders(): HttpHeaders {
        let token = '';
        if (isPlatformBrowser(this.platformId)) {
            token = this.authService.getToken() || '';
        }
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    getProducts(page: number = 0, size: number = 10, sort: string = 'name,asc'): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}&sort=${sort}`, { headers: this.getHeaders() });
    }

    getProductsByBrand(brand: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/brand/${brand}`, { headers: this.getHeaders() });
    }

    getRandomProducts(limit: number = 8): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/random?limit=${limit}`, { headers: this.getHeaders() });
    }

    getProduct(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    createProduct(product: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, product, { headers: this.getHeaders() });
    }

    updateProduct(id: number, product: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, product, { headers: this.getHeaders() });
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }
}
