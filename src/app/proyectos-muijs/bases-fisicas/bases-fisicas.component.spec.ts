import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasesFisicasComponent } from './bases-fisicas.component';

describe('BasesFisicasComponent', () => {
  let component: BasesFisicasComponent;
  let fixture: ComponentFixture<BasesFisicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasesFisicasComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BasesFisicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
