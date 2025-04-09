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

  // Método que maneja el registro de usuario
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

    // Llama al método del servicio para registrar al usuario
    this.service.login(login).subscribe(
      (response) => {
        // Verifica si hay un mensaje de éxito
        if (response.message) {
          Swal.fire({
            icon: 'success',
            title: 'Enviando correo de verificación',
            showConfirmButton: false,
            timer: 2000,
          });
          this.showVerificationForm = true;
        } else if (response.error) {
          Swal.fire({
            icon: 'error',
            title: response.error,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        // Mensaje genérico si no se obtiene respuesta del backend
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
        return;
      }
    );
  }

  // Método para verificar el código de verificación
  verifyCode(verificationCode:string) {
    const body = { email: this.loginForm.value.email, code: verificationCode };

    this.service.verifyCode(body).subscribe(
      (response) => {
        if (response.message === 'Código verificado correctamente') {
          // Código de verificación exitoso, redirigimos a la página principal
          Swal.fire({
            icon: 'success',
            title: 'Código verificado correctamente',
            showConfirmButton: false,
            timer: 2000,
          });
          this.router.navigate(['/mapa']);
        } else {
          // Código incorrecto, mostramos un mensaje de error
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
