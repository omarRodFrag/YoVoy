import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnidadesComponent } from './unidades.component';
import { FormsModule } from '@angular/forms';

describe('UnidadesComponent', () => {
  let component: UnidadesComponent;
  let fixture: ComponentFixture<UnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial unidades data', () => {
    expect(component.unidades.length).toBeGreaterThan(0);
  });

  it('should filter unidades by estado', () => {
    component.cambiarFiltro('Disponible');
    expect(component.unidadesFiltradas.every(u => u.estado === 'Disponible')).toBeTrue();
  });

  it('should calculate totalDisponibles correctly', () => {
    const expected = component.unidades.filter(u => u.estado === 'Disponible').length;
    expect(component.totalDisponibles).toEqual(expected);
  });
});