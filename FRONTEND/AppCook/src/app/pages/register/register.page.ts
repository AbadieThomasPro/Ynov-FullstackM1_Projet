import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Register } from '../../store/user/user.actions';
import { FormComponent, FormField } from '../../components/form/form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Définition des champs du formulaire
  registerFields = signal<FormField[]>([
    {
      name: 'pseudo',
      label: 'Pseudo',
      type: 'text',
      placeholder: 'Votre pseudo',
      required: true,
      minLength: 3,
      maxLength: 50
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'votre@email.com',
      required: true,
      maxLength: 50
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password',
      placeholder: 'Mot de passe',
      required: true,
      minLength: 6,
      maxLength: 255
    }
  ]);

  constructor(private store: Store, private router: Router) {}

  onRegister(formData: any) {
    this.loading.set(true);
    this.error.set(null);
    
    this.store.dispatch(new Register({
      email: formData.email,
      password: formData.password,
      pseudo: formData.pseudo
    })).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Erreur lors de l\'inscription. Veuillez réessayer.');
        console.error(err);
      }
    });
  }
}
