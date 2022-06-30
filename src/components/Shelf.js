import React from 'react'
import Book from './Book'
const SHELVES_TITLE =
{
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
}

const Shelf = (props) => {

    const { shelfId, books, changeShelfHandler } = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{SHELVES_TITLE[shelfId]}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {books.map((book) => (
                        <li key={book.id}>
                            <Book bookDetails={book} changeShelfHandler={changeShelfHandler} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Shelf