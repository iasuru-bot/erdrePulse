# 🌐 Documentation d'Hébergement - ErdrePulse

Guide complet pour héberger l'application ErdrePulse en production.

## 🎯 Objectif

Cette documentation couvre l'hébergement en production, la configuration des serveurs et la résolution des erreurs fréquentes.

## 📋 Prérequis

- Compte sur une plateforme d'hébergement (Railway, Heroku, etc.)
- Base de données MySQL en production
- Domaine personnalisé (optionnel)
## 🚀 Plateformes d'Hébergement

### Railway (Recommandé)

#### Avantages
- ✅ Configuration automatique
- ✅ Base de données MySQL incluse
- ✅ Déploiement continu
- ✅ SSL automatique
- ✅ Monitoring intégré

#### Configuration

1. **Créer un projet Railway**
   ```bash
   # Aller sur railway.app
   # Créer un nouveau projet
   # Connecter le repository GitHub
   ```

2. **Ajouter les services**
   - Service MySQL (base de données)
   - Service Web (backend)
   - Service Web (frontend)

3. **Configurer les variables d'environnement**

#### Variables Backend
```env
NODE_ENV=production
MYSQL_URL=mysql://root:password@host:port/database
JWT_SECRET=votre_secret_jwt_tres_securise_et_long
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_application
FRONTEND_URL=https://votre-app-frontend.railway.app
PORT=5000
```

#### Variables Frontend
```env
VITE_API_URL=https://votre-app-backend.railway.app/api
```

### Déploiement avec Railway CLI

#### Installation de Railway CLI
```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter à Railway
railway login
```

#### Déploiement du Backend
```bash
# Aller dans le dossier backend
cd backend

# Se connecter au projet Railway
railway login

# Lier le dossier au service backend
railway link

# Déployer le backend
railway up
```

#### Déploiement du Frontend
```bash
# Aller dans le dossier frontend
cd frontend

# Se connecter au projet Railway
railway login

# Lier le dossier au service frontend
railway link

# Déployer le frontend
railway up
```

#### Commandes Railway Utiles
```bash
# Voir les logs en temps réel
railway logs

# Ouvrir l'application
railway open

# Voir le statut des services
railway status

# Variables d'environnement
railway variables

# Redémarrer un service
railway restart
```

### Alternatives

#### Heroku
- Support complet pour Node.js
- Base de données PostgreSQL incluse
- Configuration via Procfile

#### Vercel
- Déploiement simple pour le frontend
- Configuration automatique pour React/Vite
- Intégration Git automatique

#### DigitalOcean App Platform
- Déploiement simple
- Bonne performance
- Prix compétitifs

## 🔧 Configuration de Production

### 1. Configuration de la Base de Données

#### Fichier config.json
```json
{
  "production": {
    "username": "root",
    "password": "votre_password",
    "database": "railway",
    "host": "votre_host.railway.app",
    "port": 33909,
    "dialect": "mysql"
  }
}
```

#### Variables d'Environnement
```env
# Récupérer depuis Railway
MYSQL_URL=mysql://root:password@host:port/database
```

### 2. Configuration Email

#### Gmail SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_application
```

#### Configuration Gmail
1. Activer l'authentification à 2 facteurs
2. Générer un mot de passe d'application
3. Utiliser ce mot de passe dans `SMTP_PASS`

## 🔍 Erreurs Fréquentes et Solutions

### 1. Erreur de Connexion à la Base de Données

#### Symptômes
```
SequelizeConnectionError: connect ECONNREFUSED
```

#### Solutions
```bash
# Vérifier l'URL de connexion
echo $MYSQL_URL

# Tester la connexion
mysql -h host -P port -u username -p

# Vérifier les permissions
GRANT ALL PRIVILEGES ON database.* TO 'username'@'%';
FLUSH PRIVILEGES;
```

### 2. Erreur CORS

#### Symptômes
```
Access to fetch at 'https://backend.com/api/auth/login' from origin 'https://frontend.com' has been blocked by CORS policy
```

#### Solutions
```javascript
// backend/index.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### 3. Erreur JWT

#### Symptômes
```
JsonWebTokenError: invalid signature
```

