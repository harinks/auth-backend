const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.Mongo_URL, {}, (err) =>{
        if(err) throw err;
        console.log('database connected');
    })
}

module.exports = connect;