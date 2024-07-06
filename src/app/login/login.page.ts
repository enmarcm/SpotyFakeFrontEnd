import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
} from '@ionic/angular/standalone';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonGrid,
    IonRow,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
  ],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  loginService = inject(LoginService);
  loaderService = inject(LoaderService);

  ngOnInit() {
    this.loaderService.hide();
    if (localStorage.getItem('token')) this.router.navigate(['/tabs']);
    return;
  }

  constructor(private router: Router) {}

  async login() {
    try {
      this.loaderService.show();
      const result = (await this.loginService.sendLoginRequest(
        this.username,
        this.password
      )) as any;
      localStorage.setItem('token', result.token);
      this.router.navigate(['/tabs']);
      return;
    } catch (error) {
      console.error('Error al iniciar sesion', error);
    } finally {
      this.loaderService.hide();
    }
  }
}
