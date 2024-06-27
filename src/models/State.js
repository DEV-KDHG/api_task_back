// models/State.js
const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    nameState: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
       
    }
});

module.exports = mongoose.model('State', stateSchema);  // Asegúrate de que el primer parámetro sea 'State'
