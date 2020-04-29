const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
     // we don't have to pass id, because mongoDB will create it manualy 
    userId: String,
    "sec_5": Array,
    "sec_30": Array,
    "min_1": Array,
    "min_2": Array,
    "min_5": Array,
})

module.exports = mongoose.model('Score', scoreSchema);