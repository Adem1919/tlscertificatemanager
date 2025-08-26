
package tn.esprit.certificatmanager.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.certificatmanager.entity.Certificat;
import tn.esprit.certificatmanager.entity.EtatCertificat;

import java.time.LocalDate;
import java.util.List;

public interface CertificatRepository extends JpaRepository<Certificat, Long> {


    List<Certificat> findByDateExpirationBefore(LocalDate date);
    List<Certificat> findByNomDomaine(String nomDomaine);

}
