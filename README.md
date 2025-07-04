# 🏥 ErdrePulse

Application de gestion de bilans de santé et de suivi médical pour les professionnels de santé.

## 📋 Description

ErdrePulse est une application web complète permettant aux professionnels de santé de :
- Créer et gérer des bilans de santé personnalisés
- Suivre l'évolution des patients
- Gérer les informations professionnelles et personnelles
- Effectuer des tests physiques et métaboliques
- Analyser les données de santé

## 🏗️ Architecture

### Backend (Node.js + Express + MySQL)
```bash
backend/
├── config/           # Configuration base de données
├── controllers/      # Logique métier
├── middlewares/      # Middlewares (auth, validation)
├── models/          # Modèles Sequelize
├── routes/          # Routes API
├── services/        # Services (email, etc.)
└── index.js         # Point d'entrée
```

### Frontend (React + TypeScript + Vite)
```bash
frontend/
├── src/
│   ├── components/  # Composants réutilisables
│   ├── contexts/    # Contextes React (Auth)
│   ├── pages/       # Pages de l'application
│   ├── services/    # Services API
│   └── App.tsx      # Point d'entrée React
└── public/          # Assets statiques
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v14 ou supérieur)
- MySQL
- npm ou yarn

### Installation et Lancement

```bash
# 1. Cloner le repository
git clone [URL_DU_REPO]
cd git

# 2. Lancer l'application complète
chmod +x deploy.sh
./deploy.sh all
```

L'application sera accessible sur :
- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:5000

## 📚 Documentation

- **[Guide de Déploiement Rapide](DEPLOIEMENT_RAPIDE.md)** - Pour les développeurs
- **[Documentation d'Hébergement](DOCUMENTATION_HEBERGEMENT.md)** - Pour la production

## 🔧 Scripts Disponibles

### Lancement Local
```bash
# Lancer backend + frontend
./deploy.sh all

# Lancer uniquement le backend
./deploy.sh backend

# Lancer uniquement le frontend
./deploy.sh frontend
```

### Backend
```bash
cd backend
npm start          # Démarre le serveur
npm run dev        # Mode développement
npm run migrate    # Exécute les migrations
npm run seed       # Remplit la base de données
```

### Frontend
```bash
cd frontend
npm run dev        # Serveur de développement
npm run build      # Build production
npm run preview    # Prévisualise le build
```

## 🛠️ Technologies

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Base de données
- **Sequelize** - ORM
- **JWT** - Authentification
- **Nodemailer** - Envoi d'emails

### Frontend
- **React** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool
- **Material-UI** - Composants UI
- **React Router** - Navigation
- **Axios** - Client HTTP

## 🔐 Sécurité

- Authentification JWT
- Hachage des mots de passe (bcrypt)
- Validation des données
- Protection CORS
- Rate limiting
- Helmet.js pour la sécurité

## 📊 Fonctionnalités Principales

### Authentification
- Inscription avec vérification email
- Connexion sécurisée
- Réinitialisation de mot de passe
- Gestion des sessions

### Gestion des Profils
- Informations personnelles
- Informations professionnelles
- Secteurs d'activité
- Professions

### Bilans de Santé
- Création de bilans personnalisés
- Tests physiques
- Tests métaboliques
- Suivi des objectifs
- Historique des bilans

## 🗄️ Base de Données

### Tables Principales
- `users` - Utilisateurs
- `profiles` - Profils utilisateurs
- `bilans` - Bilans de santé
- `secteurs` - Secteurs d'activité
- `professions` - Professions
- `activites` - Activités physiques

### Migrations
```bash
cd backend
npx sequelize-cli db:migrate    # Appliquer les migrations
npx sequelize-cli db:seed:all   # Remplir avec des données
```

## 🔍 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/verify-email/:token` - Vérification email
- `POST /api/auth/forgot-password` - Demande réinitialisation
- `POST /api/auth/reset-password` - Réinitialisation mot de passe

### Profils
- `GET /api/profile` - Récupérer le profil
- `PUT /api/profile` - Mettre à jour le profil
- `DELETE /api/profile` - Supprimer le profil

### Bilans
- `GET /api/bilans` - Liste des bilans
- `POST /api/bilans` - Créer un bilan
- `GET /api/bilans/:id` - Détails d'un bilan
- `PUT /api/bilans/:id` - Modifier un bilan

## 🐛 Dépannage

### Problèmes Courants
1. **Erreur de connexion à la base de données**
   - Vérifier que MySQL est démarré
   - Vérifier les informations de connexion dans `.env`

2. **Erreur CORS**
   - Vérifier la configuration CORS dans le backend
   - Vérifier les URLs dans les variables d'environnement

3. **Erreur de migration**
   - Vérifier la configuration dans `config/config.json`
   - Vérifier les permissions de la base de données

## 📝 Licence

Ce projet est développé pour des fins éducatives et professionnelles.

## 🤝 Contribution

Pour contribuer au projet :
1. Fork le repository
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Créer une Pull Request

---

**Note** : Consultez la documentation spécifique pour plus de détails sur le déploiement et l'hébergement.
