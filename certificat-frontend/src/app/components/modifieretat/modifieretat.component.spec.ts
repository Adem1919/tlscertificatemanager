import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieretatComponent } from './modifieretat.component';

describe('ModifieretatComponent', () => {
  let component: ModifieretatComponent;
  let fixture: ComponentFixture<ModifieretatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifieretatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifieretatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
