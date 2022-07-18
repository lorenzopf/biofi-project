'use strict';
let mongoose = require('mongoose');
let quizzSchema = mongoose.Schema({
    
}, { collection: 'Quizz' });

module.exports = mongoose.model('Quizz', quizzSchema);