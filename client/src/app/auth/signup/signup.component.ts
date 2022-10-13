import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private cookiesService: CookieService, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  message = ""
  onSubmit() {

    const { username, password } = this.loginForm.getRawValue();
    if (!username || !password) {
      this.message = "Please enter a username and password"
      return
    }
    this.authService.signup(username as string, password as string).subscribe((res: any) => {
      if (res.error) {
        this.message = res.error
        return;
      }
      this.cookiesService.set("JWT", res.JWT);
      this.authService.isLogIn = true;
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
  }

}
