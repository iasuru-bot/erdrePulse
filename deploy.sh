#!/bin/bash

# Script de lancement local pour ErdrePulse
# Usage: ./deploy.sh [backend|frontend|all]

set -e  # Arrêter le script en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Fonction pour vérifier les prérequis
check_prerequisites() {
    print_message "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        print_error "npm n'est pas installé"
        exit 1
    fi
    
    # Vérifier Git
    if ! command -v git &> /dev/null; then
        print_error "Git n'est pas installé"
        exit 1
    fi
    
    print_success "Tous les prérequis sont satisfaits"
}

# Fonction pour vérifier la configuration
check_configuration() {
    print_message "Vérification de la configuration..."
    
    # Vérifier les fichiers .env
    if [ ! -f "backend/.env" ]; then
        print_warning "Fichier .env manquant dans le backend"
        print_message "Copiez env.example vers .env et configurez les variables"
    fi
    
    if [ ! -f "frontend/.env" ]; then
        print_warning "Fichier .env manquant dans le frontend"
        print_message "Copiez env.example vers .env et configurez les variables"
    fi
    
    print_success "Vérification terminée"
}

# Fonction pour lancer le backend
start_backend() {
    print_message "Lancement du backend..."
    
    cd backend
    
    # Vérifier si le fichier .env existe
    if [ ! -f ".env" ]; then
        print_error "Fichier .env manquant dans le backend"
        print_message "Copiez env.example vers .env et configurez les variables"
        exit 1
    fi
    
    # Installer les dépendances
    print_message "Installation des dépendances..."
    npm install
    
    # Vérifier le statut des migrations
    print_message "Vérification du statut des migrations..."
    MIGRATION_STATUS=$(npx sequelize-cli db:migrate:status 2>&1)
    
    if echo "$MIGRATION_STATUS" | grep -q "up"; then
        print_success "Migrations déjà exécutées, passage aux seeds..."
    else
        print_message "Exécution des migrations..."
        npx sequelize-cli db:migrate
    fi
    
    # Vérifier le statut des seeds
    print_message "Vérification du statut des seeds..."
   
    
    # Démarrer le serveur
    print_message "Démarrage du serveur backend..."
    print_success "Backend démarré sur http://localhost:5000"
    npm start &
    
    cd ..
}

# Fonction pour lancer le frontend
start_frontend() {
    print_message "Lancement du frontend..."
    
    cd frontend
    
    # Vérifier si le fichier .env existe
    if [ ! -f ".env" ]; then
        print_error "Fichier .env manquant dans le frontend"
        print_message "Copiez env.example vers .env et configurez les variables"
        exit 1
    fi
    
    # Installer les dépendances
    print_message "Installation des dépendances..."
    npm install
    
    # Démarrer le serveur de développement
    print_message "Démarrage du serveur de développement..."
    print_success "Frontend démarré sur http://localhost:5173"
    npm run dev &
    
    cd ..
}

# Fonction pour afficher les informations de lancement
show_startup_info() {
    echo ""
    print_message "Informations de lancement :"
    echo ""
    echo "🌐 URLs d'accès :"
    echo "   Backend API: http://localhost:5000"
    echo "   Frontend: http://localhost:5173"
    echo ""
    echo "📋 Variables d'environnement requises :"
    echo ""
    echo "Backend (.env) :"
    echo "- NODE_ENV=development"
    echo "- MYSQL_URL_LOCAL=mysql://root:password@localhost:3306/user_management"
    echo "- JWT_SECRET=votre_secret_jwt"
    echo "- SMTP_HOST=smtp.gmail.com"
    echo "- SMTP_PORT=587"
    echo "- SMTP_USER=votre_email@gmail.com"
    echo "- SMTP_PASS=votre_mot_de_passe_app"
    echo "- FRONTEND_URL_LOCAL=http://localhost:5173"
    echo ""
    echo "Frontend (.env) :"
    echo "- VITE_API_URL=http://localhost:5000/api"
    echo ""
    echo "🗄️ Base de données :"
    echo "   Assurez-vous que MySQL est démarré et accessible"
    echo "   Créez la base de données : CREATE DATABASE user_management;"
    echo ""
    echo "🛑 Pour arrêter les serveurs :"
    echo "   Ctrl+C dans chaque terminal"
    echo ""
}

# Fonction pour nettoyer les processus
cleanup() {
    print_message "Arrêt des serveurs..."
    pkill -f "node.*index.js" || true
    pkill -f "vite" || true
    print_success "Serveurs arrêtés"
}

# Capturer Ctrl+C pour nettoyer
trap cleanup SIGINT

# Fonction principale
main() {
    echo "🚀 Script de lancement local ErdrePulse"
    echo "======================================="
    echo ""
    
    # Vérifier les arguments
    if [ $# -eq 0 ]; then
        print_error "Usage: $0 [backend|frontend|all]"
        exit 1
    fi
    
    # Vérifier les prérequis
    check_prerequisites
    
    # Vérifier la configuration
    check_configuration
    
    # Afficher les informations de lancement
    show_startup_info
    
    # Traiter les arguments
    case $1 in
        "backend")
            start_backend
            ;;
        "frontend")
            start_frontend
            ;;
        "all")
            start_backend
            sleep 3  # Attendre que le backend démarre
            start_frontend
            ;;
        *)
            print_error "Argument invalide: $1"
            print_error "Usage: $0 [backend|frontend|all]"
            exit 1
            ;;
    esac
    
    print_success "Lancement terminé!"
    print_message "Les serveurs sont maintenant en cours d'exécution"
    print_message "Appuyez sur Ctrl+C pour arrêter"
    
    # Attendre que l'utilisateur arrête les serveurs
    wait
}

# Exécuter la fonction principale
main "$@" 