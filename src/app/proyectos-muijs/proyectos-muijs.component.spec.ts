import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosMuijsComponent } from './proyectos-muijs.component';

describe('ProyectosMuijsComponent', () => {
  let component: ProyectosMuijsComponent;
  let fixture: ComponentFixture<ProyectosMuijsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosMuijsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosMuijsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
