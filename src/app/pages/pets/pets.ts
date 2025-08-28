import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PetService } from '../../core/services/pet';
import { Pet } from '../../core/models/pet';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pets.html',
  styleUrls: ['./pets.scss']
})
export class PetsComponent implements OnInit {
  pets: Pet[] = [];
  loading = false;
  error: string | null = null;

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void { this.fetch(); }

  fetch(): void {
    this.loading = true;
    this.petService.getAll().subscribe({
      next: (res) => { this.pets = res; this.loading = false; },
      error: (err) => { this.error = 'Error al cargar mascotas'; console.error(err); this.loading = false; }
    });
  }

  create(): void { this.router.navigate(['/pets/create']); }
  edit(p: Pet): void { this.router.navigate(['/pets/edit', p.id]); }
}

