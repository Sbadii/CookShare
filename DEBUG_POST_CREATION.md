# Guide de Débogage - Création de Post

## Problème
Lors de la soumission du formulaire de création de post, l'erreur "Failed to create post" s'affiche.

## Modifications Effectuées

### 1. Backend - PostController.java
✅ Simplifié l'annotation `@PostMapping` 
✅ Ajouté des logs détaillés pour tracer chaque étape
✅ Ajouté un try-catch pour capturer les exceptions

### 2. Backend - PostService.java
✅ Ajouté des logs détaillés pour :
   - L'extraction de l'email du contexte de sécurité
   - La recherche de l'utilisateur
   - Le traitement de l'image
   - La sauvegarde du post

### 3. Backend - JwtAuthFilter.java
✅ Ajouté des logs pour tracer l'authentification JWT
✅ Ajouté un try-catch pour capturer les erreurs de token

### 4. Backend - GlobalExceptionHandler.java
✅ Amélioré pour retourner des objets JSON au lieu de texte simple
✅ Ajouté des logs pour toutes les exceptions

### 5. Backend - application.properties
✅ Activé les logs DEBUG pour :
   - com.example.backendCookShare
   - org.springframework.security

### 6. Frontend - CreatePostModal.tsx
✅ Amélioré la gestion des erreurs pour parser JSON et texte
✅ Ajouté des logs console détaillés

## Comment Déboguer

### Étape 1: Vérifier les Logs Backend
Après avoir modifié les fichiers, le backend Spring Boot va se recompiler automatiquement.
Regardez la console du backend pour voir les messages de log.

### Étape 2: Tester la Création de Post
1. Ouvrez http://localhost:3000
2. Cliquez sur "Poster" dans le header
3. Remplissez le formulaire avec :
   - Title: "Test Recipe"
   - Image: n'importe quelle image
   - Cooking Time: "30 mins"
   - Description: "Test"
4. Cliquez sur "Share Recipe"

### Étape 3: Analyser les Logs

#### Dans la Console du Navigateur (F12), vous devriez voir :
```
📤 Sending post creation request...
Form data: {title: "Test Recipe", ...}
Image file: nom_du_fichier.jpg
📥 Response status: XXX
```

#### Dans la Console du Backend, vous devriez voir :
```
🔐 JWT Filter - POST /posts
📧 Extracted email from token: user@example.com
👤 User details loaded for: user@example.com
✅ Token is valid for user: user@example.com
✅ Authentication set in SecurityContext
📝 Received post creation request
Title: Test Recipe
...
🔍 Starting post creation process...
User email from security context: user@example.com
✅ User found: username (ID: X)
📸 Processing image upload...
✅ Image uploaded successfully: http://localhost:8080/uploads/...
🏗️ Building post entity...
💾 Saving post to database...
✅ Post saved with ID: X
✅ Post created successfully with ID: X
```

## Erreurs Possibles et Solutions

### Erreur 1: "User not found"
**Cause**: L'utilisateur n'est pas connecté ou le token est invalide
**Solution**: 
- Vérifiez que vous êtes bien connecté
- Reconnectez-vous pour obtenir un nouveau token

### Erreur 2: "Failed to upload image"
**Cause**: Problème d'accès au dossier uploads
**Solution**: 
- Vérifiez que le dossier "uploads" existe à la racine du projet backend
- Vérifiez les permissions du dossier

### Erreur 3: Token invalide
**Cause**: Le token JWT a expiré ou est mal formé
**Solution**: 
- Reconnectez-vous
- Vérifiez que le token est bien envoyé dans le header Authorization

### Erreur 4: 403 Forbidden
**Cause**: Problème d'authentification Spring Security
**Solution**: 
- Vérifiez les logs du JwtAuthFilter
- Assurez-vous que le token est valide

## Prochaines Étapes

1. **Redémarrez le backend** si nécessaire (il devrait se recompiler automatiquement)
2. **Testez la création de post** en suivant les étapes ci-dessus
3. **Copiez les logs** de la console backend et frontend
4. **Identifiez** à quelle étape l'erreur se produit

## Logs à Surveiller

### Logs Importants du Backend:
- `🔐 JWT Filter` - Authentification
- `📝 Received post creation request` - Début du traitement
- `✅ User found` - Utilisateur trouvé
- `✅ Post saved` - Post créé avec succès
- `❌` - Toute erreur

### Logs Importants du Frontend:
- `📤 Sending post creation request` - Envoi de la requête
- `📥 Response status` - Code de réponse HTTP
- `✅ Post created successfully` - Succès
- `❌ Error` - Erreur détaillée
