# Utilisez une image de base officielle Node.js
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de l'application dans le conteneur
COPY package*.json ./
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel l'application sera exécutée
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]
