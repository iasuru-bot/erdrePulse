const isCoachOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Non authentifié' });
  }

  if (!req.user.coach && !req.user.admin) {
    return res.status(403).json({ message: 'Accès non autorisé. Rôle coach ou admin requis.' });
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Non authentifié' });
  }

  if (!req.user.admin) {
    return res.status(403).json({ message: 'Accès non autorisé. Rôle admin requis.' });
  }

  next();
};

module.exports = {
  isCoachOrAdmin,
  isAdmin
}; 