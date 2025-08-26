export enum EtatCertificat {
  VALIDE = 'VALIDE',
  REVOQUE = 'REVOQUE',
  NONGENERE = 'NONGENERE',
  ARENOUVELER = 'ARENOUVELER'
  // ajoute d'autres états si nécessaire
}

export interface Certificat {
  idCertificat?: number;             // optionnel pour l'ajout
  nomDomaine: string;
  dateGeneration: string;           // format ISO (ex : '2025-05-29')
  dateExpiration: string;
  authoriteCertificat: string;
  etatCertificat: EtatCertificat;
  contenuCertificat: string;
  localite: string;
  organisation: string;
  pays: string;
  emetteur: string;
  numerodeserie: string;
}
