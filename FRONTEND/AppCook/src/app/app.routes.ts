import { Routes } from '@angular/router';

export const routes: Routes = [

    { 
        path: '', 
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) 
    },

    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
    },

    //n'import quel route inconu redirige vers home
    {
        path: '**', 
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
    }
];
