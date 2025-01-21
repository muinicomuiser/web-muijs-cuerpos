import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidaParticulasComponent } from './vida-particulas.component';

describe('VidaParticulasComponent', () => {
  let component: VidaParticulasComponent;
  let fixture: ComponentFixture<VidaParticulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VidaParticulasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VidaParticulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
