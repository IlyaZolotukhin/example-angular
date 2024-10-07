import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  token: any;

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post<{ token: string }>('https://fakestoreapi.com/auth/login', body)
      .pipe(
        catchError(err => {
          console.error('Ошибка:', err);
          return of(null); // будет ошибка вернем null
        })
      )
      .subscribe(json => {
        if (json && json.token) {
          localStorage.setItem('token', json.token); // Сохраняем токен в localStorage
          this.router.navigate(['/main']); // Перенаправляем на главную страницу
        } else {
          console.error('Ошибка входа:', json);
        }
      });
  }
}
