const express = require("express");
const graphqlHttp = require("express-graphql");

const { ApolloServer } = require("apollo-server-express");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const jwt = require("jsonwebtoken");
const User = require("./mongoModels/user");
const createAccessToken = require("./middleware/accessToken")
const createRefreshToken = require("./middleware/refreshToken")

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

app.post("/refresh_token", async (req, res) => {
// 1. testing sending test cookie in request using postman 
// cookies -> add domain: localhost -> coookie name: jid
  // console.log(req.headers);

  // testing sending cookie after cookie-parser is applied
  console.log(req.cookies);

  const token = req.cookies.jid;

  if (!token) {
    return res.send({ok: false, accessToken: ""})
    console.log("refresh token erorr");
  }
  
  let payload = null;

  try {
    payload = jwt.verify(token, "secretKeyForRefreshToken")
  } catch (err) {
    console.log(err);
    console.log("refresh token erorr2");
    return res.send({ok: false, accessToken: ""})
  }


  // token is valid
  // we can send access token
  const user = await User.findById(payload.userId)

  if (!user) {

    console.log("refresh token erorr3");
    return res.send({ok: false, accessToken: ""})
    
  }
  
  res.cookie("jid", createRefreshToken(user), {
    httpOnly: true
  } )



  return res.send({ok: true, accessToken: createAccessToken(user)})



  //  testing: send login mutation in graphql, get accessToken
  // testin2: take refresh cookie from res (sieć) 
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
