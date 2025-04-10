import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Unidad {
  id: number;
  matricula: string;
  numeroEconomico: string;
  modelo: string;
  capacidad: number;
  estado: 'Disponible' | 'En Ruta' | 'Mantenimiento';
  ultimaRevision: string;
  rutaAsignada?: string;
}

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css'],
  imports: [CommonModule] 
})
export class UnidadesComponent {
  filtroEstado: string = 'Todas';
  searchText: string = '';

  constructor(private router: Router) {} // <--- INYECCIÓN DEL ROUTER
  
  unidades: Unidad[] = [
    {
      id: 1,
      matricula: 'AGS-757-73',
      numeroEconomico: 'UNI-001',
      modelo: 'Volvo 7700',
      capacidad: 54,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-05-03',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 2,
      matricula: 'AGS-840-70',
      numeroEconomico: 'UNI-002',
      modelo: 'MAN Lion’s City',
      capacidad: 47,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-10-10',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 3,
      matricula: 'AGS-137-75',
      numeroEconomico: 'UNI-003',
      modelo: 'MAN Lion’s City',
      capacidad: 50,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-10-22',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 4,
      matricula: 'AGS-506-66',
      numeroEconomico: 'UNI-004',
      modelo: 'Scania Citywide',
      capacidad: 45,
      estado: 'En Ruta',
      ultimaRevision: '2023-06-12',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 5,
      matricula: 'AGS-904-96',
      numeroEconomico: 'UNI-005',
      modelo: 'Mercedes-Benz O500',
      capacidad: 55,
      estado: 'Disponible',
      ultimaRevision: '2023-08-01',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 6,
      matricula: 'AGS-293-20',
      numeroEconomico: 'UNI-006',
      modelo: 'Volvo 7700',
      capacidad: 48,
      estado: 'Disponible',
      ultimaRevision: '2023-09-12',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 7,
      matricula: 'AGS-313-45',
      numeroEconomico: 'UNI-007',
      modelo: 'Scania Citywide',
      capacidad: 50,
      estado: 'En Ruta',
      ultimaRevision: '2023-11-05',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 8,
      matricula: 'AGS-415-78',
      numeroEconomico: 'UNI-008',
      modelo: 'MAN Lion’s City',
      capacidad: 46,
      estado: 'Disponible',
      ultimaRevision: '2023-12-15',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 9,
      matricula: 'AGS-519-22',
      numeroEconomico: 'UNI-009',
      modelo: 'Mercedes-Benz O500',
      capacidad: 52,
      estado: 'En Ruta',
      ultimaRevision: '2024-01-20',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 10,
      matricula: 'AGS-623-11',
      numeroEconomico: 'UNI-010',
      modelo: 'Volvo 7700',
      capacidad: 44,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-07-30',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 11,
      matricula: 'AGS-734-09',
      numeroEconomico: 'UNI-011',
      modelo: 'Scania Citywide',
      capacidad: 49,
      estado: 'En Ruta',
      ultimaRevision: '2024-02-10',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 12,
      matricula: 'AGS-823-88',
      numeroEconomico: 'UNI-012',
      modelo: 'Volvo 7700',
      capacidad: 50,
      estado: 'Disponible',
      ultimaRevision: '2024-03-05',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 13,
      matricula: 'AGS-907-64',
      numeroEconomico: 'UNI-013',
      modelo: 'Mercedes-Benz O500',
      capacidad: 46,
      estado: 'Mantenimiento',
      ultimaRevision: '2024-03-20',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 14,
      matricula: 'AGS-112-90',
      numeroEconomico: 'UNI-014',
      modelo: 'Scania Citywide',
      capacidad: 51,
      estado: 'Disponible',
      ultimaRevision: '2024-01-18',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 15,
      matricula: 'AGS-215-33',
      numeroEconomico: 'UNI-015',
      modelo: 'MAN Lion’s City',
      capacidad: 47,
      estado: 'En Ruta',
      ultimaRevision: '2024-02-22',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 16,
      matricula: 'AGS-314-55',
      numeroEconomico: 'UNI-016',
      modelo: 'Volvo 7700',
      capacidad: 53,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-11-14',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 17,
      matricula: 'AGS-417-36',
      numeroEconomico: 'UNI-017',
      modelo: 'MAN Lion’s City',
      capacidad: 48,
      estado: 'Disponible',
      ultimaRevision: '2024-03-11',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 18,
      matricula: 'AGS-521-69',
      numeroEconomico: 'UNI-018',
      modelo: 'Mercedes-Benz O500',
      capacidad: 45,
      estado: 'En Ruta',
      ultimaRevision: '2024-04-01',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 19,
      matricula: 'AGS-629-82',
      numeroEconomico: 'UNI-019',
      modelo: 'Scania Citywide',
      capacidad: 50,
      estado: 'Disponible',
      ultimaRevision: '2023-08-08',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 20,
      matricula: 'AGS-731-91',
      numeroEconomico: 'UNI-020',
      modelo: 'Volvo 7700',
      capacidad: 44,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-10-20',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 21,
      matricula: 'AGS-836-18',
      numeroEconomico: 'UNI-021',
      modelo: 'MAN Lion’s City',
      capacidad: 52,
      estado: 'En Ruta',
      ultimaRevision: '2023-12-12',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 22,
      matricula: 'AGS-948-06',
      numeroEconomico: 'UNI-022',
      modelo: 'Mercedes-Benz O500',
      capacidad: 48,
      estado: 'Disponible',
      ultimaRevision: '2024-02-28',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 23,
      matricula: 'AGS-053-73',
      numeroEconomico: 'UNI-023',
      modelo: 'Scania Citywide',
      capacidad: 47,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-11-01',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 24,
      matricula: 'AGS-162-24',
      numeroEconomico: 'UNI-024',
      modelo: 'Volvo 7700',
      capacidad: 45,
      estado: 'En Ruta',
      ultimaRevision: '2024-01-12',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 25,
      matricula: 'AGS-274-19',
      numeroEconomico: 'UNI-025',
      modelo: 'MAN Lion’s City',
      capacidad: 46,
      estado: 'Disponible',
      ultimaRevision: '2023-10-05',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 26,
      matricula: 'AGS-381-88',
      numeroEconomico: 'UNI-026',
      modelo: 'Mercedes-Benz O500',
      capacidad: 49,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-09-22',
      rutaAsignada: 'Ruta 40'
    },
    {
      id: 27,
      matricula: 'AGS-493-17',
      numeroEconomico: 'UNI-027',
      modelo: 'Scania Citywide',
      capacidad: 54,
      estado: 'En Ruta',
      ultimaRevision: '2023-08-25',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 28,
      matricula: 'AGS-604-62',
      numeroEconomico: 'UNI-028',
      modelo: 'Volvo 7700',
      capacidad: 50,
      estado: 'Disponible',
      ultimaRevision: '2024-01-30',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 29,
      matricula: 'AGS-715-31',
      numeroEconomico: 'UNI-029',
      modelo: 'MAN Lion’s City',
      capacidad: 47,
      estado: 'Mantenimiento',
      ultimaRevision: '2024-03-15',
      rutaAsignada: 'Ruta 50'
    },
    {
      id: 30,
      matricula: 'AGS-826-04',
      numeroEconomico: 'UNI-030',
      modelo: 'Mercedes-Benz O500',
      capacidad: 52,
      estado: 'En Ruta',
      ultimaRevision: '2024-02-07',
      rutaAsignada: 'Ruta 40'
    }
  ];
  

  get unidadesFiltradas(): Unidad[] {
    return this.unidades.filter(unidad => {
      const coincideEstado = this.filtroEstado === 'Todas' || unidad.estado === this.filtroEstado;
      const coincideBusqueda = this.searchText === '' || 
        unidad.matricula.toLowerCase().includes(this.searchText.toLowerCase()) || 
        unidad.numeroEconomico.toLowerCase().includes(this.searchText.toLowerCase()) ||
        unidad.modelo.toLowerCase().includes(this.searchText.toLowerCase());
      return coincideEstado && coincideBusqueda;
    });
  }

  get totalDisponibles(): number {
    return this.unidades.filter(u => u.estado === 'Disponible').length;
  }

  cambiarFiltro(estado: string): void {
    this.filtroEstado = estado;
  }

  irAPrincipal(): void {
    this.router.navigate(['/mapa']); // Cambia la ruta si es diferente
  }
  
}