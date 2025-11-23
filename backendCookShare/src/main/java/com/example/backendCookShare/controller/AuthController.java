package com.example.backendCookShare.controller;

import com.example.backendCookShare.model.Utilisateur;
import com.example.backendCookShare.repository.UtilisateurRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String motDePasse = credentials.get("motDePasse");

        if (email == null || motDePasse == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email et mot de passe requis"));
        }

        var utilisateurOpt = utilisateurRepository.findByEmail(email);
        if (utilisateurOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Email ou mot de passe incorrect"));
        }

        Utilisateur utilisateur = utilisateurOpt.get();

        // ✅ SEULE vérification (supprimez la comparaison en clair !)
        if (!passwordEncoder.matches(motDePasse, utilisateur.getMotDePasse())) {
            return ResponseEntity.status(401).body(Map.of("message", "Email ou mot de passe incorrect"));
        }

        return ResponseEntity.ok(Map.of(
            "idUtilisateur", utilisateur.getIdUtilisateur(),
            "nomUtilisateur", utilisateur.getNomUtilisateur(),
            "email", utilisateur.getEmail()
        ));
    }

    
    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
    System.out.println(">>> Requête register reçue : " + userData); 
    // ✅ Récupérez TOUTES les données
    String nom = userData.get("nom");
    String prenom = userData.get("prenom");
    String nomUtilisateur = userData.get("nomUtilisateur");
    String email = userData.get("email");
    String motDePasse = userData.get("motDePasse");

    // ✅ Validation complète
    if (nom == null || prenom == null || nomUtilisateur == null || email == null || motDePasse == null) {
        return ResponseEntity.badRequest().body(Map.of("message", "Tous les champs sont requis"));
    }

    if (utilisateurRepository.findByEmail(email).isPresent()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Cet email est déjà utilisé"));
    }
    if (utilisateurRepository.findByNomUtilisateur(nomUtilisateur).isPresent()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Ce nom d'utilisateur est déjà pris"));
    }

    // ✅ Créez l'utilisateur avec TOUTES les données
    Utilisateur utilisateur = new Utilisateur();
    utilisateur.setIdUtilisateur(java.util.UUID.randomUUID().toString());
    utilisateur.setNom(nom);               // ✅
    utilisateur.setPrenom(prenom);         // ✅
    utilisateur.setNomUtilisateur(nomUtilisateur);
    utilisateur.setEmail(email);
    utilisateur.setMotDePasse(passwordEncoder.encode(motDePasse));
    utilisateur.setBiographie("");
    utilisateur.setPhotoProfilUrl("");

    utilisateurRepository.save(utilisateur);

    // ✅ Retournez aussi nom et prenom dans la réponse (optionnel mais utile)
    return ResponseEntity.ok(Map.of(
        "idUtilisateur", utilisateur.getIdUtilisateur(),
        "nom", utilisateur.getNom(),               // ✅
        "prenom", utilisateur.getPrenom(),         // ✅
        "nomUtilisateur", utilisateur.getNomUtilisateur(),
        "email", utilisateur.getEmail()
    ));
}
}