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
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
    },
    {
        path: 'recipes',
        loadComponent: () => import('./pages/recipe/recipe.page').then(m => m.RecipePage)
    },
    {
        path: 'recipes/add',
        loadComponent: () => import('./pages/recipe/recipe-add/recipe-add.page').then(m => m.RecipeAddPage)
    },
    {
        path: 'recipes/:id',
        loadComponent: () => import('./pages/recipe/recipe-detail/recipe-detail.page').then(m => m.RecipeDetailPage)
    },

    //n'import quel route inconu redirige vers home
    {
        path: '**', 
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
    }
];
