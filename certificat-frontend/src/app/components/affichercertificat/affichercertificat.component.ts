import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificatService } from '../../services/certificat.service';
import { Certificat } from '../../models/certificat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-affichercertificat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './affichercertificat.component.html',
  styleUrls: ['./affichercertificat.component.css']
})
export class AffichercertificatComponent implements OnInit {
  certificat!: Certificat;

  showFullContent = false;


  constructor(
    private route: ActivatedRoute,
    private certService: CertificatService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.certService.getCertificatById(id).subscribe(data => {
      this.certificat = data;
    });
  }
}
