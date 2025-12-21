# 📋 Structure du Projet CookShare

## Vue d'ensemble

**CookShare** est une application web fullstack permettant aux utilisateurs de partager des recettes de cuisine. Le projet est organisé en trois parties principales :
- **backendCookShare** : API REST développée avec Spring Boot (Java)
- **frontend-next** : Application frontend avec Next.js (TypeScript)
- **frontendcookshare** : Application frontend alternative avec React (TypeScript)

---

## 🏗️ Structure Globale

```
CookShare/
├── backendCookShare/          # Backend Spring Boot
├── frontend-next/             # Frontend Next.js
├── frontendcookshare/         # Frontend React
└── README.md
```

---

## 🔧 Backend - Structure Détaillée

Le backend suit l'architecture **Spring Boot** avec une organisation en packages selon les responsabilités (couches).

### Package Principal : `com.example.backendCookShare`

```
backendCookShare/
├── BackendCookShareApplication.java    # Point d'entrée de l'application
├── config/                              # Configuration
├── controller/                          # Contrôleurs REST
├── model/                               # Modèles de données
│   ├── dto/                             # Data Transfer Objects
│   ├── entity/                          # Entités JPA
│   └── enums/                           # Énumérations
├── repository/                          # Interfaces de persistance
├── security/                            # Sécurité et authentification
└── service/                             # Logique métier
```

---

## 📦 Description des Packages Backend

### 1. **Package `config`** - Configuration

**Utilité** : Contient toutes les configurations de l'application Spring Boot.

#### Fichiers :

- **`SecurityConfig.java`**
  - **Rôle** : Configure la chaîne de sécurité Spring Security
  - **Fonctionnalités** :
    - Désactive CSRF pour les APIs REST
    - Active CORS via `CorsConfig`
    - Autorise les routes `/auth/**` sans authentification (login, register)
    - Protège toutes les autres routes (nécessitent JWT)
    - Configure la session comme STATELESS (pas de session serveur)
    - Ajoute le filtre JWT dans la chaîne de sécurité

