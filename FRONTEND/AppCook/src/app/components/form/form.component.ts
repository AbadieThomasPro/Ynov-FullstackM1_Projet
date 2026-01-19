import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'number' | 'dropdown' | 'date';
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: { label: string; value: any }[]; // Pour les dropdowns
  rows?: number; // Pour textarea
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputTextarea,
    DropdownModule,
    CalendarModule,
    InputNumberModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  // Inputs avec signals
  fields = input.required<FormField[]>();
  submitLabel = input<string>('Soumettre');
  loading = input<boolean>(false);
  
  // Output avec signals
  formSubmit = output<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    // Rebuild form si les fields changent
    if (this.fields()) {
      this.buildForm();
    }
  }

  private buildForm() {
    const group: any = {};
    
    this.fields().forEach(field => {
      const validators = [];
      
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      
      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }
      
      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }
      
      if (field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }
      
      if (field.max !== undefined) {
        validators.push(Validators.max(field.max));
      }
      
      group[field.name] = ['', validators];
    });
    
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      // Marquer tous les champs comme touched pour afficher les erreurs
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  getErrorMessage(field: FormField): string {
    const control = this.form.get(field.name);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }
    
    if (control.errors['required']) {
      return `${field.label} est requis`;
    }
    
    if (control.errors['email']) {
      return 'Email invalide';
    }
    
    if (control.errors['minlength']) {
      return `${field.label} doit faire au moins ${field.minLength} caractères`;
    }
    
    if (control.errors['maxlength']) {
      return `${field.label} ne doit pas dépasser ${field.maxLength} caractères`;
    }
    
    if (control.errors['min']) {
      return `La valeur minimum est ${field.min}`;
    }
    
    if (control.errors['max']) {
      return `La valeur maximum est ${field.max}`;
    }
    
    return '';
  }

  hasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }
}
