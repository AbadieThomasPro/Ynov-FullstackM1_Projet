import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Register } from '../../store/user/user.actions';
import { FormField, FormComponent } from './form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-example',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './form.example.html',
  styleUrls: []
})
export class RegisterPageExample {
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Définition des champs du formulaire avec signals
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

// EXEMPLE POUR LOGIN
// loginFields = signal<FormField[]>([
//   {
//     name: 'email',
//     label: 'Email',
//     type: 'email',
//     placeholder: 'votre@email.com',
//     required: true
//   },
//   {
//     name: 'password',
//     label: 'Mot de passe',
//     type: 'password',
//     placeholder: 'Mot de passe',
//     required: true
//   }
// ]);

// EXEMPLE POUR RECETTE
// recipeFields = signal<FormField[]>([
//   {
//     name: 'title',
//     label: 'Titre de la recette',
//     type: 'text',
//     placeholder: 'Ex: Tarte aux pommes',
//     required: true,
//     maxLength: 100
//   },
//   {
//     name: 'description',
//     label: 'Description',
//     type: 'textarea',
//     placeholder: 'Décrivez votre recette...',
//     required: true,
//     rows: 5
//   },
//   {
//     name: 'cookingTime',
//     label: 'Temps de cuisson (min)',
//     type: 'number',
//     placeholder: '30',
//     required: true,
//     min: 1,
//     max: 600
//   },
//   {
//     name: 'difficulty',
//     label: 'Difficulté',
//     type: 'dropdown',
//     placeholder: 'Choisir la difficulté',
//     required: true,
//     options: [
//       { label: 'Facile', value: 'easy' },
//       { label: 'Moyen', value: 'medium' },
//       { label: 'Difficile', value: 'hard' }
//     ]
//   }
// ]);
