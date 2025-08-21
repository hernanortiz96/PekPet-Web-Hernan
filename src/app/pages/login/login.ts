import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    this.authService.login(this.loginForm.value)
      .pipe(
        catchError(err => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
          console.error(err);
          this.loading = false;
          return of(null); // evita que la app se rompa
        })
      )
      .subscribe(res => {
        if (res) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          console.log('Login exitoso!');
          this.router.navigate(['/dashboard']); // redirige tras login
        }
        this.loading = false;
      });
  }
}
