import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SinginForm } from './components/singin-form/singin-form';
import { SingupForm } from './components/singup-form/singup-form';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
    // Rota LoginPage - '/auth'
    {
        path: 'auth',
        component: LoginPage,
        children: [
            {
                // Se o usuário navegar para '/auth', será redirecionado para '/auth/singin'
                path: '', 
                redirectTo: 'singin',
                pathMatch: 'full'
            },
            {
                // Rota SinginForm - '/auth/singin'
                path: 'singin',
                component: SinginForm 
            },
            {
                // Rota SinginForm - '/auth/singup'
                path: 'singup',
                component: SingupForm 
            }
        ]
    },

    // Rota Padrão do Site - Home
    { 
        path: '', 
        redirectTo: 'auth', 
        pathMatch: 'full' 
    }
];
