# 🍽️ Ynov Fullstack M1 — Application de recettes de cuisine

Cette application centralise l’ensemble des fonctionnalités utiles en cuisine : gestion de recettes, organisation des repas, génération de listes de courses et suggestions basées sur les ingrédients disponibles.  
Elle vise à offrir un outil complet, pratique et intuitif pour faciliter la préparation des repas au quotidien.

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
