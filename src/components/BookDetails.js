import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../Queries/queries';


function BookDetails(props) {
    console.log("props", props);
    const { bookId } = props
    const { loading, error, data } = useQuery(GET_BOOK, {
        variables: {
             id: bookId 
            }
    });
    console.log("data", data);
    
    // let displayBookDetails = () => {
    //     const { book } = data;
    //     if (book) {
    //         return(
    //             <div>
    //                 <div>
    //                 <h2>{ book.name }</h2>       
    //                 </div>
    //                 <div>
    //                 <p>{ book.genre }</p>
    //                 <p>{ book.author.name }</p>     
    //                 </div>
    //                 <div>
    //                 <ul className="other-books">
    //                     {book.author.books.map(item => {
    //                         return <li key={item.id}>{item.name}</li>
    //                     })}
    //                 </ul>      
    //                 </div>
    //             </div>
    //         )
    //     } 
    //   }
    
    if (loading) return <p>Loading books...</p>;
    if (error) return <p>No Book Selected....</p>;
        const { book } = data;
        if (book) {
            return(
                <div id="book-details">
                    <div>
                    <h2>{ book.name }</h2>       
                    </div>
                    <div>
                    <p>{ book.genre }</p>
                    <p>{ book.author.name }</p>     
                    </div>
                    <div>
                    <ul className="other-books">
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>      
                    </div>
                </div>
            )
        } 
    // return (
    //     <div id="book-details">
    //         <p>{displayBookDetails()}</p>
    //     </div>
    // );
};

export default BookDetails;