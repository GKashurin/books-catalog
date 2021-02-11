import React from 'react'
import Book from "./Book";
import {useSelector} from "react-redux";

function Catalog() {

	let books = useSelector(({booksReducer}) => booksReducer)
	return (
		<div className="my-4">
			{books.map(book => {
				return <Book
					key={book.id}
					book={book}/>
			})}
		</div>
	)
}

export default Catalog