const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
     // we don't have to pass id, because mongoDB will create it manualy 
    authorId: String,
    "5sec": Array,
    "30sec": Array,
    "1min": Array,
    "2min": Array,
    "5min": Array,
})

module.exports = mongoose.model('Score', scoreSchema);