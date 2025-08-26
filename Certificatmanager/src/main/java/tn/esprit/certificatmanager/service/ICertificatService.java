package tn.esprit.certificatmanager.service;
import tn.esprit.certificatmanager.entity.Certificat;

import java.util.List;

public interface ICertificatService {

    List<Certificat> retrieveAllCertificats();
    Certificat retrieveCertificat(Long certificatId);
    Certificat addCertificat(Certificat c);
    void removeCertificat(Long certificatId);
    Certificat modifyCertificat(Certificat certificat);

    // Exemple de méthode personnalisée : retrouver les certificats expirés
    List<Certificat> findCertificatsExpirés();

    // Exemple : retrouver les certificats par domaine
    List<Certificat> findByNomDomaine(String nomDomaine);

}
