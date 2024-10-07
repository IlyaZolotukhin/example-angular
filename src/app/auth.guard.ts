import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    const token = localStorage.getItem('token'); // Токен возьмем из localStorage
    if (token) {
      return true;
    } else {
      this.router.navigate(['/register']); // на страницу регистрации если нет токена
      return false;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Вернёт true, если токен существует, в противном случае вернёт false
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
