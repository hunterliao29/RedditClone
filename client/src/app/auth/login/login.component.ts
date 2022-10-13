import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private cookiesService: CookieService, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  message = ""

  onSubmit() {

    const { username, password } = this.loginForm.getRawValue();
    if(!username|| !password) {
      this.message = "Please enter a username and password"
      return
    }
    this.authService.login(username as string, password as string).subscribe((res: any) => {
      if(res.error) {
        this.message = res.error
        return
      }
      this.cookiesService.set("JWT", res.JWT);
      this.authService.isLogIn = true;
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
  }

}
