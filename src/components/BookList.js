import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../Queries/queries';

import BookDetails from './BookDetails'

function BookList() {
    const { loading, error, data } = useQuery(GET_BOOKS);
    let [selected, setSelected] = useState("");

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error :(</p>;
        console.log("data", data);
        let handleClick = (data) => {
            setSelected(data)
          }
        return  (
            <div>
                {data.books.map(book => (
                <div key={book.id}>
                    <ul id="book-list">
                        <li onClick={() => handleClick(book.id)}>{book.name}</li>
                    </ul>
                </div>
                ))}
                    <BookDetails bookId={selected} />
            </div>
        );
  }

export default BookList;