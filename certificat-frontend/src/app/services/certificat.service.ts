import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificat } from '../models/certificat.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {
  private apiUrl = 'http://localhost:8089/certificatmanager/certificat';

  constructor(private http: HttpClient) {}

  getAllCertificats(): Observable<Certificat[]> {
    return this.http.get<Certificat[]>(`${this.apiUrl}/retrieve-all-certificats`);
  }

  getCertificatById(id: number): Observable<Certificat> {
    return this.http.get<Certificat>(`${this.apiUrl}/retrieve-certificat/${id}`);
  }

  addCertificat(cert: any): Observable<Certificat> {
    return this.http.post<Certificat>(`${this.apiUrl}/add-certificat`, cert);
  }

  updateCertificat(cert: Certificat): Observable<Certificat> {
    return this.http.put<Certificat>(`${this.apiUrl}/modify-certificat`, cert);
  }

  deleteCertificat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-certificat/${id}`);
  }
}
