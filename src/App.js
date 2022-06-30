import "./App.css";
import { useState, createContext, useEffect } from "react";
import ListBooks from "./components/ListBooks";
import { Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import { getAll } from "./BooksAPI";


export const ShelfContext = createContext({
  booksSortedByShelf: {},
  handelBookShelf: () => { }
});

const handelBookByShelf = (books) => {
  const shelves = {}
  if (books) {
    books.forEach((book) => {
      if (Object.hasOwnProperty.call(shelves, book.shelf)) {
        shelves[book.shelf] = [...shelves[book.shelf], book];
      } else {
        shelves[book.shelf] = [book];
      }
    });

  }
  return shelves
};
function App() {
  // const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState({
    search: false,
    bookList: false
  });

  const handelBookList = (bookList) => {
    setBooks(bookList)
  }

  const handelLoading = (key, state) => {
    setLoading((prev) => ({ ...prev, [key]: state }))
  }

  useEffect(() => {
    getAllBooks();
    return () => { }
  }, []);

  const getAllBooks = async () => {
    handelLoading("bookList", true)
    const res = await getAll();
    handelLoading("bookList", false)

    handelBookList(res)

  }


  const handelBooksOnShelves = (book) => {
    const bookClone = [...books]
    const bookIndex = bookClone.findIndex((i) => i.id === book.id);
    if (book.shelf === "none") {

    }
    if (bookIndex !== -1) {
      bookClone[bookIndex] = book
      if (book.shelf === "none") delete bookClone[bookIndex]
    } else {
      bookClone.push(book)
    }
    setBooks(bookClone)
  }

  const booksByShelf = handelBookByShelf(books)

  const contextValue = {
    booksSortedByShelf: booksByShelf,
    handelBookShelf: handelBooksOnShelves
  };



  return (
    <div className="app">

      <ShelfContext.Provider value={contextValue} >
        <Routes >
          <Route
            exact
            path="/"
            element={
              <ListBooks
                booksByShelf={booksByShelf}
                loading={loading}

              />}
          />
          <Route
            path="/search"
            element={
              <Search
                handelLoading={handelLoading}
                loading={loading}


              />}
          />
        </Routes>

      </ShelfContext.Provider >

    </div>
  );
}

export default App;