#### Solutions
```bash
# Vérifier la variable d'environnement
echo $JWT_SECRET

# Générer un nouveau secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Erreur d'Email

#### Symptômes
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

#### Solutions
1. Vérifier l'authentification à 2 facteurs Gmail
2. Utiliser un mot de passe d'application
3. Vérifier les paramètres SMTP

### 5. Erreur de Migration

#### Symptômes
```
SequelizeConnectionError: Unknown database 'database_name'
```

#### Solutions
```bash
# Créer la base de données
CREATE DATABASE database_name;

# Vérifier la configuration
npx sequelize-cli db:migrate:status
```

### 6. Erreur Frontend API

#### Symptômes
```
Failed to fetch: GET https://backend.com/api/auth/profile 404
```

#### Solutions
```bash
# Vérifier l'URL de l'API
echo $VITE_API_URL

# Tester l'endpoint
curl https://backend.com/api/auth/profile

# Vérifier les routes dans le backend
```

## 🚀 Déploiement

### 1. Préparation

```bash
# Nettoyer le code
# Supprimer tous les console.log

# Vérifier les variables d'environnement
# Configurer la base de données

# Tester localement
./deploy.sh all
```

### 2. Déploiement Railway

#### Méthode 1 : Via Railway CLI
```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter
railway login

# Déployer le backend
cd backend
railway link
railway up

# Déployer le frontend
cd ../frontend
railway link
railway up
```

#### Méthode 2 : Via Git (Automatique)
```bash
# Pousser le code
git add .
git commit -m "Configuration production"
git push

# Railway déploie automatiquement
```

### 3. Vérification Post-Déploiement

```bash
# Tester le backend
curl https://votre-backend.railway.app/

# Tester le frontend
# Ouvrir https://votre-frontend.railway.app

# Tester l'authentification
# Créer un compte et se connecter
```

## 🔒 Sécurité

### Variables d'Environnement
- ✅ Ne jamais commiter les `.env`
- ✅ Utiliser des secrets sécurisés
- ✅ Changer régulièrement les mots de passe

### Base de Données
- ✅ Limiter les permissions utilisateur
- ✅ Sauvegardes régulières
- ✅ Monitoring des connexions

### API
- ✅ Rate limiting
- ✅ Validation des entrées
- ✅ Protection CORS
- ✅ Headers de sécurité

## 📊 Monitoring

### Logs Railway
- Surveiller les logs en temps réel
- Configurer des alertes
- Analyser les erreurs

### Performance
- Surveiller les temps de réponse
- Optimiser les requêtes
- Monitoring de la base de données

### Sécurité
- Surveiller les tentatives de connexion
- Détecter les attaques
- Logs d'audit

## 🔄 Maintenance

### Sauvegardes
```bash
# Sauvegarde automatique Railway
# Configurer des sauvegardes manuelles
mysqldump -h host -u user -p database > backup.sql
```

### Mises à Jour
```bash
# Mettre à jour les dépendances
npm audit fix
npm update

# Tester en local
# Déployer en production
```

### Monitoring
- Surveiller l'utilisation des ressources
- Vérifier les logs d'erreur
- Tester les fonctionnalités critiques

## 🆘 Support

### En Cas de Problème

1. **Vérifier les logs Railway**
   - Aller dans le dashboard Railway
   - Consulter les logs en temps réel
   - Identifier l'erreur

2. **Tester les endpoints**
   ```bash
   curl https://votre-backend.railway.app/
   curl https://votre-backend.railway.app/api/auth/profile
   ```

3. **Vérifier la base de données**
   ```bash
   # Se connecter à la base
   mysql -h host -u user -p
   
   # Vérifier les tables
   SHOW TABLES;
   ```

4. **Redémarrer les services**
   - Dans Railway, redémarrer les services
   - Vérifier les variables d'environnement

### Contacts
- Consulter la documentation des services utilisés
- Contacter l'équipe de développement
- Ouvrir une issue sur GitHub

## 📚 Ressources

- [Documentation Railway](https://docs.railway.app/)
- [Documentation Heroku](https://devcenter.heroku.com/)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation MySQL](https://dev.mysql.com/doc/)

---

**Note** : Cette documentation doit être mise à jour selon les spécificités de votre environnement de production. 