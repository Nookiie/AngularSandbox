import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from 'src/assets/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly url = 'http://localhost:3000/users';
  readonly currentUser = 'currentUser';

  private hasLoggedIn$ = new BehaviorSubject<boolean>(false);
  private isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  login(email: string, password: string): Observable<User> {
    return this.getUsers().pipe(
      map((response: User[]) => response.find(user => user.email === email 
        && user.password === password))
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  logout(): void {
    localStorage.removeItem(this.currentUser);
  }

  setLoggedUser(user: User): void {
    localStorage.setItem(this.currentUser, JSON.stringify(user));

    this.setHasLoggedIn(true);

    if(user.isAdmin){
      this.setIsAdmin(true);
    }
    else{
      this.setIsAdmin(false);
    }
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem(this.currentUser));
  }

  setHasLoggedIn(isLogged: boolean): void {
    this.hasLoggedIn$.next(isLogged);
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdmin$.next(isAdmin);
  }

  getHasLoggedIn(): Observable<boolean> {
    return this.hasLoggedIn$.asObservable();
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }
}