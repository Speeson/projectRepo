import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly error = signal('');
  readonly loading = signal(false);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  submit(): void {
    if (this.form.invalid || this.loading()) {
      return;
    }

    this.error.set('');
    this.loading.set(true);
    const email = this.form.controls.email.value ?? '';
    const password = this.form.controls.password.value ?? '';

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading.set(false);

        if (response.user.role === 'ALUMNO') {
          void this.router.navigate(['/my-projects']);
          return;
        }

        void this.router.navigate(['/pending']);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Credenciales incorrectas o servidor no disponible.');
      }
    });
  }
}
