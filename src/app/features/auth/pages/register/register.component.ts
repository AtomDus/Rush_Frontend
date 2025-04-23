import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {RegisterFormModel} from '../../models/register-form.model';
import {NgForOf, NgIf} from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';
import {Password, PasswordDirective} from 'primeng/password';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Checkbox} from 'primeng/checkbox';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);

  @Output()
  private readonly close = new EventEmitter<void>();

  registerForm!: FormGroup;
  statusOptions = ['ACTIVE', 'INACTIVE', 'SICK', 'VACATION'];

  constructor() {}

  ngOnInit() {
    this.registerForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      jobTitle: ['', Validators.required],
      isAvailable: [true, Validators.required],
      status: ['ACTIVE', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    const value: RegisterFormModel = this.registerForm.value;
    console.log('Données envoyées:', value);  // Log les données avant l'envoi

    this._authService.register(value).subscribe({
      next: () => console.log('Utilisateur inscrit avec succès'),
      error: (err) => {
        console.error('Erreur:', err);
        console.log(err.error);  // Log le détail de l'erreur
      }
    });
  }

  closeForm() {
    this.close.emit();
  }
}