- **`CorsConfig.java`**
  - **Rôle** : Configure Cross-Origin Resource Sharing (CORS)
  - **Fonctionnalités** :
    - Autorise les requêtes depuis `http://localhost:3000` (frontend)
    - Autorise les méthodes HTTP : GET, POST, PUT, DELETE, OPTIONS
    - Autorise tous les headers
    - Active les credentials (cookies, headers d'authentification)

- **`PasswordEncoderConfig.java`**
  - **Rôle** : Configure l'encodeur de mots de passe
  - **Fonctionnalités** :
    - Fournit un bean `BCryptPasswordEncoder` pour hasher les mots de passe
    - Utilisé lors de l'inscription et de la vérification des mots de passe

---

### 2. **Package `controller`** - Contrôleurs REST

**Utilité** : Gère les endpoints HTTP et fait le lien entre les requêtes HTTP et les services.

#### Fichiers :

- **`AuthController.java`**
  - **Rôle** : Gère les endpoints d'authentification
  - **Endpoints** :
    - `POST /auth/register` : Inscription d'un nouvel utilisateur
    - `POST /auth/login` : Connexion d'un utilisateur existant
  - **Responsabilités** :
    - Reçoit les requêtes HTTP
    - Délègue la logique métier à `AuthService`
    - Retourne les réponses HTTP appropriées

---

### 3. **Package `service`** - Logique Métier

**Utilité** : Contient toute la logique métier de l'application.

#### Fichiers :

- **`AuthService.java`**
  - **Rôle** : Gère l'authentification et l'inscription
  - **Méthodes** :
    - `register(RegisterRequest)` : 
      - Vérifie si l'email existe déjà
      - Hash le mot de passe
      - Crée et sauvegarde l'utilisateur
      - Génère un token JWT
      - Retourne la réponse avec le token et les infos utilisateur
    - `login(LoginRequest)` :
      - Vérifie l'email et le mot de passe
      - Génère un token JWT si les identifiants sont valides
      - Retourne la réponse avec le token et les infos utilisateur

- **`JwtService.java`**
  - **Rôle** : Gère la génération, l'extraction et la validation des tokens JWT
  - **Méthodes** :
    - `generateToken(User)` : Génère un token JWT avec email, id, username
    - `extractEmail(String token)` : Extrait l'email depuis le token
    - `isTokenValid(String token, String email)` : Vérifie la validité du token
    - `isTokenExpired(String token)` : Vérifie si le token a expiré
  - **Configuration** : Utilise une clé secrète depuis `application.properties`

- **`RefreshTokenService.java`**
  - **Rôle** : Gère les refresh tokens pour renouveler les tokens d'accès
  - **Fonctionnalités** :
    - Création de refresh tokens
    - Vérification de validité
    - Rotation des tokens pour sécurité

---

### 4. **Package `security`** - Sécurité

**Utilité** : Contient les composants de sécurité personnalisés.

#### Fichiers :

- **`JwtAuthFilter.java`**
  - **Rôle** : Filtre qui intercepte chaque requête HTTP pour valider le JWT
  - **Fonctionnement** :
    1. Extrait le token JWT du header `Authorization`
    2. Vérifie si le token est présent et valide
    3. Charge les détails de l'utilisateur
    4. Configure l'authentification dans le SecurityContext
    5. Laisse passer la requête vers le contrôleur
  - **Position** : Exécuté avant `UsernamePasswordAuthenticationFilter`

- **`UserDetailsServiceImpl.java`**
  - **Rôle** : Implémente l'interface `UserDetailsService` de Spring Security
  - **Fonctionnalités** :
    - Charge un utilisateur par email depuis la base de données
    - Transforme l'entité `User` en `UserDetails` pour Spring Security

---

### 5. **Package `model.entity`** - Entités JPA

**Utilité** : Définit les modèles de données (tables de la base de données).

#### Fichiers :

- **`User.java`**
  - **Rôle** : Entité représentant un utilisateur
  - **Champs** :
    - `id` : Identifiant unique
    - `email` : Email (unique)
    - `password` : Mot de passe hashé
    - `username` : Nom d'utilisateur
    - `fullName` : Nom complet
    - `avatarUrl` : URL de l'avatar
    - `createdAt` : Date de création
  - **Relations** :
    - `@OneToMany` avec `Post` (un utilisateur a plusieurs posts)
    - `@OneToMany` avec `Comment` (un utilisateur a plusieurs commentaires)
    - `@OneToMany` avec `Like` (un utilisateur a plusieurs likes)
    - `@OneToMany` avec `MealPlannerEntry` (planificateur de repas)

- **`Post.java`**
  - **Rôle** : Entité représentant une recette/post
  - **Champs** :
    - `id` : Identifiant unique
    - `title` : Titre de la recette
    - `description` : Description
    - `tutorial` : Instructions de préparation
    - `ingredients` : Liste des ingrédients
    - `cookingTime` : Temps de cuisson
    - `imageUrl` : URL de l'image
    - `createdAt` : Date de création
    - `theme` : Thème (enum)
    - `type` : Type de repas (enum : BREAKFAST, LUNCH, DINNER, etc.)
    - `diet` : Régime alimentaire (enum)
  - **Relations** :
    - `@ManyToOne` avec `User` (auteur du post)
    - `@OneToMany` avec `Comment` (commentaires sur le post)
    - `@OneToMany` avec `Like` (likes sur le post)

- **`Comment.java`**
  - **Rôle** : Entité représentant un commentaire sur un post
  - **Champs** :
    - `id` : Identifiant unique
    - `content` : Contenu du commentaire
    - `createdAt` : Date de création
  - **Relations** :
    - `@ManyToOne` avec `User` (auteur du commentaire)
    - `@ManyToOne` avec `Post` (post commenté)

- **`Like.java`**
  - **Rôle** : Entité représentant un like sur un post
  - **Relations** :
    - `@ManyToOne` avec `User` (utilisateur qui a liké)
    - `@ManyToOne` avec `Post` (post liké)

- **`MealPlannerEntry.java`**
  - **Rôle** : Entité représentant une entrée dans le planificateur de repas
  - **Champs** :
    - `id` : Identifiant unique
    - `date` : Date planifiée
    - `mealType` : Type de repas (breakfast, lunch, dinner, snack)
  - **Relations** :
    - `@ManyToOne` avec `User` (propriétaire du planner)
    - `@ManyToOne` avec `Post` (recette planifiée)

- **`RefreshToken.java`**
  - **Rôle** : Entité représentant un refresh token
  - **Fonctionnalités** :
    - Stocke les tokens de rafraîchissement
    - Permet de renouveler les tokens d'accès expirés

---

### 6. **Package `model.dto`** - Data Transfer Objects

**Utilité** : Objets utilisés pour transférer des données entre le client et le serveur (sans logique métier).

#### Sous-packages :

- **`request`** : DTOs pour les requêtes entrantes
  - `RegisterRequest.java` : Données d'inscription (email, password, username, fullName)
  - `LoginRequest.java` : Données de connexion (email, password)
  - `RefreshTokenRequest.java` : Requête pour renouveler un token

- **`response`** : DTOs pour les réponses sortantes
  - `AuthResponse.java` : Réponse d'authentification (token, userId, username, email, avatarUrl)
  - `RefreshTokenResponse.java` : Réponse avec nouveau token

---

### 7. **Package `model.enums`** - Énumérations

**Utilité** : Définit des types constants pour certaines propriétés.

#### Fichiers :

- **`PostType.java`**
  - **Valeurs** : BREAKFAST, LUNCH, DINNER, SNACK, DESSERT, DRINK, APPETIZER, SAUCE, OTHER
  - **Rôle** : Catégorise les types de repas/recettes

- **`Theme.java`**
  - **Rôle** : Définit les thèmes de recettes (ex: ITALIAN, ASIAN, FRENCH, etc.)

- **`Diet.java`**
  - **Rôle** : Définit les régimes alimentaires (ex: VEGETARIAN, VEGAN, GLUTEN_FREE, etc.)

---

### 8. **Package `repository`** - Couche de Persistance

**Utilité** : Interfaces Spring Data JPA pour accéder aux données de la base de données.

#### Fichiers :

- **`UserRepository.java`**
  - **Rôle** : Interface de repository pour l'entité `User`
  - **Méthodes** :
    - `findByEmail(String email)` : Trouve un utilisateur par email
    - `existsByEmail(String email)` : Vérifie si un email existe
    - Hérite de `JpaRepository` (CRUD automatique)

- **`RefreshTokenRepository.java`**
  - **Rôle** : Interface de repository pour l'entité `RefreshToken`
  - **Fonctionnalités** : Gestion des refresh tokens en base de données

---

### 9. **Fichier Principal : `BackendCookShareApplication.java`**

**Utilité** : Point d'entrée de l'application Spring Boot.
- Lance l'application
- Active l'auto-configuration Spring Boot
- Active le scan des composants

---

## 🔐 Sécurité

L'application utilise :
- **Spring Security** : Framework de sécurité
- **JWT (JSON Web Tokens)** : Authentification stateless
- **BCrypt** : Hachage des mots de passe
- **CORS** : Configuration pour permettre les requêtes cross-origin

---

## 🗄️ Base de Données

- **SGBD** : MySQL
- **ORM** : Hibernate (via Spring Data JPA)
- **Configuration** : `application.properties`
  - URL : `jdbc:mysql://localhost:3306/cookshare`
  - Mode : `update` (crée/met à jour les tables automatiquement)

---

## 🔄 Flux d'Authentification

1. **Inscription** :
   - Client → `POST /auth/register`
   - Backend vérifie l'email, hash le mot de passe, crée l'utilisateur
   - Génère un token JWT
   - Retourne le token au client

2. **Connexion** :
   - Client → `POST /auth/login`
   - Backend vérifie email/password
   - Génère un token JWT
   - Retourne le token au client

3. **Requêtes Authentifiées** :
   - Client envoie le token dans le header `Authorization: Bearer <token>`
   - `JwtAuthFilter` valide le token
   - Si valide, la requête est autorisée

---

## 📝 Technologies Utilisées

- **Framework** : Spring Boot 3.5.7
- **Langage** : Java 21
- **Base de données** : MySQL
- **Sécurité** : Spring Security + JWT (jjwt 0.11.5)
- **ORM** : Hibernate / JPA
- **Build** : Maven
- **Outils** : Lombok (réduction de boilerplate)

---

## 🎯 Architecture

Le backend suit le pattern **MVC (Model-View-Controller)** adapté pour une API REST :

- **Controller** : Reçoit les requêtes HTTP
- **Service** : Logique métier
- **Repository** : Accès aux données
- **Entity** : Modèles de données
- **DTO** : Transfert de données
- **Security** : Authentification et autorisation
- **Config** : Configuration de l'application

Cette architecture permet une séparation claire des responsabilités et facilite la maintenance.

