import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Empleado {
  id: number;
  nombre: string;
  puesto: string;
  rutaAsignada: string;
  horario: string;
  estado: 'Disponible' | 'En Ruta' | 'En Descanso';
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  imports: [CommonModule]  // Importamos CommonModule aqu
})
export class PersonalComponent {
  filtroActivo: string = 'Todos';
  
  constructor(private router: Router) {} // <--- INYECCIÓN DEL ROUTER

  empleados: Empleado[] = [
    {
      id: 1,
      nombre: 'Juan Pérez Martínez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '06:00 - 14:00',
      estado: 'En Ruta'
    },
    {
      id: 2,
      nombre: 'María García López',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '14:00 - 22:00',
      estado: 'Disponible'
    },
    {
      id: 3,
      nombre: 'Carlos Ramírez Sánchez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '22:00 - 06:00',
      estado: 'En Descanso'
    },
    {
      id: 4,
      nombre: 'Ana Fernández Ruiz',
      puesto: 'Supervisor',
      rutaAsignada: 'Todas',
      horario: '08:00 - 17:00',
      estado: 'Disponible'
    },
    {
      id: 5,
      nombre: 'Luis Herrera Torres',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '06:00 - 14:00',
      estado: 'Disponible'
    },
    {
      id: 6,
      nombre: 'Sofía Martínez Gómez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '14:00 - 22:00',
      estado: 'En Ruta'
    },
    {
      id: 7,
      nombre: 'José López Ramírez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '22:00 - 06:00',
      estado: 'Disponible'
    },
    {
      id: 8,
      nombre: 'Gabriela Díaz Pérez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '14:00 - 22:00',
      estado: 'Disponible'
    },
    {
      id: 9,
      nombre: 'Ricardo Mendoza Salinas',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '22:00 - 06:00',
      estado: 'En Ruta'
    },
    {
      id: 10,
      nombre: 'Isabel Navarro Domínguez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '14:00 - 22:00',
      estado: 'En Ruta'
    },
    {
      id: 11,
      nombre: 'Diego Romero Nieto',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '06:00 - 14:00',
      estado: 'En Ruta'
    },
    {
      id: 12,
      nombre: 'Natalia Vega Rosas',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '14:00 - 22:00',
      estado: 'En Descanso'
    },
    {
      id: 13,
      nombre: 'Eduardo Silva Castañeda',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '22:00 - 06:00',
      estado: 'Disponible'
    },
    {
      id: 14,
      nombre: 'Paola Navarro Beltrán',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '14:00 - 22:00',
      estado: 'En Ruta'
    },
    {
      id: 15,
      nombre: 'Bruno Escobar Molina',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '22:00 - 06:00',
      estado: 'Disponible'
    },
    {
      id: 16,
      nombre: 'Héctor Cruz Sosa',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '06:00 - 14:00',
      estado: 'En Ruta'
    },
    {
      id: 17,
      nombre: 'Mario Godínez Tapia',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '22:00 - 06:00',
      estado: 'En Descanso'
    },
    {
      id: 18,
      nombre: 'Esteban Vázquez Juárez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '06:00 - 14:00',
      estado: 'En Ruta'
    },
    {
      id: 19,
      nombre: 'René Gallardo Carrillo',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '22:00 - 06:00',
      estado: 'En Ruta'
    },
    {
      id: 20,
      nombre: 'Sandra López Muñoz',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '14:00 - 22:00',
      estado: 'Disponible'
    },
    {
      id: 21,
      nombre: 'Javier Torres Guzmán',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '06:00 - 14:00',
      estado: 'En Ruta'
    },
    {
      id: 22,
      nombre: 'Lorena Ruiz Salinas',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '14:00 - 22:00',
      estado: 'Disponible'
    },
    {
      id: 23,
      nombre: 'Miguel Ángel Pérez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '06:00 - 14:00',
      estado: 'Disponible'
    },
    {
      id: 24,
      nombre: 'Claudia Jiménez Carrillo',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '14:00 - 22:00',
      estado: 'En Ruta'
    },
    {
      id: 25,
      nombre: 'Rafael Castillo Navarro',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '22:00 - 06:00',
      estado: 'En Ruta'
    },
    {
      id: 26,
      nombre: 'Lucía Torres Salazar',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '22:00 - 06:00',
      estado: 'En Descanso'
    },
    {
      id: 27,
      nombre: 'Carlos Vázquez Herrera',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '06:00 - 14:00',
      estado: 'Disponible'
    },
    {
      id: 28,
      nombre: 'Karen Ríos Medina',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '14:00 - 22:00',
      estado: 'Disponible'
    },
    {
      id: 29,
      nombre: 'Alonso Cruz Peña',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '06:00 - 14:00',
      estado: 'En Ruta'
    },
    {
      id: 30,
      nombre: 'Regina González Téllez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '14:00 - 22:00',
      estado: 'En Descanso'
    },
    {
      id: 31,
      nombre: 'Felipe Morales Pacheco',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '22:00 - 06:00',
      estado: 'Disponible'
    },
    {
      id: 32,
      nombre: 'Daniela Esquivel Ramos',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '14:00 - 22:00',
      estado: 'En Ruta'
    },
    {
      id: 33,
      nombre: 'Erick Núñez Aguilar',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '22:00 - 06:00',
      estado: 'En Ruta'
    },
    {
      id: 34,
      nombre: 'Julia Mendoza Vargas',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '06:00 - 14:00',
      estado: 'En Ruta'
    },
    {
      id: 35,
      nombre: 'Tomás Arias Sandoval',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '22:00 - 06:00',
      estado: 'Disponible'
    },
    {
      id: 36,
      nombre: 'Marina Cervantes Robles',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 40',
      horario: '06:00 - 14:00',
      estado: 'Disponible'
    },
    {
      id: 37,
      nombre: 'Alan Torres Espinoza',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '14:00 - 22:00',
      estado: 'En Ruta'
    },
    {
      id: 38,
      nombre: 'Emma Salgado Domínguez',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 20',
      horario: '14:00 - 22:00',
      estado: 'En Descanso'
    },
    {
      id: 39,
      nombre: 'Omar Medina Flores',
      puesto: 'Conductor',
      rutaAsignada: 'Ruta 50',
      horario: '06:00 - 14:00',
      estado: 'Disponible'
    }
  ];
  

  get empleadosFiltrados(): Empleado[] {
    if (this.filtroActivo === 'Todos') {
      return this.empleados;
    }
    
    return this.empleados.filter(empleado => {
      if (this.filtroActivo === 'Disponibles') {
        return empleado.estado === 'Disponible';
      } else if (this.filtroActivo === 'En Ruta') {
        return empleado.estado === 'En Ruta';
      } else if (this.filtroActivo === 'En Descanso') {
        return empleado.estado === 'En Descanso';
      }
      return true;
    });
  }

  cambiarFiltro(filtro: string): void {
    this.filtroActivo = filtro;
  }

  irAPrincipal(): void {
    this.router.navigate(['/mapa']); // Cambia la ruta si es diferente
  }
}