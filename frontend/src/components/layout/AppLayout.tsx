import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SidePanel from './SidePanel';
import { useAuth } from '../../contexts/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidePanel?: boolean;
  sidePanelTitle?: string;
  sidePanelDescription?: string;
  sidePanelIllustration?: string;
}

export default function AppLayout({ 
  children, 
  showSidePanel = true,
  sidePanelTitle = "Bienvenue sur Erdre Pulse",
  sidePanelDescription = "Rejoignez notre communauté dynamique pour atteindre vos objectifs de forme.",
  sidePanelIllustration = "/images/logo_short_b.png"
}: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Pages où la navbar et le footer ne doivent pas être affichés
  const noLayoutPages = ['/register', '/login', '/forgot-password', '/reset-password', '/verify-email', '/', '/cgu','/logout-success', '/account-deleted'];
  const shouldShowLayout = !noLayoutPages.includes(location.pathname);
  const hideBackButtonRoutes = ['/reset-password', '/verify-email', '/', '/logout-success'];


  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar */}
      {shouldShowLayout && (
        <header className="w-full bg-white shadow-md z-50 relative" role="banner">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="text-xl font-semibold tracking-wider text-[#023047]">
              <img 
                src="/images/logo_short.png" 
                alt="Erdre Pulse Logo" 
                className="object-contain m-auto"
                width={70}
              />
            </div>

            <nav className="hidden md:flex space-x-6" role="navigation" aria-label="Navigation principale">
              <Link to="/dashboard" className="text-[#023047] hover:text-[#219EBC] transition-colors duration-200">
                Accueil
              </Link>
              {isAuthenticated && user && user.coach && !user.admin && (
                <>
                  <Link to="/users" className="text-[#023047] hover:text-[#219EBC] transition-colors duration-200">
                    Gestion utilisateurs
                  </Link>
                </>
              )}
              {isAuthenticated && user && user.admin && (
                <>
                  
                  <Link to="/users" className="text-[#023047] hover:text-[#219EBC] transition-colors duration-200">
                    Gestion utilisateurs
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Link to="/profile" className="text-[#023047] hover:text-[#219EBC] transition-colors duration-200">
                    Profil
                  </Link>
                  <Link to="/logout-confirm" className="text-[#023047] hover:text-[#219EBC] transition-colors duration-200">
                    Déconnexion
                  </Link>
                </>
              )}
            </nav>

            <button
              className="md:hidden text-[#023047] bg-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
      )}

      {menuOpen && shouldShowLayout && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-white border-b w-full"
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="container mx-auto px-4">
            <Link 
              to="/dashboard" 
              onClick={handleLinkClick} 
              className="block py-2 text-[#023047] hover:text-[#219EBC] transition-colors duration-200"
              tabIndex={0}
            >
              Accueil
            </Link>
            {isAuthenticated && user && user.coach && !user.admin && (
              <>
                
                <Link 
                  to="/users" 
                  onClick={handleLinkClick} 
                  className="block py-2 text-[#023047] hover:text-[#219EBC] transition-colors duration-200"
                  tabIndex={0}
                >
                  Gestion utilisateurs
                </Link>
              </>
            )}
            {isAuthenticated && user && user.admin && (
              <>
                
                <Link 
                  to="/users" 
                  onClick={handleLinkClick} 
                  className="block py-2 text-[#023047] hover:text-[#219EBC] transition-colors duration-200"
                  tabIndex={0}
                >
                  Gestion utilisateurs
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link 
                  to="/profile" 
                  onClick={handleLinkClick} 
                  className="block py-2 text-[#023047] hover:text-[#219EBC] transition-colors duration-200"
                  tabIndex={0}
                >
                  Profil
                </Link>
                <Link 
                  to="/logout-confirm" 
                  onClick={handleLinkClick} 
                  className="block py-2 text-[#023047] hover:text-[#219EBC] transition-colors duration-200"
                  tabIndex={0}
                >
                  Déconnexion
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="flex-1 relative" role="main">
        {shouldShowLayout ? (
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        ) : (
          <div className="flex">
            {showSidePanel && (
              <SidePanel
                title={sidePanelTitle}
                description={sidePanelDescription}
                illustration={sidePanelIllustration}
              />
            )}

            {/* Contenu blanc à droite */}
            <div className="relative w-full md:ml-[50%] p-4 md:p-8 flex flex-col items-center justify-center bg-white min-h-screen">
              
              {/* Bouton Retour en haut à gauche */}
              {showSidePanel && !hideBackButtonRoutes.includes(location.pathname) && (
                <button 
                  onClick={() => navigate(-1)} 
                  className="absolute top-4 left-4 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-10 shadow hover:bg-gray-100 transition z-10"
                  aria-label="Retour à la page précédente"
                >
                  ← 
                </button>
              )}

              {/* Logo mobile */}
              {showSidePanel && (
                <div className="md:hidden mb-4 w-full max-w-xs align-items-center">
                  <img 
                    src="/images/logo.png" 
                    alt="Erdre Pulse Logo" 
                    className="object-contain m-auto"
                  />
                </div>
              )}

              {children}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {shouldShowLayout && (
        <footer className="w-full bg-[#023047] text-white py-3" role="contentinfo">
          <div className="container mx-auto px-4 text-center">
            © 2025 ErdrePulse. Tous droits réservés.
          </div>
        </footer>
      )}
    </div>
  );
}
