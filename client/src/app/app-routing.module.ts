import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateComponent } from './create/create.component';
import { PostComponent } from './main/input/post/post.component';
import { MainComponent } from './main/main.component';
import { NotComponent } from './not/not.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'r/:sub', component: MainComponent },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuardService] },
  { path: 'create/:sub', component: CreateComponent, canActivate: [AuthGuardService] },
  { path: 'post', component: PostComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NotComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
