import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalComponent } from './personal.component';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empleados data', () => {
    expect(component.empleados.length).toBeGreaterThan(0);
  });

  it('should render empleados cards', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.empleado-card').length).toEqual(component.empleados.length);
  });
});