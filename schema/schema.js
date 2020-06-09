const graphql = require("graphql");

const User = require("../mongoModels/user");
const Score = require("../mongoModels/score");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAccessToken = require("../middleware/accessToken.js");
const createRefreshToken = require("../middleware/refreshToken.js");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    tokenVersion: { type: GraphQLInt },
    score: {
      type: ScoreType,
      resolve(parent, args) {
        return Score.findOne({ userId: parent.id });
      },
    },
  }),
});

/* 

 "five_s": Array,
    "thirty_s": Array,
    "one_min": Array,
    "two_min": Array,
    "five_min": Array,
*/
const ScoreType = new GraphQLObjectType({
  name: "Score",
  fields: () => ({
    id: { type: GraphQLID },
    five_s: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
    thirty_s: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
    one_min: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
    two_min: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
    five_min: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },

    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const AuthData = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    userId: { type: GraphQLID },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args, { req, res }) {
        return User.findOne({ email: args.email });
      },
    },
    score: {
      type: ScoreType,
      // changed from id to userId
      args: { userId: { type: GraphQLID } },

      resolve(parent, args, { req, res }) {
        if (!req.isAuth) {
          console.log("not authenticated - user isAuth false");
          throw new Error("not authenticated");
          // return null;
        } else {
          if (args.userId) {
            return Score.findOne({ userId: args.userId });
          }
          console.log("user not fount");
          throw new Error("user not found");
          // return null;
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        /*  try {
          const existingUser = await User.findOne({ email: args.email });
          if (existingUser) {
            throw new Error('User exists already.');
          }
        }

          const hashedPassword = await bcrypt.hash(args.userInput.password, 12); */

        /*    let user = new User({
          name: args.name,
          email: args.email,
          password: hashedPassword,
        });
 */
        let myPromise = new Promise((resolve, reject) => {
          User.findOne({ email: args.email }, (err, res) => {
            if (err) console.log(err);

            console.log("res");
            console.log(res);
            // if user  with this email is not found
            if (res === null) {
              bcrypt.hash(args.password, 12).then((hashedPassword) => {
                let user = new User({
                  name: args.name,
                  email: args.email,
                  password: hashedPassword,
                  tokenVersion: 0,
                });

                return user.save((err, product) => {
                  if (err) console.log(err);

                  console.log("product");
                  console.log(product);

                  let arrOfZeros = [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ];

                  let newScore = new Score({
                    userId: product.id,
                    five_s: arrOfZeros,
                    thirty_s: arrOfZeros,
                    one_min: arrOfZeros,
                    two_min: arrOfZeros,
                    five_min: arrOfZeros,
                  });

                  newScore.save();

                  resolve(product);
                });
              });
            } else {
              resolve(null);
            }
          });
        });

        return myPromise;
      },
    },

    revokeRefreshTokensForUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, { req, res }) {
        return User.findOneAndUpdate(
          { _id: args.userId },
          { $inc: { tokenVersion: 1 } },
          {new: true},
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("response");
              console.log(response);
              
            }
          }
        );
      },
    },

    addScore: {
      type: ScoreType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        five_s: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
        thirty_s: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
        one_min: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
        two_min: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
        five_min: { type: new GraphQLList(new GraphQLList(GraphQLFloat)) },
      },
      resolve(parent, args, { req, res }) {
        // not a new Score!!! to not overwrite id

        if (!req.isAuth) {
          // throw new Error("not authenticatedddd");
          console.log("not authenticatedddd");
          return null;
        } else {
          console.log("authenticated");

          let update = {
            five_s: args.five_s,
            thirty_s: args.thirty_s,
            one_min: args.one_min,
            two_min: args.two_min,
            five_min: args.five_min,
          };

          return Score.findOneAndUpdate({ userId: args.userId }, update, {
            // to return updated object
            new: true,
            upsert: true, // Make this update into an upsert,
            useFindAndModify: false,
          });
        }
      },
    },

    login: {
      // type: UserType,
      type: AuthData,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },

      async resolve(parent, { email, password }, { req, res }) {
        const user = await User.findOne({ email: email });
        if (!user) {
          // throw new Error("User does not exist!");
          return {
            userId: null,
            token: "User does not exist!",
            tokenExpiration: null,
          };
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          // throw new Error("Password is incorrect!");
          return {
            userId: null,
            token: "Password is incorrect!",
            tokenExpiration: null,
          };
        }

        // if user is authenticated correctly

        res.cookie(
          "jid",
          /*    jwt.sign(
            { userId: user.id, email: user.email },
            "secretKeyForRefreshToken",
            {
              expiresIn: "7d",
            }
           ), */
          createRefreshToken(user),
          {
            //  not accessible by JS
            httpOnly: true,
          }
        );

        /*    const token = jwt.sign(
          { userId: user.id, email: user.email },
          "somesupersecretkey",
          {
            expiresIn: "1h",
          }
        ); */

        const token = createAccessToken(user);

        return { userId: user.id, token: token, tokenExpiration: 1 };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
