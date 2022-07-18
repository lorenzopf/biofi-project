'use strict';
let mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let userActivitySchema = mongoose.Schema({
    user_id: ObjectId,
    sobriety_rate: { type: Number, min: 0, max: 5, default: 0 },
    quizz_effectued: { type: Number, min: 0, default: 0},
    profil_completed: { type: Number, min: 0, max: 1, default: 0},
}, { collection: 'UserActivity' });

module.exports = mongoose.model('UserActivity', userActivitySchema);