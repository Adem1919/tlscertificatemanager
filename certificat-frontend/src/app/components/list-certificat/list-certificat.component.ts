import { Component, OnInit } from '@angular/core';
import { CertificatService } from '../../services/certificat.service';
import { Certificat } from '../../models/certificat.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-certificat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-certificat.component.html',
  styleUrls: ['./list-certificat.component.css'],
})
export class ListCertificatComponent implements OnInit {
  certificats: Certificat[] = [];
  user:any
  role:any

  constructor(private certService: CertificatService, private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      this.role = this.user.role;
    }
    this.loadCertificats();
  }

  loadCertificats() {
    this.certService.getAllCertificats().subscribe(data => {
      this.certificats = data;
    });
  }

  deleteCertificat(id: number) {
    this.certService.deleteCertificat(id).subscribe(() => {
      this.loadCertificats();
    });
  }
  modifCertificat(id: number){
      this.router.navigate(['/edit-certif', id]);
  }
  addCertificat(){
    this.router.navigate(['/add-certif']);
  }
  afficherCertificat(id: number) {
  this.router.navigate(['/afficher-certif', id]);
}
modifierEtatCertificat(id: number) {
  this.router.navigate(['/modifier-etat', id]);
}
  
}
