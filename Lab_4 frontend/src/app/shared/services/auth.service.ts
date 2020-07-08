import {Injectable} from '@angular/core';
import {User} from './interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private token = null;
  private user = null;
  constructor(private http: HttpClient) {
  }
  register(user: User): Observable<User>{
    return this.http.post<User>('/rest/auth/register', user);
    }

    login(user: User): Observable<{token: string}>{
      return this.http.post<{token: string}>('/rest/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
            this.setUser(user);
            console.log(user);
          }
        )
      );
    }
    setToken(token: string){
    this.token = token;
    }
    getToken(): string{
    return this.token;
    }
    setUser(user: User){
    this.user = user;
    }
    getUser(): User{
    return this.user;
    }
    getLogin(){
    return this.user.email;
    }
    isAuthenticated(): boolean{
    return !!this.token;
    }
    logout(){
    this.setToken(null);
    localStorage.clear();
    }
}

