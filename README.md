# tp-wik-dps-tp01_EB

> TP n.1 du module devops - Ynov Bordeaux pour la B3 Info.
> Le TP consiste à mettre en place un serveur web avec une seule route "/ping" qui renvoie les headers ainsi qu'un fichier JSON.
> Les autres routes sont bloquées et renvoient une erreur 404 avec un message dans la console.
> Ce projet est réalisé pour Mac / Linux.

## Table des matières
- [Installation](#installation)
- [Usage](#usage)
- [Test](#testing)

## Installation
### Cloner le repo git : 
```bash
git clone https://github.com/isaiah-dev/tp-wik-dps-tp01_EB/
cd tp-wik-dps-tp01_EB
```
Définir le port du serveur avec une variable d'environnement :
```bash
export PING_LISTEN_PORT=4000
```
Compiler le code typescript en JavaScript :
```bash
npx tsc
```
## Usage
Une fois l'installation terminée, lancer le serveur web depuis le dossier du projet :
```bash
node build/index.js
```
## Test
Il y a deux manières de tester si le service fonctionne : Depuis un navigateur ou un terminal : 
### Depuis un navigateur :
Se rentre à l'adresse correcte `http://localhost:4000/ping`
> Un message dans le terminal devrait s'afficher :

>```OK - Route connue : /ping```

Se rentre à une adresse incorrecte `http://localhost:4000/test`
> Un message d'erreur s'affiche dans le terminal :

> ```404 - adresse inconnue: "http://4000/nomdelaroute" n'est pas accessible.```

### Depuis un terminal Mac / Linux :

Lancer la commande curl avec le bon chemin :
```bash
curl http://localhost:4000/ping -v
```
> Un message nous retourne les bonnes informations :
```bash
* Trying 127.0.0.1:4000...
* Connected to localhost (127.0.0.1) port 4000 (#0)
> GET /ping HTTP/1.1
> Host: localhost:4000
> User-Agent: curl/8.1.2
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Tue, 17 Oct 2023 16:24:26 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
< 
* Connection #0 to host localhost left intact
{"host":"localhost:4000","user-agent":"curl/8.1.2","accept":"*/*"}%
```

Maintenant avec un chemin erroné :
```bash
curl http://localhost:4000/nomdelaroute -v
```
> Un message nous retourne les informations suivantes :
```bash
*   Trying 127.0.0.1:4000...
* Connected to localhost (127.0.0.1) port 4000 (#0)
> GET /test HTTP/1.1
> Host: localhost:4000
> User-Agent: curl/8.1.2
> Accept: */*
> 
< HTTP/1.1 404 Not Found
< Date: Tue, 17 Oct 2023 16:25:54 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 0
< 
* Connection #0 to host localhost left intact
```

# tp-wik-dps-tp02_EB

> TP n.2 du module devops - Ynov Bordeaux pour la B3 Info.
> Le TP consiste à mettre en place une image Docker avec un seul stage contenant l'API créée lors du TP n.1. 

## Mise en place de l'image Docker
Une image Docker se met en place depuis un fichier de configuration nommé [*Dockerfile*](Dockerfile). Celui-ci contient les paramètres et commandes à executer lors du lancement.
> Quelques informations pour cet exercice:
> - Nom du conteneur : *container_tp2*
> - Port d'écoute : 4000 
Une fois celui-ci configuré, construire l'image avec :
```bash
docker build -t container_tp2 .
```
## Execution de l'image Docker
```bash
docker run -it --rm -p 8080:4000 -e PING_LISTEN_PORT=4000 container_tp2
```
## Test
Executer la commande pour tester le bon fonctionnement :  
```bash
curl http://localhost:8080/ping -v
```
Confirmation de la réception des headers :
```
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /ping HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/8.1.2
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Mon, 23 Oct 2023 12:45:36 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
< 
* Connection #0 to host localhost left intact
{"host":"localhost:8080","user-agent":"curl/8.1.2","accept":"*/*"}%  
```
## Mise en place de la seconde image Docker multi-stages : 
> Un stage pour l'étape de build et un autre pour l'éxecution qui ne contient pas les sources.
> Comme la précédente étape, un autre fichier [*Dockerfile_multistage*](Dockerfile_multistage) est créé.
> Informations pour cet exercice :
> - Nom du conteneur : *container_ms_tp2*
> - Port d'écoute : 4000 
> Construire le deuxième build depuis le deuxième Dockerfile : 
```bash
docker build -t container_ms_tp2 -f Dockerfile_multistage .
```
## Execution de la deuxième image Docker
```bash
docker run -it --rm -p 8080:4000 -e PING_LISTEN_PORT=4000 container_ms_tp2
```
## Test
```bash
curl http://localhost:8080/ping -v
```
Ce qui nous retourne :
```bash
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /ping HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/8.1.2
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Mon, 23 Oct 2023 14:59:02 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
< 
* Connection #0 to host localhost left intact
{"host":"localhost:8080","user-agent":"curl/8.1.2","accept":"*/*"}%   
```

# tp-wik-dps-tp03_EB

> TP n.3 du module devops - Ynov Bordeaux pour la B3 Info.
> Le TP consiste à :
> > Créer un docker-compose avec pour seul service un container basé sur le Dockerfile créé dans le TP n.2.
> > Augmenter le nombre de réplicas à 4 pour ce service.
> > Modifier le docker-compose pour ajouter un reverse-proxy (nginx), avec uniquement le reverse-proxy exposé sur le port 8080.

> Un fichier nommé [*docker-compose.yaml*](docker-compose.yaml) a été créé, il permet de définir et de gérer des services multi-conteneurs de Docker. Il définit deux services que j'ai nommé "tp3" et "proxy" en les reliant à un réseau commun et exposant les ports nécessaires. Il définit aussi le nombre de réplicas à 4.
> Un deuxième fichier nommé nginx.conf indique à NGINX de fonctionner en tant que serveur proxy inverse. Lorsqu'une requête arrive sur le port 80 de NGINX (le port par défaut pour le trafic HTTP), NGINX transfère cette requête au service "tp3" sur le port 8080. 

## Création du docker-compose
```bash
docker compose up --build
```
Le terminal nous affiche : 

```bash
[+] Running 4/0
 ✔ Container tp-wik-dps-tp01_eb-tp3-2  Created                                         0.0s 
 ✔ Container tp-wik-dps-tp01_eb-tp3-4  Created                                         0.0s 
 ✔ Container tp-wik-dps-tp01_eb-tp3-3  Created                                         0.0s 
 ✔ Container tp-wik-dps-tp01_eb-tp3-1  Created                                         0.0s 
Attaching to tp-wik-dps-tp01_eb-proxy-1, tp-wik-dps-tp01_eb-tp3-1, tp-wik-dps-tp01_eb-tp3-2, tp-wik-dps-tp01_eb-tp3-3, tp-wik-dps-tp01_eb-tp3-4
tp-wik-dps-tp01_eb-proxy-1  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
tp-wik-dps-tp01_eb-proxy-1  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
tp-wik-dps-tp01_eb-proxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
tp-wik-dps-tp01_eb-proxy-1  | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
tp-wik-dps-tp01_eb-proxy-1  | 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
tp-wik-dps-tp01_eb-proxy-1  | /docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
tp-wik-dps-tp01_eb-proxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
tp-wik-dps-tp01_eb-proxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
tp-wik-dps-tp01_eb-proxy-1  | /docker-entrypoint.sh: Configuration complete; ready for start up
```
Si l'on relance un curl, le message rajouté dans le code s'affiche bien dans le terminal :
```bash
tp-wik-dps-tp01_eb-tp3-2    | OK - Route connue : /ping
```


Emile BAILEY - B3 Robotique
