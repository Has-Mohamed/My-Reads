import React from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";


const ListBooks = (props) => {

  const { booksByShelf, loading } = props

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {loading["bookList"] && <Spinner />}
          {!loading["bookList"] && booksByShelf && Object.keys(booksByShelf).map((shelfId) => (
            <Shelf
              key={shelfId}
              books={booksByShelf[shelfId]}
              shelfId={shelfId}

            />
          ))}
        </div>
      </div>
      <div className="open-search">

        <Link to="/search">Add a book</Link>
      </div>
    </div>

  )
}

export default ListBooks;