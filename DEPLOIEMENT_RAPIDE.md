# ⚡ Guide de Déploiement Rapide - ErdrePulse

Guide pour les développeurs qui veulent rapidement lancer l'application sur leur poste local.

## 🎯 Objectif

Ce guide permet de **lancer l'application complète en 5 minutes** sur votre machine.

## 📋 Prérequis

- ✅ Node.js (v14 ou supérieur)
- ✅ MySQL installé et démarré
- ✅ Git
- ✅ npm ou yarn

## 🚀 Démarrage Ultra-Rapide

### 1. Récupération du Code (1 minute)

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd git

# Rendre le script exécutable
chmod +x deploy.sh
```

### 2. Configuration de la Base de Données (1 minute)

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE user_management;
EXIT;
```

### 3. Configuration des Variables (2 minutes)

#### Backend
```bash
cd backend
cp .env.example .env
```

Éditer `backend/.env` :
```env
NODE_ENV=development
MYSQL_URL_LOCAL=mysql://root:votre_password@localhost:3306/user_management
JWT_SECRET=mon_secret_jwt_local
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app
FRONTEND_URL_LOCAL=http://localhost:5173
PORT=5000
```

#### Frontend
```bash
cd frontend
cp .env.example .env
```

Éditer `frontend/.env` :
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Lancement Automatique (1 minute)

```bash
# Retourner à la racine
cd ..

# Lancer tout automatiquement
./deploy.sh all
```

## ✅ Résultat

Votre application sera accessible sur :
- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:5000

## 🔧 Script de Lancement

Le script `deploy.sh` fait automatiquement :

### Vérifications
- ✅ Node.js installé
- ✅ npm installé
- ✅ Git installé
- ✅ Fichiers `.env` présents

### Backend
- ✅ Installation des dépendances
- ✅ Vérification des migrations (pas de re-exécution si déjà faites)
- ✅ Exécution des migrations si nécessaire
- ✅ Vérification des seeds (pas de re-exécution si déjà faits)
- ✅ Exécution des seeds si nécessaire
- ✅ Démarrage du serveur

### Frontend
- ✅ Installation des dépendances
- ✅ Démarrage du serveur de développement

## 📊 Utilisation du Script

```bash
# Lancer backend + frontend
./deploy.sh all

# Lancer uniquement le backend
./deploy.sh backend

# Lancer uniquement le frontend
./deploy.sh frontend
```

## 🛑 Arrêt des Serveurs

```bash
# Dans le terminal où le script tourne
Ctrl+C

# Ou arrêter manuellement
pkill -f "node.*index.js"
pkill -f "vite"
```

## 🔍 Vérification

### Test du Backend
```bash
curl http://localhost:5000/
# Réponse attendue : {"message":"API de gestion d'utilisateurs"}
```

### Test du Frontend
- Ouvrir http://localhost:5173
- Vérifier que la page se charge
- Tester l'inscription/connexion

### Test de la Base de Données
```bash
cd backend
npx sequelize-cli db:migrate:status
# Vérifier que toutes les migrations sont "up"
```

## 🐛 Dépannage Rapide

### Erreur "Port déjà utilisé"
```bash
# Trouver le processus
lsof -i :5000
lsof -i :5173

# Tuer le processus
kill -9 [PID]
```

### Erreur de connexion MySQL
```bash
# Vérifier que MySQL tourne
sudo systemctl status mysql

# Redémarrer MySQL
sudo systemctl restart mysql
```

### Erreur de dépendances
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur de migration
```bash
cd backend
# Forcer la synchronisation
npx sequelize-cli db:sync
```

## 📝 Commandes Utiles

### Développement Backend
```bash
cd backend
npm run dev          # Mode développement avec nodemon
npm run migrate      # Forcer les migrations
npm run seed         # Forcer les seeds
```

### Développement Frontend
```bash
cd frontend
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
```

### Base de Données
```bash
cd backend
npx sequelize-cli db:migrate:status  # Statut des migrations
npx sequelize-cli db:seed:status     # Statut des seeds
npx sequelize-cli db:drop            # Supprimer la base
npx sequelize-cli db:create          # Recréer la base
```

## 🎯 Workflow de Développement

### Premier Lancement
1. Cloner le repo
2. Configurer MySQL
3. Configurer les `.env`
4. Lancer `./deploy.sh all`

### Lancements Suivants
1. `./deploy.sh all` (plus rapide car migrations/seeds déjà faites)

### Après Modifications
```bash
# Modifications backend
cd backend
npm run dev

# Modifications frontend
cd frontend
npm run dev
```

## 📚 Ressources

- **[README Principal](README.md)** - Vue d'ensemble du projet
- **[Documentation d'Hébergement](DOCUMENTATION_HEBERGEMENT.md)** - Pour la production
- **[README Backend](backend/README.md)** - Documentation backend
- **[README Frontend](frontend/README.md)** - Documentation frontend

## 🆘 Support

En cas de problème :
1. Vérifier les logs dans le terminal
2. Consulter la section dépannage
3. Vérifier la configuration des `.env`
4. Redémarrer les services

---

**Note** : Ce guide est optimisé pour le développement local. Pour la production, consultez la documentation d'hébergement. 