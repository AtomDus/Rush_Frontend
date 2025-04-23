import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);

  @Output()
  private readonly close = new EventEmitter<void>();

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const value = this.loginForm.value;

    this._authService.login(value).subscribe({
      next: () => this.closeForm(),
      error: (err) => console.error(err)
    });
  }

  closeForm() {
    this.close.emit();
  }
}
