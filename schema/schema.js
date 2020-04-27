const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// https://www.youtube.com/watch?v=5RGEODLhjhY&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&index=10
// ^ netninjs graphql testing


/* 
query relational
{
  book(id: "2") {
    name
    genre
    author {
      name
    }
  }
}

*/

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'  },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'  },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        // id: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            // parent is the book that we get from current query!
            resolve(parent, args){
                // console.log(parent);
                //  authorID comes from books array
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            // id will be attached to args(?)
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(authors, { id: args.id });
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
