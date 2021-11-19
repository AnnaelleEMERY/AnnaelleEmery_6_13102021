const express = require('express');
const bodyParser = require('body-parser'); //pour rendre le corps de la requete en objet js utilisable 
const mongoose = require('mongoose');// base de donnée

const path = require('path');
const userRoutes = require('./routes/user'); //accès aux routes user
const saucesRoutes = require('./routes/sauces'); //accès aux routes des sauces

// Ajouter les variables .env
require('dotenv').config()
const db = process.env;

//connexion à la base de donnée
mongoose.connect('mongodb+srv://AnnaE:CoquilleJ56!!@cluster0.eqcby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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

app.use(bodyParser.json());

//static (car 'images' est un dossier statique)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes); // appliquer les routes des sauces
app.use('/api/auth', userRoutes); // appliquer les routes user

//exportation de app.js
module.exports = app;