package tn.esprit.certificatmanager.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.certificatmanager.entity.Certificat;
import tn.esprit.certificatmanager.repository.CertificatRepository;

import java.util.List;

@Service
@AllArgsConstructor

public class CertificatServiceImpl implements ICertificatService {

    CertificatRepository certificatRepository;


    public List<Certificat> retrieveAllCertificats() {
        return certificatRepository.findAll();
    }



    public Certificat retrieveCertificat(Long certificatId) {
        return certificatRepository.findById(certificatId).orElse(null);
    }


    public Certificat addCertificat(Certificat c) {
        return certificatRepository.save(c);
    }


    public Certificat modifyCertificat(Certificat c) {
        return certificatRepository.save(c);
    }


    public void removeCertificat(Long certificatId) {
        certificatRepository.deleteById(certificatId);
    }


    public List<Certificat> findCertificatsExpirés() {
        return certificatRepository.findByDateExpirationBefore(java.time.LocalDate.now());
    }


    public List<Certificat> findByNomDomaine(String nomDomaine) {
        return certificatRepository.findByNomDomaine(nomDomaine);
    }
}
