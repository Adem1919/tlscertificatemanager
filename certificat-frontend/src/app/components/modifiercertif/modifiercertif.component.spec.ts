import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiercertifComponent } from './modifiercertif.component';

describe('ModifiercertifComponent', () => {
  let component: ModifiercertifComponent;
  let fixture: ComponentFixture<ModifiercertifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiercertifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifiercertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
