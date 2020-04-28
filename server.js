const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const dotenv = require('dotenv')


const app = express()


dotenv.config();

const MONGODB_CONNECTION_STRING = process.env.DB;

mongoose.connect(MONGODB_CONNECTION_STRING, {useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log("connection succesfull"))
.catch(err => console.log(err));


app.use('/graphql', graphqlHTTP({
    schema,
    // graphiql testing when we go to this address
    graphiql: true
}));



app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
