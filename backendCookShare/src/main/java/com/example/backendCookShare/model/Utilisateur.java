package com.example.backendCookShare.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "utilisateur")
public class Utilisateur {

    @Id
    @Column(name = "id_utilisateur")
    private String idUtilisateur;

    @Column(name = "nom") // ← Nouveau
    private String nom;

    @Column(name = "prenom") // ← Nouveau
    private String prenom;

    @Column(name = "nom_utilisateur", unique = true, nullable = false)
    private String nomUtilisateur;

    @Column(name = "biographie")
    private String biographie;

    @Column(name = "photo_profil_url")
    private String photoProfilUrl;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "mot_de_passe", nullable = false)
    private String motDePasse;
}