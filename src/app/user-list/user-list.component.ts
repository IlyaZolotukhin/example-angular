import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgForOf } from '@angular/common';

interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<User[]>('https://fakestoreapi.com/users')
      .pipe(
        catchError(err => {
          console.error('Ошибка при получении пользователей:', err);
          return of([]); // возвращаю пустой массив , если error
        })
      )
      .subscribe(data => {
        this.users = data; // данные передаю в массив юзеров
      });
  }
}
