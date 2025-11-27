FROM node:22-bullseye-slim

WORKDIR /src

# installer les dépendances au build (réproducible, évite réinstall à chaque start)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy app sources
COPY . .

# CMD ["npm", "start"]
# port par défaut pour Angular dev server
EXPOSE 4200

# forcer le binding sur 0.0.0.0 pour être accessible depuis l'hôte
# si ton package.json gère les arguments passés à npm run start, la forme suivante est sûre :
CMD ["sh", "-c", "npm run start -- --host 0.0.0.0"]