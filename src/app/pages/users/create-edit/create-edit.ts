import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-user-create-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-edit.html',
  styleUrls: ['./create-edit.scss']
})
export class CreateEditUsersComponent implements OnInit {
  id: number | null = null;
  title = 'Crear usuario';

  form!: FormGroup;

  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: [''],
      last_name: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.title = 'Editar usuario';
      this.loading = true;
      this.userService.getById(this.id).subscribe({
        next: (u: User) => { this.form.patchValue(u); this.loading = false; },
        error: (err) => { this.error = 'No se pudo cargar el usuario'; console.error(err); this.loading = false; }
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const payload = this.form.value as Partial<User>;

    const req$ = this.id
      ? this.userService.update(this.id, payload)
      : this.userService.create(payload);

    req$.subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err) => { this.error = 'No se pudo guardar'; console.error(err); this.loading = false; }
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
