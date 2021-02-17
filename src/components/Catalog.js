import React from 'react'
import Book from "./Book";

function Catalog({ books, editableBook, bookUpdate, bookDelete }) {

	return (
		<div className="my-4">
			{books.map(book => {
				return <Book
					editable={book.id === editableBook?.id}
					key={book.id}
					book={book}
					bookUpdate={bookUpdate}
					bookDelete={bookDelete}
				/>
			})}
		</div>
	)
}

export default Catalog

