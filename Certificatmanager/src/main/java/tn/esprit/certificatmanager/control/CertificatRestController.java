package tn.esprit.certificatmanager.control;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.certificatmanager.entity.Certificat;
import tn.esprit.certificatmanager.service.ICertificatService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping("/certificat")

public class CertificatRestController {
    private final ICertificatService certificatService;

    @GetMapping("/retrieve-all-certificats")
    public List<Certificat> getAllCertificats() {
        return certificatService.retrieveAllCertificats();
    }

    @GetMapping("/retrieve-certificat/{id}")
    public Certificat getCertificatById(@PathVariable("id") Long id) {
        return certificatService.retrieveCertificat(id);
    }

    @PostMapping("/add-certificat")
    public Certificat addCertificat(@RequestBody Certificat certificat) {
        return certificatService.addCertificat(certificat);
    }

    @PutMapping("/modify-certificat")
    public Certificat updateCertificat(@RequestBody Certificat certificat) {
        return certificatService.modifyCertificat(certificat);
    }

    @DeleteMapping("/remove-certificat/{id}")
    public void deleteCertificat(@PathVariable("id") Long id) {
        certificatService.removeCertificat(id);
    }
}
