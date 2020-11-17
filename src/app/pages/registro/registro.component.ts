import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordame = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    this.auth.newUser(this.usuario).subscribe(resp => {
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
          title: 'ERROR REGISTRO',
          text: 'Ya existe un registro con esas credenciales'
        });
    });
  }

}
