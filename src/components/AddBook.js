import React from 'react';
import { useQuery,useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../Queries/queries';

// const ADD_BOOK = gql`
//   mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
//     addBook(name: $name, genre: $genre, authorId: $authorId) {
//       id
//       name
//     }
//   }
// `;

function AddBook() {
    let name, genre, authorId
    const { loading, error, data } = useQuery(GET_AUTHORS);
    const [addBook] = useMutation(ADD_BOOK);
    
    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error :(</p>;

        const submitForm = (e) => {
            e.preventDefault();
            addBook({ variables: { 
                name: name.value,
                genre: genre.value,
                authorId: authorId.value 
            },
              refetchQueries: [{query: GET_BOOKS}] 
          });
            name.value = "";
            genre.value = "";
          
        }
    
    return (
     <div>
       <form id="add-book" onSubmit={submitForm}>
           <div className="field">
               <label>Book name:</label>
               <input type="text" 
                ref={ value => {name = value}}
               />
           </div>

           <div className="field">
               <label>Genre:</label>
               <input type="text" 
               ref={ value => { genre = value}}
               />
           </div>

           <div className="field">
               <label>Author:</label>
                 <select 
                 ref={ value =>{ authorId= value}}
                 >
                 <option>Select author</option>
                    {data.authors.map(author => (
                        <option
                        key={author.id}
                        value={author.id}
                        >
                        {author.name}
                        </option>
                    ))}
             </select>
           </div>

           <button>+</button>
       </form>
        </div>
    );
};

export default AddBook;