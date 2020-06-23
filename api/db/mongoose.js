const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://tahsinokan:tahsin@cluster0-xfooh.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDb ye bağlantı kuruldu.');
}).catch((e) => {
    console.log('MongoDb ye bağlantı kurulurken hata oluştu.');
    console.log(e);
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};