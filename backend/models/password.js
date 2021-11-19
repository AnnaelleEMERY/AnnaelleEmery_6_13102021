const passwordValidator = require('password-validator');

// Schéma de mot de passe plus sécurisé
const passwordSchema = new passwordValidator();

// Contraintes du mot de passe
passwordSchema
.is().min(8)                                    // Longueur minimum : 8
.has().uppercase()                              // Doit avoir au moins une majuscule
.has().lowercase()                              // Doit avoir au moins une minuscule
.has().digits()                                 // Doit avoir au moins un chiffre
.has().not().spaces()                           // Ne doit pas avoir d'espaces (bonne règle ?)
.is().not().oneOf(['Passw0rd', 'Password123', 'Motdepasse123', 'Motdep4sse']); // Blacklist de valeurs à proscrire

module.exports = passwordSchema;