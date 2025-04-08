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

  username: string = '';
  availabilityMessage: string = '';

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
  register() {
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
            title: 'El usuario se registro correctamente',
            showConfirmButton: false,
            timer: 2000,
          });
          // Redirige al login después del registro exitoso
          this.router.navigate(['/mapa']);
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
}
