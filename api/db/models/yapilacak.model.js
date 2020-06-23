const mongoose = require('mongoose');

const YapilacakSema = new mongoose.Schema({
    icerik: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listeId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    tamamlanmaDurumu: {
        type: Boolean,
        default: false
    }
})

const Yapilacak = mongoose.model('Yapılacak', YapilacakSema);

module.exports = { Yapilacak };