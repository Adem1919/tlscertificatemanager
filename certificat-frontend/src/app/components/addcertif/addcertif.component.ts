import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CertificatService } from '../../services/certificat.service';
import { EtatCertificat } from '../../models/certificat.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcertif',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addcertif.component.html',
  styleUrls: ['./addcertif.component.css']
})
export class AddcertifComponent {
  form: FormGroup;
  etats: string[] = ['NONGENERE'];
  //etats = Object.values(EtatCertificat);

  constructor(private fb: FormBuilder, private certService: CertificatService,private router: Router,
  ) {
    this.form = this.fb.group({
      nomDomaine: ['', Validators.required],
      //dateGeneration: ['', Validators.required],
      //dateExpiration: ['', Validators.required],
      authoriteCertificat: ['', Validators.required],
      etatCertificat: ['', Validators.required],
      //contenuCertificat: ['', Validators.required],
      localite: ['', Validators.required],
      organisation: ['', Validators.required],
      pays: ['', Validators.required]
    });
  }

  addCertificat() {
    if (this.form.valid) {
      this.certService.addCertificat(this.form.value).subscribe(() => {
          this.router.navigate(['/list-certif']); 
        alert('Certificat ajouté avec succès !');
        this.form.reset();
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
