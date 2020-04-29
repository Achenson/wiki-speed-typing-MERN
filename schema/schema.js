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
    "sec_5": { type: new GraphQLList(GraphQLInt) },
    "sec_30": {type: new GraphQLList(GraphQLInt)},
    "min_1": { type: new GraphQLList(GraphQLInt) },
    "min_2": { type: new GraphQLList(GraphQLInt)},
    "min_5": { type: new GraphQLList(GraphQLInt)},

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
        "sec_5": { type: new GraphQLList(GraphQLInt)},
        "sec_30": {  type: new GraphQLList(GraphQLInt)},
        "min_1": {  type: new GraphQLList(GraphQLInt)},
        "min_2": {  type: new GraphQLList(GraphQLInt) },
        "min_5": {  type: new GraphQLList(GraphQLInt) },
      },
      resolve(parent, args) {
        let score = new Score({
          authorId: args.userId,
          "sec_5": Array,
          "sec_30": Array,
          "min_1": Array,
          "min_2": Array,
          "min_5": Array,
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
