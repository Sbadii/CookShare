package com.example.backendCookShare.repository;


import com.example.backendCookShare.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, String> {
    
    Optional<Utilisateur> findByNomUtilisateur(String nomUtilisateur);
    Optional<Utilisateur> findByEmail(String email);
}
