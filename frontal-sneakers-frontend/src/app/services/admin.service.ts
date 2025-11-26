import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:8080/admin';

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

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
    }

    updateUserRole(id: number, role: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/users/${id}/role`, { role }, { headers: this.getHeaders() });
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/users/${id}`, { headers: this.getHeaders() });
    }
}
