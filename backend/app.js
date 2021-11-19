const express = require('express');
const bodyParser = require('body-parser'); //pour rendre le corps de la requete en objet js utilisable 
const mongoose = require('mongoose'); // base de donnée
const helmet = require('helmet'); //pour une meilleure sécurité des cookies
const session = require('cookie-session');
const nocache = require('nocache');

// On donne accès au chemin de notre système de fichier
const path = require('path');

const userRoutes = require('./routes/user'); //accès aux routes user
const saucesRoutes = require('./routes/sauces'); //accès aux routes des sauces

// Ajouter les variables .env
require('dotenv').config()
const db = process.env;

//connexion à la base de donnée
mongoose.connect('mongodb+srv://' + db.DB_USER + ':' + db.DB_PASS + '@' + db.CLUSTER_DB + '/' + db.NAME_DB + '?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// activer express
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable
app.use(express.json());

// Middleware qui permet de parser les requêtes envoyées par le client, on peut y accéder grâce à req.body
app.use(express.urlencoded({
    extended: true
  }));

// utilisation du module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités
// sécurise : 
// requêtes HTTP, entêtes, protection XSS mineure, ...
app.use(helmet());

// Options pour sécuriser les cookies
const expiryDate = new Date(Date.now() + 3600000); // 1 heure (60 * 60 * 1000)
app.use(session({
  name: 'session',
  secret: process.env.SEC_SES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate
  }
}));

//Désactive la mise en cache du navigateur
app.use(nocache());

//static (car 'images' est un dossier statique)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes); // appliquer les routes des sauces
app.use('/api/auth', userRoutes); // appliquer les routes user

//exportation de app.js
module.exports = app;