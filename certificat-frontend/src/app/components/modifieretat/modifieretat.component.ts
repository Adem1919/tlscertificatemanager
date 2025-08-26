import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificatService } from '../../services/certificat.service';
import { Certificat } from '../../models/certificat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifieretat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modifieretat.component.html',
  styleUrls: ['./modifieretat.component.css']
})
export class ModifierEtatComponent implements OnInit {
  form: FormGroup;
  etats: string[] = ['REVOQUE']; // seule option disponible
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
      etatCertificat: ['', Validators.required] // seul champ éditable
    });
  }

  ngOnInit() {
  this.certificatId = +this.route.snapshot.paramMap.get('id')!;
  this.certService.getCertificatById(this.certificatId).subscribe(cert => {
    this.form.patchValue(cert);
    // L'état actuel reste affiché, mais seul REVOQUE est sélectionnable
    this.etats = ['REVOQUE'];
  });
}


  updateEtat() {
    if (this.form.valid) {
      const updatedCertificat: Certificat = {
        ...this.form.getRawValue(),
        idCertificat: this.certificatId
      };
      this.certService.updateCertificat(updatedCertificat).subscribe(() => {
        alert('État du certificat mis à jour avec succès !');
        this.router.navigate(['/list-certif']);
      });
    }
  }
}
