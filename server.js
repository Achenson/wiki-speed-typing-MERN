const express = require("express");
const graphqlHttp = require("express-graphql");

const { ApolloServer } = require("apollo-server-express");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")
// const bodyParser = require("body-parser");

// bcrypt?

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))


/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
}); */



const isAuth = require("./middleware/is-auth");


// body parser unnecessary?, express-graphql can parse request according to its body type
// app.use(bodyParser.json());

app.use(isAuth);

/* app.use(
  "/graphql",
  graphqlHttp({
    schema,
    graphiql: true,
  })
);
 */
app.use(cookieParser())

app.post("/refresh_token", req => {
// 1. testing sending test cookie in request using postman 
  // console.log(req.headers);

  // testing sending cookie after cookie-parser is applied
  console.log(req.cookies);
  
  
})

 const apolloServer = new ApolloServer({
   schema: schema,
   playground: true,
  context: ({req, res}) => ({req, res}) 

 })



dotenv.config();

const MONGODB_CONNECTION_STRING = process.env.DB;

mongoose
  .connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection succesfull"))
  .catch((err) => console.log(err));

/* 
app.use('/graphql', graphqlHTTP( 
  {
    schema,
    // graphiql testing when we go to this address
    graphiql: true,
    context: ({ req, res }) => buildContext({ req, res }),


}));
 */

/* const server = new ApolloServer({
  schema,
  context: ({ req, res }) => buildContext({ req, res, User }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
}); */

// server.applyMiddleware({ app });

apolloServer.applyMiddleware({app, cors: false})

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
