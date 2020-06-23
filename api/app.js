const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');

// Mongoose modellerini yükleme
const { Liste, Yapilacak } = require('./db/models');

// JSON parsalamak için middleware
app.use(bodyParser.json());

// CORS'a izin vermek için
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// liste için CRUD operasyonları
app.get('/listeler', (req, res) => {
    Liste.find({}).then((listeler) => {
        res.send(listeler);
    });
});

app.post('/listeler', (req, res) => {
    let baslik = req.body.baslik;
    let yeniListe = new Liste({
        baslik
    });
    yeniListe.save().then((liste) => {
        res.send(liste);
    })
});

app.put('/listeler/:id', (req, res) => {
    Liste.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
 });

app.delete('/:id', (req, res) => {
    Liste.findOneAndRemove({ _id: req.params.id }).then((silinen) => {
        res.send(silinen);
    })
});

// yapılacaklar için CRUD operasyonları

app.get('/:listeId/yapilacaklar', (req, res) => {
    Yapilacak.find({
        _listeId: req.params.listeId
    }).then((yapilacaklar) => {
        res.send(yapilacaklar)
    });
});

app.post('/:listeId/yapilacaklar', (req, res) => {
    let yeniYapilacak = new Yapilacak({
        icerik: req.body.icerik,
        _listeId: req.params.listeId
    });
    yeniYapilacak.save().then((dokuman) => {
        res.send(dokuman);
    });
});

app.put('/:listeId/:yapilacakId', async (req, res) => {
    try {
        const a = await Yapilacak.updateOne({ _listeId: req.params.listeId, _id: req.params.yapilacakId }, { $set: { icerik: req.body.icerik } });
        res.json(a)
    } catch (error) {
        res.json({ message: error })
    }
    
});

app.delete('/:listeId/:yapilacakId', (req, res) => {
    Yapilacak.findOneAndRemove({
        _id: req.params.yapilacakId,
        _listeId: req.params.listeId
    }).then((rD) => {
        res.send(rD);
    });
});

// Açık olduğu port
app.listen(3000, () => {
    console.log("Server'ın açık olduğu port:3000" );
})