const mongoose = require('mongoose');
require('mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
    },

    password: { 
        type: String, 
        required: true 
    }
});

userSchema.plugin(uniqueValidator);

// purifie les champs du model avant de les enregistrer sur la bd
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema);