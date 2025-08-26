import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificatService } from '../../services/certificat.service';
import { EtatCertificat, Certificat } from '../../models/certificat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifiercertif',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modifiercertif.component.html',
  styleUrls: ['./modifiercertif.component.css']
})
export class ModifiercertifComponent implements OnInit {
  form: FormGroup;
  etats: string[] = ['ARENOUVELER'];
  //etats = Object.values(EtatCertificat);
  certificatId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private certService: CertificatService
  ) {
  this.form = this.fb.group({
  idCertificat: [{ value: '', disabled: true }],
  nomDomaine: [{ value: '', disabled: true }],
  dateGeneration: [{ value: '', disabled: true }],
  dateExpiration: [{ value: '', disabled: true }],
  authoriteCertificat: [{ value: '', disabled: true }],
  localite: [{ value: '', disabled: true }],
  organisation: [{ value: '', disabled: true }],
  pays: [{ value: '', disabled: true }],
  etatCertificat: ['', Validators.required]
});


  }

  ngOnInit() {
    this.certificatId = +this.route.snapshot.paramMap.get('id')!;
    this.certService.getCertificatById(this.certificatId).subscribe(cert => {
      this.form.patchValue(cert);
    });
  }

  updateCertificat() {
    if (this.form.valid) {
      const updatedCertificat: Certificat = {
        ...this.form.getRawValue(), // getRawValue to include disabled fields
        idCertificat: this.certificatId
      };
      this.certService.updateCertificat(updatedCertificat).subscribe(() => {
        alert('Certificat modifié avec succès.');
        this.router.navigate(['/list-certif']);
      });
    }
  }
}
