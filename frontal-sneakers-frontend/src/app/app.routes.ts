import { Routes } from '@angular/router';

import { SinginForm } from './components/singin-form/singin-form';
import { SingupForm } from './components/singup-form/singup-form';
import { LoginPage } from './pages/login-page/login-page';
import { HomePage } from './pages/home-page/home-page';
import { UserPage } from './pages/user-page/user-page';
import { CartPage } from './pages/cart-page/cart-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { ProductPage } from './pages/product-page/product-page';
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

    // Rota HomePage '/home'
    {
        path: 'home', 
        component: HomePage
    },

    // Rota UserPage '/user'
    {
        path: 'user', 
        component: UserPage
    },

    // Rota CartPage '/cart'
    {
        path: 'cart', 
        component: CartPage
    },

    // Rota CatalogPage '/catalog'
    {
        path: 'catalog', 
        component: CatalogPage
    },

    // Rota ProductPage '/product'
    {
        path: 'product', 
        component: ProductPage
    },

    // Rota Padrão do Site '/home'
    { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
    }
];
