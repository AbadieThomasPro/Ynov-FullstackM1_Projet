import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) 
    },

    //n'import quel route inconu redirige vers home
    {
        path: '**', 
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
    }
];
