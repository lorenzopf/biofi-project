'use strict';
let mongoose = require('mongoose');
let rewardSchema = mongoose.Schema({
    
}, { collection: 'Reward' });

module.exports = mongoose.model('Reward', rewardSchema);