import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
}