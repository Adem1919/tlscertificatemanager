import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcertifComponent } from './addcertif.component';

describe('AddcertifComponent', () => {
  let component: AddcertifComponent;
  let fixture: ComponentFixture<AddcertifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcertifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
