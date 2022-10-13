import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const JWT = this.cookiesService.get("JWT");
    if (JWT) {
      return next.handle(req.clone({ setHeaders: { JWT } }));
    }
    return next.handle(req);
  }

  isLogIn = false;

  constructor(private http: HttpClient, private cookiesService: CookieService) { }


  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/user/login', {
      username,
      password
    });
  }
  autoLogin() {
    const JWT = this.cookiesService.get("JWT");
    if (JWT) {
      this.http.post('http://localhost:3000/user/jwt', {}).subscribe((res: any) => {
        this.isLogIn = res.verified;
        if(!this.isLogIn) this.logout()
      })
    } 
  }
  signup(username: string, password: string) {
    return this.http.post('http://localhost:3000/user/signup', {
      username,
      password
    });
  }
  logout() {
    this.isLogIn = false;
    this.cookiesService.delete("JWT");
  }
  getName(id:string) {
    return this.http.get(`http://localhost:3000/user/${id}`);
  }
}
