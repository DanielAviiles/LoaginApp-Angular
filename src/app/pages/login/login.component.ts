import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordame = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // this.usuario = new UsuarioModel();

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      // localStorage.setItem('password', this.usuario.password);

      this.recordame = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp => {
      console.log(resp);
      Swal.close();

      if (this.recordame) {
        localStorage.setItem('email', this.usuario.email);
        // localStorage.setItem('password', this.usuario.password);
      }

      this.router.navigateByUrl('/home');
    }, (err) => {
        // console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Credenciales Invalidas',
          text: 'Usuario o contraseña incorrectas'
        });
    });
  }

}
