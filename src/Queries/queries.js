import { gql } from '@apollo/client';

const GET_BOOKS = gql`
  query getBooksQuery {
    books{
      name
      genre
      id
    }
  }
`;

const GET_AUTHORS = gql`
  query getAuthorsQuery {
    authors{
      name
      id
    }
  }
`;


const ADD_BOOK = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const GET_BOOK = gql`
  query($id: ID!){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_BOOK }