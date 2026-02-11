# Documentation projet — Ynov Fullstack M1

Objectif : document prêt à copier dans Word (avec sommaire automatique). Ce document reprend et complète le README du projet en structurant la documentation pour une soutenance et un dossier technique.

## Sommaire (à générer dans Word)
- Contexte & fonctionnalité principale
- Schéma d'architecture
- Répartition des services
- Choix technologiques
- Organisation de la base de données
- Documentation API
- Mise en production (exemple)
- Roadmap des prochains développements

---

## 1. Contexte & fonctionnalité principale

Contexte

Ce projet propose une plateforme d’aide à la gestion des repas et des recettes pour diminuer le gaspillage alimentaire et simplifier la préparation quotidienne. Il regroupe :
- Un frontend Angular (SPA) pour l’interface utilisateur.
- Une API Gateway centralisant l’accès et la sécurité.
- Des microservices (api-user, api-recipe) dédiés aux domaines métier.
- Des bases PostgreSQL séparées pour les utilisateurs et les recettes.

Fonctionnalité principale

La fonctionnalité cœur est : proposer et gérer des recettes personnalisées en s’appuyant sur le contenu du frigo (inventaire), la génération automatique de listes de courses, des suggestions intelligentes et un suivi des médias (images/vidéos) et des informations nutritionnelles.

---

## 2. Schéma d'architecture

Inclure ici le schéma d'architecture : exporte `doc/Schéma-architecture.drawio.png` ou `.svg` et insère l'image dans Word. Exemple de légende :

> Schéma : Gateway centralisée → proxy vers `api-user` et `api-recipe`; frontend Angular → communication via la Gateway; bases PostgreSQL et volumes pour médias / Adminer pour gestion.

---

## 3. Répartition des services (qui fait quoi)

- Frontend (Angular)
  - Formulaires, affichage, routage, authentification côté client (JWT), envoi des requêtes vers la Gateway.
- API Gateway (Express + http-proxy-middleware)
  - Point d’entrée unique; vérification JWT; CORS; rate limiting; routage : `/user -> api-user`, `/recipe -> api-recipe`.
- api-user (Express)
  - Authentification (register/login/refresh tokens), gestion du profil, listes utilisateur (frigo, favoris, planning), endpoints CRUD utilisateur.
- api-recipe (Express)
  - CRUD recettes, gestion des ingrédients, étapes, médias et calculs métier (matching frigo → recettes, filtres, pagination).
- Bases de données (PostgreSQL)
  - `users_db` : tables liées aux utilisateurs, inventaire, planning, commentaires.
  - `recipes_db` : recettes, ingrédients, étapes, médias, nutrition.
- Stockage médias
  - En dev : volume local Docker
  - En prod : S3 (ou équivalent cloud)

---

## 4. Choix technologiques (rationalisé)

- Angular (frontend) : SPA, TypeScript, Reactive Forms, structure modulaire.
- Node.js + Express (backend) : léger et compatible avec le middleware utilisé (proxy, multer...).
- PostgreSQL : relationnel, transactions, JSONB pour champs flexibles (tips, images encodées ou métadonnées).
- Prisma (ou un ORM similaire) : génération de types, migrations, productivité.
- Multer : gestion des uploads côté serveur.
- Docker & Docker Compose : conteneurisation pour dev et déploiement.
- JWT : authentification stateless entre frontend et API Gateway.
- NGXS (ou équivalent) côté frontend : gestion d’état applicatif si utilisé.

---

## 5. Organisation de la base de données

Inclure un schéma relationnel (utilise l’image exportée `doc/schema-bdd.png`) et une description textuelle.

### Tables principales (résumé)
- `users` (api-user) : userId (PK), email, password (haché), pseudo, role, avatarUrl
- `storage` / `shopping_list` (api-user) : inventaire et listes de courses liées à userId
- `recipes` (api-recipe) : recipeId (PK), userId (créateur), name, description, durations, flags (vegan/vegetarian), metadata (jsonb)
- `ingredients`, `recipe_ingredients` : many-to-many entre recipes et ingredients
- `recipe_steps`, `images`, `videos` : étapes et médias associés aux étapes
- `nutritions` : valeurs nutritionnelles (par recette et par ingrédient)

> Astuce : pour Word, privilégie une image exportée du schéma (PNG ou SVG). Si tu veux garder un diagramme texte pour rendu, scinde-le en plusieurs diagrammes Mermaid plus petits pour éviter les problèmes de rendu.

---

## 6. Documentation API (exemple et bonnes pratiques)

