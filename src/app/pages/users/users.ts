import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../core/services/user';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (res) => { this.users = res; this.loading = false; },
      error: (err) => { this.error = 'Error al cargar usuarios'; console.error(err); this.loading = false; }
    });
  }

  create(): void {
    this.router.navigate(['/users/create']);
  }

  edit(u: User): void {
    this.router.navigate(['/users/edit', u.id]);
  }

  remove(u: User): void {
    if (!confirm(`Eliminar usuario ${u.email}?`)) return;
    this.userService.delete(u.id).subscribe({
      next: () => this.fetch(),
      error: (err) => { alert('No se pudo eliminar'); console.error(err); }
    });
  }
}
