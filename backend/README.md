# 🔧 Backend ErdrePulse

API REST pour l'application ErdrePulse construite avec Node.js, Express et MySQL.

## 📋 Description

Le backend d'ErdrePulse fournit une API complète pour :
- Authentification et gestion des utilisateurs
- Gestion des profils professionnels
- Création et suivi des bilans de santé
- Tests physiques et métaboliques
- Gestion des données de référence

## 🛠️ Technologies

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Base de données
- **Sequelize** - ORM
- **JWT** - Authentification
- **Nodemailer** - Envoi d'emails
- **Express-validator** - Validation des données
- **Helmet** - Sécurité
- **CORS** - Cross-Origin Resource Sharing

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v14 ou supérieur)
- MySQL
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos informations

# Lancer le serveur
npm start
```

Le serveur sera accessible sur `http://localhost:5000`

## 📁 Structure du Projet

```
backend/
├── config/                 # Configuration
│   ├── config.json        # Configuration Sequelize
│   └── database.js        # Configuration base de données
├── controllers/           # Contrôleurs
│   ├── authController.js  # Authentification
│   ├── bilanController.js # Bilans de santé
│   ├── optionController.js # Options et références
│   ├── profileController.js # Profils utilisateurs
│   └── userController.js  # Gestion utilisateurs
├── middlewares/           # Middlewares
│   ├── auth.js           # Authentification JWT
│   └── roleMiddleware.js # Middleware des rôles
├── models/               # Modèles Sequelize
│   ├── index.js          # Configuration des modèles
│   ├── user.js           # Modèle utilisateur
│   ├── profile.js        # Modèle profil
│   ├── bilan.js          # Modèle bilan
│   └── ...               # Autres modèles
├── routes/               # Routes API
│   ├── auth.js           # Routes d'authentification
│   ├── bilanRoutes.js    # Routes des bilans
│   ├── optionRoutes.js   # Routes des options
│   ├── profile.js        # Routes des profils
│   └── userRoutes.js     # Routes utilisateurs
├── services/             # Services
│   ├── emailService.js   # Service d'emails
│   └── mailService.js    # Service d'envoi
├── migrations/           # Migrations Sequelize
├── seeders/              # Seeds de données
├── index.js              # Point d'entrée
└── app.js                # Configuration Express
```

## 🔧 Scripts Disponibles

```bash
npm start              # Démarre le serveur
npm run dev            # Mode développement avec nodemon
npm run migrate        # Exécute les migrations
npm run migrate:undo   # Annule la dernière migration
npm run seed           # Exécute les seeds
```

## 🗄️ Base de Données

### Configuration

Le fichier `config/config.json` contient la configuration Sequelize :

```json
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "user_management",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql"
  }
}
```

### Variables d'Environnement

Créer un fichier `.env` :

```env
# Base de données
NODE_ENV=development
MYSQL_URL=mysql://root:password@localhost:3306/user_management
MYSQL_URL_LOCAL=mysql://root:password@localhost:3306/user_management

# JWT
JWT_SECRET=votre_secret_jwt_tres_securise

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_application

# URLs
FRONTEND_URL=https://votre-frontend.railway.app
FRONTEND_URL_LOCAL=http://localhost:5173

# Port
PORT=5000
```

### Migrations

```bash
# Créer une migration
npx sequelize-cli migration:generate --name nom_migration

# Exécuter les migrations
npx sequelize-cli db:migrate

# Annuler la dernière migration
npx sequelize-cli db:migrate:undo

# Annuler toutes les migrations
npx sequelize-cli db:migrate:undo:all
```

### Seeds

```bash
# Créer un seeder
npx sequelize-cli seed:generate --name nom_seeder

# Exécuter tous les seeds
npx sequelize-cli db:seed:all

# Exécuter un seed spécifique
npx sequelize-cli db:seed --seed nom_seeder.js
```

## 🔍 API Endpoints

### Authentification
```
POST   /api/auth/register           # Inscription
POST   /api/auth/login              # Connexion
GET    /api/auth/verify-email/:token # Vérification email
POST   /api/auth/forgot-password    # Demande réinitialisation
POST   /api/auth/reset-password     # Réinitialisation mot de passe
GET    /api/auth/profile            # Profil utilisateur
DELETE /api/auth/delete             # Suppression compte
```

### Profils
```
GET    /api/profile                 # Récupérer le profil
PUT    /api/profile                 # Mettre à jour le profil
DELETE /api/profile                 # Supprimer le profil
```

### Bilans
```
GET    /api/bilans                  # Liste des bilans
POST   /api/bilans                  # Créer un bilan
GET    /api/bilans/:id              # Détails d'un bilan
PUT    /api/bilans/:id              # Modifier un bilan
DELETE /api/bilans/:id              # Supprimer un bilan
```

### Options et Références
```
GET    /api/options/secteurs        # Liste des secteurs
GET    /api/options/professions     # Liste des professions
GET    /api/options/professions/:secteur # Professions par secteur
POST   /api/options/professions     # Ajouter une profession
```

### Utilisateurs (Admin)
```
GET    /api/users                   # Liste des utilisateurs
GET    /api/users/:id               # Détails d'un utilisateur
PUT    /api/users/:id               # Modifier un utilisateur
DELETE /api/users/:id               # Supprimer un utilisateur
```

## 🔐 Sécurité

### Authentification JWT
- Tokens d'accès avec expiration
- Refresh tokens pour la persistance
- Validation automatique des tokens

### Validation des Données
- Express-validator pour la validation
- Sanitisation des entrées
- Messages d'erreur personnalisés

### Protection
- Helmet.js pour les headers de sécurité
- CORS configuré
- Rate limiting
- Protection contre les injections SQL

## 📧 Service d'Emails

### Configuration SMTP
```javascript
// services/emailService.js
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

### Types d'Emails
- Vérification d'email
- Réinitialisation de mot de passe
- Notifications de bilan

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## 🚀 Déploiement

### Railway
```bash
# Configuration automatique avec railway.json
# Variables d'environnement dans Railway
```

### Autres Plateformes
- **Heroku** : Configuration via Procfile
- **DigitalOcean** : Déploiement via App Platform
- **AWS** : Configuration via Elastic Beanstalk

## 🐛 Dépannage

### Problèmes Courants

1. **Erreur de connexion à la base de données**
   ```bash
   # Vérifier MySQL
   mysql -u root -p
   
   # Vérifier la configuration
   cat config/config.json
   ```

2. **Erreur de migration**
   ```bash
   # Vérifier le statut
   npx sequelize-cli db:migrate:status
   
   # Forcer la synchronisation
   npx sequelize-cli db:sync
   ```

3. **Erreur d'email**
   ```bash
   # Vérifier les variables SMTP
   echo $SMTP_HOST
   echo $SMTP_USER
   ```

### Logs
```bash
# Logs en développement
npm run dev

# Logs en production
npm start
```

## 📚 Ressources

- [Documentation Express](https://expressjs.com/)
- [Documentation Sequelize](https://sequelize.org/)
- [Documentation JWT](https://jwt.io/)
- [Documentation Nodemailer](https://nodemailer.com/)

## 🤝 Contribution

1. Fork le repository
2. Créer une branche feature
3. Développer les fonctionnalités
4. Tester l'API
5. Créer une Pull Request

---

**Note** : Ce backend fait partie de l'application ErdrePulse. Consultez le README principal pour plus d'informations sur l'architecture complète. 