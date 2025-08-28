import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../../core/services/pet';
import { Pet } from '../../../core/models/pet';

@Component({
  selector: 'app-pet-create-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-edit.html',
  styleUrls: ['./create-edit.scss']
})
export class CreateEditPetComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  id: number | null = null;
  title = 'Crear mascota';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      species: [''],
      breed: [''],
      birth_date: [''],
      address: [''],
      curp_pet: [''],
      owner_id: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.title = 'Editar mascota';
      this.loading = true;

      this.petService.getById(this.id).subscribe({
        next: (p: Pet) => {
          this.form.patchValue({
            name: p.name,
            species: p.species,
            breed: p.breed,
            birth_date: p.birth_date,
            owner_id: p.owner_id ?? null
          });
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar mascota', err);
          this.error = 'No se pudo cargar la mascota';
          this.loading = false;
        }
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;

    const payload: Partial<Pet> = this.form.value;

    const request$ = this.id
      ? this.petService.update(this.id, payload)
      : this.petService.create(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/pets']);
      },
      error: (err) => {
        console.error('Error guardando mascota', err);
        this.error = 'No se pudo guardar la mascota';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/pets']);
  }
}

