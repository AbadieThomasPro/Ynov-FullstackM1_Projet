import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormComponent, FormField } from '../../components/form/form.component';
import { Login } from '../../store/user/user.actions';
import { ShowToast } from '../../store/toast/toast.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  // Configuration des champs du formulaire de connexion
  loginFields = signal<FormField[]>([
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Votre email',
      required: true
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password',
      placeholder: 'Votre mot de passe',
      required: true
    }
  ]);

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onLogin(formData: any) {
    console.log('Login data:', formData);
    
    // Dispatch l'action Login vers le store NGXS
    this.store.dispatch(new Login({
      email: formData.email,
      password: formData.password
    })).subscribe({
      next: () => {
        console.log('Login successful!');
        this.store.dispatch(new ShowToast('success', 'Connexion réussie', 'Bienvenue!'));
        // Redirection vers la page d'accueil après connexion
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.store.dispatch(new ShowToast('error', 'Échec de la connexion', 'Email ou mot de passe incorrect'));
      }
    });
  }
}
