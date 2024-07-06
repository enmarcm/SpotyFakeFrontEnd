import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { URL_REQUEST } from 'src/constants';
import { LoaderService } from '../loader.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public httpClient = inject(HttpClient);
  private loaderService = inject(LoaderService);

  sendLoginRequest(userName: string, password: string) {
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .post(URL_REQUEST.LOGIN, { userName, password })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

  sendRegisterRequest(register: RegisterData) {
    const { userName, password, email, dateOfBirth } = register;
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .post(URL_REQUEST.REGISTER, {
          userName,
          password,
          email,
          dateOfBirth,
        })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

  obtainDataUser() {
    const token = localStorage.getItem('token');
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .get(URL_REQUEST.OBTAIN_DATA_USER, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

  updateDataUser(data: RegisterData) {
    const token = localStorage.getItem('token');
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .put(URL_REQUEST.UPDATE_DATA_USER, data, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

  deleteAccount() {
    const token = localStorage.getItem('token');
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .delete(URL_REQUEST.DELETE_USER, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }
}

interface RegisterData {
  userName: string;
  password: string;
  email: string;
  dateOfBirth: string;
}
