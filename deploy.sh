#!/bin/bash

# Mettre à jour le code source
git pull

# Construire l'image Docker
docker build --no-cache -t image-angular .

# Arreter le conteneur existant
docker stop conteneur-angular

# Supprimer le conteneur existant
docker rm conteneur-angular

# Lancer un nouveau conteneur
docker run -d --name=conteneur-angular -p 4200:80 image-angular