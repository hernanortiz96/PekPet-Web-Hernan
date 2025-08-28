import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UsersComponent } from './pages/users/users';
import { CreateEditUsersComponent } from './pages/users/create-edit/create-edit';
import { PetsComponent } from './pages/pets/pets';
import { CreateEditPetComponent } from './pages/pets/create-edit/create-edit';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: CreateEditUsersComponent },
  { path: 'users/edit/:id', component: CreateEditUsersComponent },

  { path: 'pets', component: PetsComponent },
  { path: 'pets/create', component: CreateEditPetComponent },
  { path: 'pets/edit/:id', component: CreateEditPetComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
