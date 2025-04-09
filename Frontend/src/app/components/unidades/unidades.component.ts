import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  unidades: Unidad[] = [
    {
      id: 1,
      matricula: 'AGS-123-45',
      numeroEconomico: 'UNI-001',
      modelo: 'Mercedes-Benz O500',
      capacidad: 50,
      estado: 'Disponible',
      ultimaRevision: '2023-05-15',
      rutaAsignada: ''
    },
    {
      id: 2,
      matricula: 'AGS-456-78',
      numeroEconomico: 'UNI-002',
      modelo: 'Volvo 7700',
      capacidad: 45,
      estado: 'En Ruta',
      ultimaRevision: '2023-06-20',
      rutaAsignada: 'Ruta 20'
    },
    {
      id: 3,
      matricula: 'AGS-789-01',
      numeroEconomico: 'UNI-003',
      modelo: 'Scania Citywide',
      capacidad: 55,
      estado: 'Mantenimiento',
      ultimaRevision: '2023-04-10',
      rutaAsignada: ''
    },
    {
      id: 4,
      matricula: 'AGS-234-56',
      numeroEconomico: 'UNI-004',
      modelo: 'Mercedes-Benz O500',
      capacidad: 50,
      estado: 'Disponible',
      ultimaRevision: '2023-07-01',
      rutaAsignada: ''
    },
    {
      id: 5,
      matricula: 'AGS-567-89',
      numeroEconomico: 'UNI-005',
      modelo: 'Volvo 7700',
      capacidad: 45,
      estado: 'En Ruta',
      ultimaRevision: '2023-06-15',
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
}