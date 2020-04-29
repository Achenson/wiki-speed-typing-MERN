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
        return Score.findById(args.id);
      },
    },
  }),
});

const ScoreType = new GraphQLObjectType({
  name: "Score",
  fields: () => ({
    id: { type: GraphQLID },
    "5sec": { type: GraphQLList },
    "30sec": { type: GraphQLList },
    "1min": { type: GraphQLList },
    "2min": { type: GraphQLList },
    "5min": { type: GraphQLList },

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
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Score.findById(args.id);
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
        "5sec": { type: GraphQLList},
        "30sec": {  type: GraphQLList },
        "1min": {  type: GraphQLList },
        "2min": {  type: GraphQLList },
        "5min": {  type: GraphQLList },
      },
      resolve(parent, args) {
        let score = new Score({
          authorId: args.userId,
          "5sec": Array,
          "30sec": Array,
          "1min": Array,
          "2min": Array,
          "5min": Array,
        });
        return score.save()
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
