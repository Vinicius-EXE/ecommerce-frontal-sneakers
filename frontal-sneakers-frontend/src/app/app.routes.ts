import { Routes } from '@angular/router';

import { SinginForm } from './components/singin-form/singin-form';
import { SingupForm } from './components/singup-form/singup-form';
import { LoginPage } from './pages/login-page/login-page';
import { HomePage } from './pages/home-page/home-page';
import { UserPage } from './pages/user-page/user-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { ProductPage } from './pages/product-page/product-page';
import { PersonalInfo } from './components/personal-info/personal-info';
import { PaymentMethods } from './components/payment-methods/payment-methods';
import { Addresses } from './components/addresses/addresses';
import { Orders } from './components/orders/orders';
import { SecurityArea } from './components/security-area/security-area';
import { AboutUsComponent } from './pages/about-us/about-us';
import { CheckoutComponent } from './pages/check-out/check-out';
import { ManageProducts } from './components/manage-products/manage-products';
import { ManageOrders } from './components/manage-orders/manage-orders';
import { ManageUsers } from './components/manage-users/manage-users';
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
        component: CheckoutComponent
    },

    // Rota CatalogPage '/products'
    {
        path: 'products',
        component: CatalogPage
    },

    // Rota ProductPage '/product/:id'
    {
        path: 'product/:id',
        component: ProductPage
    },

    // Rota UserPage - '/user'
    {
        path: 'user',
        component: UserPage,
        children: [
            {
                path: 'personal-info',
                component: PersonalInfo
            },

            {
                path: 'cards',
                component: PaymentMethods
            },

            {
                path: 'addresses',
                component: Addresses
            },

            {
                path: 'orders',
                component: Orders
            },

            {
                path: 'security',
                component: SecurityArea
            },

            {
                path: 'manage-products',
                component: ManageProducts
            },

            {
                path: 'manage-orders',
                component: ManageOrders
            },

            {
                path: 'manage-users',
                component: ManageUsers
            }
        ]
    },

    // Rota AboutUsPage '/about-us'
    {
        path: 'about-us',
        component: AboutUsComponent
    },

    // Rota Padrão do Site '/home'
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
