const mongoose = require('mongoose');

const ListSema = new mongoose.Schema({
    baslik: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

const Liste = mongoose.model('Liste', ListSema);

module.exports = { Liste };