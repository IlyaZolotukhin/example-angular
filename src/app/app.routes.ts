import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  { path: 'main', component: UserListComponent, canActivate: [AuthGuard]  },
  { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
