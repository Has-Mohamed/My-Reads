import React, { useState } from "react";
import { search } from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

let searchTimer;
const Search = (props) => {
    const { loading, handelLoading } = props
    const [searchList, setSearchList] = useState();

    const searchHandler = (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            const bookName = e.target.value
            if (bookName === "") {
                console.log(bookName === "");
                setSearchList()
                return

            }
            searchQuery(bookName)
        }, 500);

    }
    const searchQuery = async (bookName) => {
        handelLoading("search",true)
        const res = await search(bookName, 20).catch((error) => {
            console.log(error)
        });
        handelLoading("search",false)
        const bookList = Array.isArray(res) ? res : "No book match this name"
        setSearchList(bookList)
    }


    const searchResultCondition = Array.isArray(searchList) && !loading["search"]
    return (


        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/"
                    className="close-search"
                >Close</Link>

                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={searchHandler}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {loading["search"] && <Spinner />}

                    {searchResultCondition && searchList?.map((book) => {

                        return (
                            <li key={book.id}>
                                <Book
                                    bookDetails={book}
                                />
                            </li>
                        )
                    })}
                    {typeof searchList === "string" && !loading["search"] && <p>{searchList}</p>}
                </ol>
            </div>
        </div>

    )

}

export default Search