package tn.esprit.certificatmanager.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Certificat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idCertificat;

    String nomDomaine;

    @Column(nullable = true)
    LocalDate dateGeneration;

    @Column(nullable = true)
    LocalDate dateExpiration;

    String AuthoriteCertificat;

    @Enumerated(EnumType.STRING)
    EtatCertificat etatCertificat;

    String contenuCertificat;

    String localite;
    String organisation;
    String pays;

    String emetteur;

    String numerodeserie;

}
