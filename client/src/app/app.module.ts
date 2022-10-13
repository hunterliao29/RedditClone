import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { MainComponent } from './main/main.component';
import { BannerComponent } from './main/banner/banner.component';
import { CreateComponent } from './create/create.component';
import { InputComponent } from './main/input/input.component';
import { PostComponent } from './main/input/post/post.component';
import { PostlistComponent } from './main/postlist/postlist.component';
import { FilterComponent } from './main/filter/filter.component';
import { NotComponent } from './not/not.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    BannerComponent,
    CreateComponent,
    InputComponent,
    PostComponent,
    PostlistComponent,
    FilterComponent,
    NotComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
