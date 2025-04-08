import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Registro } from './interface/registro.interface';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  user: any = null;

  username: string = '';
  availabilityMessage: string = '';

  constructor(private router: Router,
    private service: ServiceService,
    private fb: FormBuilder,) { }
  registroForm!: FormGroup;

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      ctrFirstName: this.fb.control('', [Validators.required]),
      ctrLastName: this.fb.control('', [Validators.required]),
      ctrEmail: this.fb.control('', [Validators.required, Validators.email]),
      ctrPassword: this.fb.control('', [Validators.required]),
      ctrPasswordConfirm: this.fb.control('', [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }

  // Validacion de que las contraseñas coinciden
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('ctrPassword')?.value;
    const confirmPassword = formGroup.get('ctrPasswordConfirm')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  //Validacion de la contraseña con los caracteres solicitados
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value || '';
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 6;

    const isValid = hasUpperCase && hasLowerCase && hasNumber && isValidLength;

    return !isValid ? { passwordStrength: true } : null;
  }

  onSubmit() {
    if (this.registroForm.valid) {
      alert('¡Contraseña válida!');
    } else {
      alert('La contraseña no cumple con los requisitos.');
    }
  }

  // Método que maneja el registro de usuario
  register() {
    if (this.registroForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Revisa los campos del formulario.",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const registro: Registro = {
      nombre: this.registroForm.value.ctrFirstName,
      apellidos: this.registroForm.value.ctrLastName,
      email: this.registroForm.value.ctrEmail,
      password: this.registroForm.value.ctrPassword,
    };

    // Llama al método del servicio para registrar al usuario
    this.service.registrarUsuario(registro).subscribe(
      (response) => {
        // Verifica si hay un mensaje de éxito
        if (response.message) {
          Swal.fire({
            icon: "success",
            title: "El usuario se registro correctamente",
            showConfirmButton: false,
            timer: 2000
          });
          // Redirige al login después del registro exitoso
          this.router.navigate(['/login']);
        } else if (response.error) {
          Swal.fire({
            icon: "error",
            title: response.error,
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        // Mensaje genérico si no se obtiene respuesta del backend
        const mensaje =
          error.error?.error ||
          error.message ||
          "Ocurrió un error inesperado. Inténtalo de nuevo.";

        Swal.fire({
          icon: "error",
          title: mensaje,
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }
    );
  }
}
