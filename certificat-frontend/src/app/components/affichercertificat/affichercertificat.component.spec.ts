import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichercertificatComponent } from './affichercertificat.component';

describe('AffichercertificatComponent', () => {
  let component: AffichercertificatComponent;
  let fixture: ComponentFixture<AffichercertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichercertificatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichercertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
