// src/main/java/com/example/backendCookShare/model/Recette.java
package com.example.backendCookShare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "recipes")
public class Recette {

    @Id
    @Column(name = "id_recette")
    private String idRecette;

    @Column(name = "titre", nullable = false)
    private String titre;

    @Column(name = "description")
    private String description;

    @Column(name = "instructions", nullable = false)
    private String instructions;

    @Column(name = "temps_preparation")
    private Integer tempsPreparation;

    @Column(name = "temps_cuisson")
    private Integer tempsCuisson;

    @Column(name = "portions")
    private Integer portions;

    @Column(name = "niveau_difficulte")
    private String niveauDifficulte;

    @Column(name = "type_plat")
    private String typePlat;

    @Column(name = "regime_alimentaire")
    private String regimeAlimentaire;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "video_url") 
    private String videoUrl;

    @Column(name = "calories") 
    private Integer calories;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur auteur;
}
