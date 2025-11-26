import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';
    private tokenKey = 'auth_token';
    private roleKey = 'user_role';

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isAuthenticatedSubject.next(this.hasToken());
    }

    private hasToken(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return !!localStorage.getItem(this.tokenKey);
        }
        return false;
    }

    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, user).pipe(
            tap((response: any) => {
                this.setSession(response);
            })
        );
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signin`, credentials).pipe(
            tap((response: any) => {
                this.setSession(response);
            })
        );
    }

    private setSession(authResult: any) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.tokenKey, authResult.token);
            localStorage.setItem(this.roleKey, authResult.role);
        }
        this.isAuthenticatedSubject.next(true);
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(this.tokenKey);
            localStorage.removeItem(this.roleKey);
        }
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/auth/singin']);
    }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    getRole(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.roleKey);
        }
        return null;
    }

    isAuthenticated(): boolean {
        return this.hasToken();
    }

    isAdmin(): boolean {
        return this.getRole() === 'ADMIN';
    }
}
