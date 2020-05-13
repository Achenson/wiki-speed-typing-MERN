const graphql = require("graphql");

const User = require("../mongoModels/user");
const Score = require("../mongoModels/score");

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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    score: {
      type: ScoreType,
      // changed from id to userId
      args: { userId: { type: GraphQLID } },
      resolve(parent, args) {
        return Score.findOne({userId: args.userId});
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
        let user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        return user.save();
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
      resolve(parent, args) {
        // not a new Score!!! to not overwrite id
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
      },
    },


    
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
