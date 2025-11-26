import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/user';
    private userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();

    get currentUserValue() {
        return this.userSubject.value;
    }

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

    // Profile
    getProfile(): Observable<any> {
        return this.http.get(`${this.apiUrl}/me`, { headers: this.getHeaders() }).pipe(
            tap(user => this.userSubject.next(user))
        );
    }

    updateProfile(profile: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/me`, profile, { headers: this.getHeaders() }).pipe(
            tap(() => {
                const currentUser = this.userSubject.value;
                this.userSubject.next({ ...currentUser, ...profile });
            })
        );
    }

    updatePassword(passwords: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/me/password`, passwords, { headers: this.getHeaders() });
    }

    // Cards
    getCards(): Observable<any> {
        return this.http.get(`${this.apiUrl}/cards`, { headers: this.getHeaders() });
    }

    addCard(card: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/cards`, card, { headers: this.getHeaders() });
    }

    deleteCard(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/cards/${id}`, { headers: this.getHeaders() });
    }

    // Addresses
    getAddresses(): Observable<any> {
        return this.http.get(`${this.apiUrl}/addresses`, { headers: this.getHeaders() });
    }

    addAddress(address: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/addresses`, address, { headers: this.getHeaders() });
    }

    deleteAddress(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/addresses/${id}`, { headers: this.getHeaders() });
    }
}
