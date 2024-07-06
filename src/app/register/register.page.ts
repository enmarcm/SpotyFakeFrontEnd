import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonInputPasswordToggle,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonInput,
  IonDatetime,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonDatetime,
    IonInput,
    IonButton,
    IonModal,
    IonDatetimeButton,
    IonRow,
    IonGrid,
    IonContent,
    CommonModule,
    FormsModule,
    IonInputPasswordToggle,
  ],
})
export class RegisterPage implements OnInit {
  public userName = '';
  public password = '';
  public email = '';
  public dateOfBirth = new Date().toISOString();

  public loginService = inject(LoginService);

  ngOnInit() {
    if (localStorage.getItem('token')) this.router.navigate(['/tabs']);
    return;
  }

  constructor(public router: Router) {}

  register = async () => {
    try {
      console.log(this.userName, this.password, this.email, this.dateOfBirth);
      if (
        this.dateOfBirth === '' ||
        this.password === '' ||
        this.email === '' ||
        this.userName === ''
      ) {
        return;
      }

      const parsedData = {
        userName: this.userName,
        email: this.email,
        dateOfBirth: this.dateOfBirth.split('T')[0],
        password: this.password,
      };

      const result = (await this.loginService.sendRegisterRequest(
        parsedData
      )) as any;

      console.log(result);

      if (!result || result?.error) {
        throw new Error(`Ocurrio un error al registrarse. ${result?.error}`);
      }
    } catch (error: any) {
      console.error(`Error al registrarse ${error.error.error}`);
    } finally {
    }
  };
}
