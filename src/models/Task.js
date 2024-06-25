const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    categoriaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  // Referencia a la colección Category
        required: true
    },
    estadoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',  // Referencia a la colección State
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
