import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {AuthGuard} from "./auth.guard";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserListComponent, RouterLink,
    HttpClientModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private authGuard: AuthGuard, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authGuard.isAuthenticated();
  }

  logout(): void {
    this.authGuard.logout();
    this.router.navigate(['/']); // отправляю на страницу регистрации
  }
}
