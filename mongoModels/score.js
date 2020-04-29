const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
     // we don't have to pass id, because mongoDB will create it manualy 
    authorId: String,
    score: Array
})

module.exports = mongoose.model('Score', scoreSchema);