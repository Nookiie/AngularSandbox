import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService 
{
  readonly url = "http://localhost:3000/users";

  constructor(private http: HttpClient) {

  }
  getUsers(searchValue?: string): Observable<User[]> {
    if (searchValue) {
      let params = new HttpParams();
      params = params.append('username', searchValue);

      return this.http.get<User[]>(this.url, {
        params
      });
    }

    return this.http.get<User[]>(this.url);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  saveUser(user: User): Observable<User> {
    if (user.id) {
      return this.updateUser(user);
    } else {
      return this.addUser(user);
    }
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  private addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  private updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }
}