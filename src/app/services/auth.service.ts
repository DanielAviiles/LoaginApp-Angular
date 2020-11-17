import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyBWZnfdYiBPUB1fdGImNVXThWNNo7nVsxY';
  userToke: string;

  // Crear new User
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Iniciar con User Existente
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(map(resp => {
      this.guardarToken(resp['idToken']);
      return resp;
    }));
  }

  newUser(usuario: UsuarioModel) {
    const authData = {
      /* emial: usuario.email,
      password: usuario.password, */
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signUp?key=${this.apiKey}`,
      authData
    ).pipe(map(resp => {
      this.guardarToken(resp['idToken']);
      return resp;
    }));
  }

  private guardarToken(idToken: string) {
    this.userToke = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToke = localStorage.getItem('token');
    } else {
      this.userToke = '';
    }

    return this.userToke;
  }
}
