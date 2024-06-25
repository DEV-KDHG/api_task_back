const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    nameCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Category', categorySchema);
