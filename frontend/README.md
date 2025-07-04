# 🎨 Frontend ErdrePulse

Interface utilisateur de l'application ErdrePulse construite avec React, TypeScript et Vite.

## 📋 Description

Le frontend d'ErdrePulse est une application React moderne qui permet aux professionnels de santé de :
- Gérer leurs profils et informations professionnelles
- Créer et consulter des bilans de santé
- Effectuer des tests physiques et métaboliques
- Suivre l'évolution des patients
- Analyser les données de santé

## 🛠️ Technologies

- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Material-UI** - Composants UI
- **React Router** - Navigation
- **Axios** - Client HTTP
- **React Hook Form** - Gestion des formulaires
- **Yup** - Validation des données
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📁 Structure du Projet

```
frontend/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── auth/           # Composants d'authentification
│   │   ├── bilan/          # Composants de bilans
│   │   ├── common/         # Composants communs
│   │   └── layout/         # Composants de mise en page
│   ├── contexts/           # Contextes React
│   │   └── AuthContext.tsx # Contexte d'authentification
│   ├── pages/              # Pages de l'application
│   │   ├── auth/           # Pages d'authentification
│   │   ├── bilan/          # Pages de bilans
│   │   ├── profile/        # Pages de profil
│   │   └── users/          # Pages utilisateurs
│   ├── services/           # Services API
│   │   ├── api.ts          # Configuration Axios
│   │   ├── authService.ts  # Service d'authentification
│   │   ├── bilanService.ts # Service de bilans
│   │   └── userService.ts  # Service utilisateurs
│   ├── styles/             # Styles globaux
│   ├── types/              # Types TypeScript
│   ├── utils/              # Utilitaires
│   ├── App.tsx             # Composant principal
│   └── main.tsx            # Point d'entrée
├── public/                 # Assets statiques
└── dist/                   # Build de production
```

## 🔧 Scripts Disponibles

```bash
npm run dev        # Serveur de développement
npm run build      # Build pour la production
npm run preview    # Prévisualiser le build
npm run lint       # Linter le code
```

## 🎯 Fonctionnalités Principales

### Authentification
- Inscription avec validation email
- Connexion sécurisée
- Réinitialisation de mot de passe
- Protection des routes privées
- Gestion des tokens JWT

### Gestion des Profils
- Informations personnelles
- Informations professionnelles
- Secteurs d'activité
- Professions
- Modification et suppression de compte

### Bilans de Santé
- Création de bilans personnalisés
- Tests physiques (force, endurance, équilibre)
- Tests métaboliques
- Suivi des objectifs
- Historique des bilans
- Export des données

### Interface Utilisateur
- Design responsive
- Navigation intuitive
- Formulaires validés
- Messages d'erreur et de succès
- Animations fluides

## 🔌 Configuration API

### Variables d'Environnement

Créer un fichier `.env` dans le dossier `frontend/` :

```env
# URL de l'API backend
VITE_API_URL=http://localhost:5000/api

# Pour la production
# VITE_API_URL=https://votre-backend.railway.app/api
```

### Configuration Axios

Le fichier `src/services/api.ts` configure :
- URL de base de l'API
- Intercepteurs pour les tokens JWT
- Gestion automatique des erreurs 401
- Headers par défaut

## 🎨 Styling

### Tailwind CSS
- Classes utilitaires pour le styling
- Design system cohérent
- Responsive design

### Material-UI
- Composants UI prêts à l'emploi
- Thème personnalisé
- Composants de formulaire

### Framer Motion
- Animations de page
- Transitions fluides
- Effets visuels

## 🔐 Sécurité

### Authentification
- Tokens JWT stockés dans localStorage
- Intercepteurs Axios pour l'authentification automatique
- Redirection automatique en cas d'expiration
- Protection des routes privées

### Validation
- Validation côté client avec Yup
- Validation des formulaires
- Messages d'erreur clairs

## 📱 Responsive Design

L'application est optimisée pour :
- **Desktop** : Interface complète
- **Tablet** : Adaptation des composants
- **Mobile** : Navigation simplifiée

## 🚀 Build et Déploiement

### Build de Production
```bash
npm run build
```

Le build génère un dossier `dist/` optimisé pour la production.

### Prévisualisation
```bash
npm run preview
```

### Déploiement
- **Railway** : Configuration automatique
- **Vercel** : Déploiement simple
- **Netlify** : Build automatique

## 🐛 Dépannage

### Problèmes Courants

1. **Erreur CORS**
   - Vérifier l'URL de l'API dans `.env`
   - Vérifier la configuration CORS du backend

2. **Erreur de build**
   - Vérifier les dépendances : `npm install`
   - Vérifier la configuration TypeScript

3. **Erreur d'authentification**
   - Vérifier la configuration JWT
   - Vérifier les tokens dans localStorage

### Debug

```bash
# Mode debug
npm run dev -- --debug

# Ouvrir les DevTools
# Vérifier l'onglet Network pour les requêtes API
# Vérifier l'onglet Console pour les erreurs
```

## 📚 Ressources

- [Documentation React](https://react.dev/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation Material-UI](https://mui.com/)

## 🤝 Contribution

1. Fork le repository
2. Créer une branche feature
3. Développer les fonctionnalités
4. Tester le code
5. Créer une Pull Request

---

**Note** : Ce frontend fait partie de l'application ErdrePulse. Consultez le README principal pour plus d'informations sur l'architecture complète.
