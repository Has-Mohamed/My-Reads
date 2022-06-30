import React, { useState } from "react";
import clsx from 'clsx'

const BookRate = (props) => {

    const storedBooksRate = localStorage.getItem("booksRate");
    const parsedStoredBooksRate = storedBooksRate ? JSON.parse(storedBooksRate) : {};
    const initialState = parsedStoredBooksRate?.[props.id] ?? 0;

    const [bookStars, setBookStars] = useState(initialState);

    const handelBookRate = (rate) => {
        const cloneStoredRates = { ...parsedStoredBooksRate, [props.id]: rate }

        localStorage.setItem("booksRate", JSON.stringify(cloneStoredRates));
        setBookStars(rate);
    }

    return (

        [1, 2, 3, 4, 5].map((i) => {
            const checked = bookStars >= i
            return <span key={i}
                onClick={() => handelBookRate(i)}
                className={clsx("fa fa-star", "rate-star", { "rate-star-checked": checked })}>

            </span>

        })
    )

}

export default BookRate