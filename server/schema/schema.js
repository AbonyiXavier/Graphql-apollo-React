const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require("graphql");

const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");



const BookType = new GraphQLObjectType({
    name:"Book",
    fields: () => ({
        id:{
            type: GraphQLID
        },
        name:{
            type: GraphQLString
        },
        genre:{
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log("parent", parent);
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields: () => ({
        id:{
            type: GraphQLID
        },
        name:{ 
            type: GraphQLString
        },
        age:{
            type: GraphQLInt
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log("id", parent.id);
                // return _.filter(books, { authorId: parent.id})
                return Book.find({})

            }
        }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                   type: GraphQLID
                }
            },
            resolve(parentValue, args) {
            // return _.find(books, { id: args.id })
            const getBook = Book.findById(args.id)
            return getBook;
                          
          }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args) {
            // return books;
            const allBooks = Book.find(parentValue)
            return allBooks;
                          
          }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                   type: GraphQLID
                }
            },
            resolve(parentValue, args) {
            // return _.find(authors, { id: args.id })
            const getAuthor = Author.findById(args.id)
            return getAuthor;
          }
        },
        authors: {
            type:  new GraphQLList(AuthorType),
            resolve(parentValue, args) {
                const allAuthors = Author.find(parentValue)
                return allAuthors;
                   
          }
        },
       
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
        deleteBook: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }   
            },
            resolve(parentValue, args) {
                return Book.findOneAndDelete(args.id);
            }
        },
        deleteBooks: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args) {
                return Book.deleteMany(parentValue);       
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query:  RootQuery,
    mutation
})