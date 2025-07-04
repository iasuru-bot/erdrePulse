require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const bilanRoutes = require('./routes/bilanRoutes');
const optionRoutes = require('./routes/optionRoutes');
const userRoutes = require('./routes/userRoutes');
const referencesRoutes = require('./routes/references');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration du proxy
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());

// Limiter les requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: true
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/bilans', bilanRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/references', referencesRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API de gestion d\'utilisateurs' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
    
    await sequelize.sync();
    console.log('Base de données synchronisée.');

    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
  }
};

startServer();
