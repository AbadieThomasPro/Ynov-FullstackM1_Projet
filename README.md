# 🍽️ Ynov Fullstack M1 — Application de recettes de cuisine

Cette application permet aux utilisateurs d'enregistrer, partager et rechercher des recettes de cuisine.

---

## ✨ Fonctionnalitées:

- **CRUD complet des recettes** : création, lecture, modification et suppression
- **Authentification** : inscription, connexion, sécurisation des routes
- **Recherche avancée** : filtrage par ingrédients, temps de préparation et mot-clé
- **Téléversement de médias** : gestion d’images et de vidéos associées aux recettes
- **Suggestions automatiques** : propositions de recettes basées sur le “frigo” (matching ingrédients ↔ recettes)
- **Interface responsive** : utilisable sur mobile, tablette et desktop

---

## 🛠️ Stack technique & choix technologiques

### **Frontend : Angular**

J’ai choisi **Angular** pour plusieurs raisons :

- **Structure robuste et opinionnée**, idéale pour garder un code propre sur un projet complet.
- Utilisation native de **TypeScript**, ce qui augmente la fiabilité et la maintenabilité.
- **Reactive Forms**, très utile pour l’ajout/édition des recettes avec la sécurité apporté par les validators.
- **Écosystème complet** : routing, guards, animations, CLI puissante…

<!-- ### **Backend : Node.js + Express**

- Mise en place **simple et rapide** d’une API REST.
- Très grande **communauté** et disponibilité de middlewares utiles (Multer, morgan…).
- **Compatible naturellement avec JWT** pour l'authentification stateless.
- Parfait pour un backend léger et flexible. -->

### **Base de données : PostgreSQL**

- Base **relationnelle robuste**, adaptée aux entités interdépendantes (recettes, ingrédients, utilisateurs).
- Support des **transactions**, important pour garantir la cohérence lors de mises à jour multiples.
- Très bonnes **performances** sur les requêtes de filtrage et matching d’ingrédients.
- Support de **types avancés** (JSONB, arrays) pour les données semi-structurées.

### **Authentification : JWT**

- Fonctionnement **stateless**, parfait pour les APIs REST modernes.
- Compatible avec les **SPA** comme Angular (stockage en mémoire ou cookies HttpOnly).
- Possibilité d’utiliser un **refresh token** côté serveur pour renforcer la sécurité.

### **Gestion des médias : Multer + stockage local ou cloud**

- **Multer** permet de gérer facilement l’upload et la validation des fichiers.
- Stockage flexible : en local pour le développement, ou sur un cloud (S3, Cloudinary…) en production.

### **Logs : morgan**

- Middleware simple pour **logger toutes les requêtes HTTP**.
- Très utile pour analyser les comportements, déboguer et surveiller la performance de l’API.

---

- **Base de données** : PostgreSQL — relationnelle, bonnes performances, supporte transactions et requêtes complexes (recommandé pour recettes/ingrédients relationnels).

- **Auth** : JWT pour sessions stateless ; rafraîchissement via refresh tokens stockés côté serveur si besoin.

- **Logs** : morgan (express middleware) pour access logs ;
