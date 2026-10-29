import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListsComponent } from './pages/lists/lists.component';
import { requireAuthGuard } from './guards/requireAuth.guard';
import { requireGuestGuard } from './guards/requireGuest.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [requireGuestGuard] },
  { path: 'lists', component: ListsComponent, canActivate: [requireAuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}