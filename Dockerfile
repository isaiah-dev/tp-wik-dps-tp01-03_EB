#import de node
FROM node:14-alpine

#définition du workspace
WORKDIR /workspace

#copie des packages json
COPY package*.json ./

#Installation des dépendances
RUN npm install --production

# Installtion de typescript
RUN npm install typescript --save-dev

# Installtion de node
RUN npm install @types/node --save-dev 

# Initialisation du projet typescript
RUN npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

#Copie du dossier src dans le workspace
COPY src ./src

#Buid le code typescript en JS 
RUN npx tsc

#Executer le fichier index.js
CMD node build/index.js
