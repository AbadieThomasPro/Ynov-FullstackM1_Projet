import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { TestState } from './store/test/test.state';
import { UserState } from './store/user/user.state';
import { RecipeState } from './store/recipe/recipe.state';
import { IngredientState } from './store/ingredient/ingredient.state';
import { StepState } from './store/step/step.state';
import { ImageState } from './store/image/image.state';
import { ToastState } from './store/toast/toast.state';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore(
      [
        TestState,
        UserState,
        RecipeState,
        IngredientState,
        StepState,
        ImageState,
        ToastState,
      ],
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ]
};
