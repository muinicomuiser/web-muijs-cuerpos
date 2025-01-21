import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtractoresComponent } from './atractores.component';

describe('AtractoresComponent', () => {
  let component: AtractoresComponent;
  let fixture: ComponentFixture<AtractoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtractoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtractoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
