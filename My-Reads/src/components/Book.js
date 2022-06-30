import React, { useContext } from "react";
import { ShelfContext } from "../App";
import { update } from "../BooksAPI";
import BookRate from "./BookRate"

const Book = (props) => {

    const { bookDetails } = props

    const shelves = useContext(ShelfContext);
    const shelvesState = shelves["booksSortedByShelf"];
    const shelvesStateHandler = shelves["handelBookShelf"];

    const updateBook = (shelf) => {
        const bookWithShelf = { ...bookDetails, shelf }
        shelvesStateHandler(bookWithShelf)
        update(bookDetails, shelf);
    }

    const onChangeShelf = (e) => {
        updateBook(e.target.value)
    }

    const bookShelf = bookDetails?.shelf ?? Object.keys(shelvesState).find(shelf => shelvesState[shelf].some((i) => i.id === bookDetails.id)) ?? "none"
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${bookDetails?.imageLinks?.smallThumbnail})`
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={bookShelf} onChange={(e) => onChangeShelf(e)}>
                        <option value="blank" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{bookDetails.title}</div>
            <div className="book-authors">{
                bookDetails?.authors && bookDetails?.authors.map(author => <p key={author} style={{ margin: 0 }}>{author}</p>)
            }</div>
            <BookRate id={bookDetails.id} />
        </div>
    )
}

export default Book;