### Endpoints principaux (exemples)
- Auth
  - POST /user/register — Enregistrer un utilisateur
  - POST /user/login — Authentifier et retourner JWT
  - POST /user/token/refresh — Rafraîchir le token
- Recipes
  - GET /recipe — Lister recettes (filtres, pagination)
  - POST /recipe — Créer recette (auth)
  - GET /recipe/:id — Détails d’une recette
- Images/Media
  - POST /recipe/:id/image — Uploader image (multipart/form-data) ou via JSON (base64) selon implémentation

### Swagger / OpenAPI
- Ajouter `swagger-jsdoc` + `swagger-ui-express` dans chaque service ou centraliser via la Gateway.
- Exemple minimal (Express) :
```js
// swagger setup (server.js)
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const specs = swaggerJsdoc({ swaggerDefinition: { openapi: '3.0.0', info: { title: 'API', version: '1.0.0'}}, apis: ['./src/routes/*.js']});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
```
- Documente chaque route avec des JSDoc/OpenAPI comments pour que la doc soit générée automatiquement.

---

## 7. Mise en production (exemple simple)

1. Build du frontend : `ng build --configuration=production`
2. Construire des images Docker (ou utiliser CI) :

```bash
docker build -t myorg/frontend:latest ./FRONTEND/AppCook
docker build -t myorg/api-user:latest ./api-user
docker build -t myorg/api-recipe:latest ./api-recipe
docker build -t myorg/api-gateway:latest ./api-gateway
```

3. Stockage des images : push vers un registry (Docker Hub, GitHub Container Registry, ECR)

4. Déploiement :
- Option simple : `docker-compose -f docker-compose.prod.yml up -d`
- Option scalable : déployer sur Kubernetes (GKE, AKS, EKS) avec manifests / Helm

5. Services additionnels :
- Utiliser S3 pour médias, RDS/CloudSQL pour Postgres managé, config des secrets via Secrets Manager
- TLS via un Load Balancer / Traefik / Nginx
- CI/CD : GitHub Actions / GitLab CI pour tests, builds, push d’images et déploiement

---

## 8. Roadmap (exemples de prochains développements)

Court terme (2-6 semaines)
- Stabiliser les endpoints et les tests unitaires
- Ajouter documentation Swagger pour toutes les routes
- Exporter le schéma BDD en image et l’insérer dans la doc

Moyen terme (1-3 mois)
- Ajouter service `media-service` pour centraliser uploads et conversions (ex: thumbnails)
- Ajout d’un service de nutrition (consommer Edamam en batch)
- Améliorer les suggestions (algorithme + ML léger)

Long terme (3+ mois)
- Déploiement Kubernetes, autoscaling
- Intégration CI/CD complète et monitoring (Prometheus/Grafana)
- Version mobile PWA / natif

---

## 9. Guide rapide : comment créer le sommaire dans Word

1. Ouvre Word et colle ce document.
2. Applique les styles intégrés `Titre 1`, `Titre 2`, `Titre 3` aux titres correspondants (Accueil > Styles). Exemple :
   - `#` → Titre 1
   - `##` → Titre 2
   - `###` → Titre 3
3. Place le curseur où tu veux le sommaire (généralement en haut après le titre).
4. Insertion > Table des matières > Choisir un style (ou Références > Table des matières selon ta version Word).
5. Met à jour le sommaire : clic droit sur la table > Mettre à jour les champs > Mettre à jour toute la table.

Astuces :
- Utilise les styles Word pour garder un sommaire propre.
- Si tu veux des numéros de pages corrects, assure-toi que l’option d’affichage de l’en-tête/pied de page est configurée.

---

## 10. Fichiers utiles à inclure dans le dossier de documentation

- `doc/Schéma-architecture.drawio.svg` (ou PNG)
- `doc/schema-bdd.png` (export du diagramme Mermaid)
- `doc/api-specs.yaml` (OpenAPI spec si tu as généré)
- `doc/project-documentation.md` (ce fichier)

---

### Besoin d'aide pour :
- exporter l’image Mermaid en PNG/SVG depuis Mermaid Live et l’ajouter dans `doc/` ?
- générer la spec OpenAPI automatiquement (je peux ajouter le script `swagger-jsdoc` et un `docs` endpoint) ?

Dis-moi ce que tu veux que j’exécute en premier — je peux créer les fichiers `doc/schema-bdd.mmd` et `doc/api-specs.yaml` pour toi, ou automatiser la génération Swagger pour `api-user` et `api-recipe`.
