# 🍽️ Ynov Fullstack M1 — Application de recettes de cuisine

Cette application centralise l’ensemble des fonctionnalités utiles en cuisine : gestion de recettes, planification des repas, suivi intelligent des ingrédients du frigo, génération optimisée de listes de courses et suggestions personnalisées.  
Grâce à ses outils avancés (analyse nutritionnelle, alertes de péremption, menus équilibrés…), elle offre une solution complète et intuitive pour faciliter la préparation des repas et mieux organiser son quotidien culinaire.

---

## ✨ Fonctionnalitées:

### 🍽️ Gestion des recettes

- **CRUD complet des recettes** : création, lecture, modification et suppression
- **Téléversement de médias** : ajout d’images et de vidéos pour illustrer les recettes
- **Système de favoris** : sauvegarde des recettes préférées
- **Tags personnalisés** : catégories personnalisées pour faciliter le tri (“pique-nique”, “rapide”, “batch cooking”…)
- **Filtre par allergènes** : exclusion des recettes contenant certains ingrédients
- **Minuteur intégré** : timer disponible pour chaque étape ou temps de cuisson

---

### 🧊 Gestion du frigo & ingrédients

- **Gestion du frigo avancée** : ajout des aliments avec quantité et date d’expiration
- **Alertes de péremption** : notifications lorsque les ingrédients approchent de la date limite
- **Scan de code-barres** : ajout automatique d’un ingrédient au frigo

---

### 🤖 Systèmes intelligents & automatisations

- **Suggestions automatiques** : recommandations de recettes basées sur les ingrédients disponibles
- **Analyse nutritionnelle automatique** _(API Edamam)_ : calories, macros et valeurs nutritionnelles calculées automatiquement
- **Suggestion de menus équilibrés** : menus hebdomadaires thématisés (“healthy”, “économique”, “rapide”…)

---

### 🗂️ Organisation des repas & courses

- **Liste des repas de la semaine** : planification hebdomadaire avec sélection des recettes
- **Liste de courses** : génération automatique des ingrédients nécessaires
- **Optimisation de la liste de courses** : regroupement par catégories (boucherie, légumes…) et calcul automatique des quantités

### 🔍 Recherche et navigation

- **Recherche avancée** : filtrage par ingrédients, temps de préparation et mots-clés

### 🔐 Gestion utilisateur & expérience

- **Authentification** : inscription, connexion, sécurisation des routes
- **Mode hors-ligne (PWA)** : accès aux recettes favorites sans connexion
- **Interface responsive** : utilisable sur mobile, tablette et desktop

---

## 🛠️ Stack technique & choix technologiques

### **Frontend : Angular**

J’ai choisi **Angular** pour plusieurs raisons :

- **Structure robuste et opinionnée**, idéale pour garder un code propre sur un projet complet.
- Utilisation native de **TypeScript**, ce qui augmente la fiabilité et la maintenabilité.
- **Reactive Forms**, très utile pour l’ajout/édition des recettes avec la sécurité apporté par les validators.
- **Écosystème complet** : routing, guards, animations, CLI puissante…

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

## Architecture et répartition des services

### Architecture — vue d'ensemble

L'application est organisée en architecture « Gateway + services » (microservices légers) avec un frontend Angular. L'objectif est de séparer clairement les responsabilités : la Gateway centralise l'accès, la sécurité et le routage ; des services spécialisés (api-user, api-recipe, éventuellement media-service) gèrent la logique métier ; PostgreSQL conserve les données relationnelles.

Flux principal (résumé)

- Le client (Angular) fait toutes les requêtes vers l'API Gateway.

- La Gateway effectue l'authentification/validation de base, applique les règles CORS/rate-limit et proxifie les requêtes vers les services adaptés (/user → api-user, /recipe → api-recipe).

- Les services communiquent avec PostgreSQL pour lire/écrire les données.

- Les fichiers médias sont soit stockés sur un volume Docker en dev, soit sur un service S3 en production.

```mermaid
flowchart LR
  subgraph Client
    A[Frontend - Angular]
  end

  subgraph Gateway
    G[API Gateway - Express<br/>+ http-proxy-middleware]
  end

  subgraph Services
    U[api-user (Express)]
    R[api-recipe (Express)]
    M[media-service / S3]
  end

  subgraph Data
    P[(PostgreSQL)]
  end

  A -->|HTTP/HTTPS| G
  G -->|/user/*| U
  G -->|/recipe/*| R
  G -->|/media/*| M
  U --> P
  R --> P
  R --> M
```

### Rôle détaillé de chaque bloc

- Frontend (Angular)

  - Responsabilités : interface utilisateur, formulaires (création / modification de recettes), recherche/filtrage, affichage des médias, gestion des états (favs, frigo)...

  - Interactions : toutes les requêtes passent par la Gateway (pas d'accès direct aux services backend).

  - Sécurité : conserve l'access token (court terme) en mémoire ou utilise cookie HttpOnly pour le refresh token.

- API Gateway (Express + http-proxy-middleware)

  - Responsabilités :
    - Point d’entrée unique pour le frontend.
    - Centraliser CORS, logging (morgan), rate-limiting et éventuellement la mise en cache.
    - Vérifier / valider le JWT avant de transférer la requête.
    - Router/proxy les requêtes vers les services appropriés
  - Pourquoi : simplifie la gestion des politiques transverses (auth, quotas, logs), unifie les coordonnées des services pour le frontend.

- api-user (Express)

  - Responsabilités :
    - CRUD recettes (titre, étapes, temps, tags, difficulté ...).
    - Gestion des ingrédients et de la relation many-to-many (recipe_ingredients).
    - Fonctionnalités métier : matching frigo → suggestions, filtres (temps, tags), pagination.
    - Validation, pagination, et recherche
  - Données: tables recipes, ingredients, recipe_ingredients

- api-user (Express)

- PostgreSQL

  - Responsabilités : stockage relationnel principal, en charge des transactions atomiques et des relations (recettes ↔ ingrédients).

  - Indexation pour performance sur recherches (title, tags, full-text).
