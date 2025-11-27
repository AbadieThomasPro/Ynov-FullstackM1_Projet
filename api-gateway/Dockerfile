FROM node:22-alpine

WORKDIR /src


COPY package*.json ./
RUN npm install

# Copy app source
COPY . . 

# RUN npm run build

CMD ["npm", "start"]