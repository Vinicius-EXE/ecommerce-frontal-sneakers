import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:8080/orders';

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

    getOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
    }

    createOrder(orderData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, orderData, { headers: this.getHeaders() });
    }

    updateOrderStatus(id: number, status: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status }, { headers: this.getHeaders() });
    }
}
