const express = require('express');
// const graphqlHTTP = require('express-graphql');

const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const bcrypt = require("bcrypt");
const passport = require("passport");

const { GraphQLLocalStrategy, buildContext } = require('graphql-passport');

const session = require('express-session');


const User = require("./mongoModels/user");

const uuid = require('uuidv4');

const SESSION_SECRECT = 'bad secret';

passport.use(
  new GraphQLLocalStrategy( async (email, password, done) => {


    const matchingUser = await User.findOne({email: email, password: password});
    // const matchingUser = users.find(user => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const matchingUser = await User.findById(id);
  // const matchingUser = users.find(user => user.id === id);
  done(null, matchingUser);
});


const app = express()

// @ts-ignore
app.use(session({
  
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());

app.use(cors())


dotenv.config();

const MONGODB_CONNECTION_STRING = process.env.DB;

mongoose.connect(MONGODB_CONNECTION_STRING, {useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log("connection succesfull"))
.catch(err => console.log(err));

/* 
app.use('/graphql', graphqlHTTP( 
  {
    schema,
    // graphiql testing when we go to this address
    graphiql: true,
    context: ({ req, res }) => buildContext({ req, res }),


}));
 */

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => buildContext({ req, res, User }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

server.applyMiddleware({ app });



app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
