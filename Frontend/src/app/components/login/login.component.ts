import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from './interface/login.interface';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: any = null;
  showVerificationForm: boolean = false;  // Controla si se debe mostrar el formulario de verificación

  username: string = '';
  availabilityMessage: string = '';
  verificationCode: string = '';  // Código de verificación ingresado por el usuario

  constructor(
    private router: Router,
    private service: ServiceService,
    private fb: FormBuilder
  ) {}
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  // Método que maneja el login de usuario
  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Revisa los campos del formulario.',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const login: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    // Llama al método del servicio para login
    this.service.login(login).subscribe(
      (response) => {
        if (response.message) {
          // Guardar información del usuario en localStorage
          const rol = response.rol;
          const token = response.token;
          console.log(response.message)
          console.log("rol: ",rol, " token: ",token)
          localStorage.setItem('rol', rol);
          localStorage.setItem('token', token);
          Swal.fire({
            icon: 'success',
            title: 'Enviando correo de verificación',
            showConfirmButton: false,
            timer: 2000,
          });
          localStorage.setItem('auth_token', response.token);  // Guarda el token en el localStorage
          this.showVerificationForm = true;
        }
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        const mensaje =
          error.error?.error ||
          error.message ||
          'Ocurrió un error inesperado. Inténtalo de nuevo.';

        Swal.fire({
          icon: 'error',
          title: mensaje,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }

  // Método para verificar el código de verificación
  verifyCode(verificationCode: string) {
    const body = { email: this.loginForm.value.email, code: verificationCode };

    // Obtén el token del localStorage
    const token = localStorage.getItem('auth_token');


    // Configura el encabezado con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.service.verifyCode(body, headers).subscribe(
      (response) => {
        if (response.message === 'Código verificado correctamente') {
          Swal.fire({
            icon: 'success',
            title: 'Código verificado correctamente',
            showConfirmButton: false,
            timer: 2000,
          });
          this.router.navigate(['/mapa']);
        } else {
          alert('Código incorrecto');
        }
      },
      (error) => {
        console.error('Error al verificar el código:', error);
        alert('Hubo un problema al verificar el código');
      }
    );
  }
}
