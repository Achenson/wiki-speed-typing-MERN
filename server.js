const express = require("express");
const graphqlHttp = require("express-graphql");

const { ApolloServer } = require("apollo-server-express");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// bcrypt?


const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());

// app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    graphiql: true,
  })
);

// app.use(cors())

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

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
