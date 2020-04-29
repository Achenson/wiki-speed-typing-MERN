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
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    score: { type: ScoreType, resolve(parent, args) {} },
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

    user: { type: UserType, resolve(parent, args) {} },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
