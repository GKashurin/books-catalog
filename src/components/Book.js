import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {deleteBook, updateBook} from "../actions/actions";

function Book({book}) {
	const [editable, setEditable] = useState(false)
	const [title, setTitle] = useState(book.values.title)
	const [author, setAuthor] = useState(book.values.author)
	const [year, setYear] = useState(book.values.year)
	const [ISBN, setISBN] = useState(book.values.ISBN)

	let dispatch = useDispatch();

	const bookUpdate = () => {
		dispatch(updateBook(
		{
		 		id: book.id,
		 		title,
				author,
				year,
				ISBN
		}
		))
		setEditable(!editable)
	}

	return (
		<>
			<div className="books">
				<div className="book">
					{
						!editable ?
							<>
								<h5>Название : <i>{book.values.title}</i></h5>
								<h5>Автор : <i>{book.values.author}</i></h5>
								<h5>Год издания : <i>{book.values.year}</i></h5>
								<h5>ISBN : <i>{book.values.ISBN}</i></h5>
							</>
							: <div className="addBookForm">
								<input type="text"
									   value={title}
									   name="title"
									   onChange={(event) => setTitle(event.target.value)}
								/>
								<input type="text"
									   value={author}
									   name="author"
									   onChange={(event) => setAuthor(event.target.value)}/>
								<input type="number"
									   value={year}
									   name="year"
									   onChange={(event) => setYear(event.target.value)}
								/>
								<input type="text"
									   value={ISBN}
									   name="ISBN"
									   onChange={(event) => setISBN(event.target.value)}
								/>
							</div>

					}


				</div>
				<button
					onClick={bookUpdate}
					className="btn btn-primary m-2">{!editable ? "Изменить" : "Обновить"}
				</button>

				<button
					onClick={() => dispatch(deleteBook(book.id))}
					className="btn btn-danger m-2">Удалить
				</button>
			</div>
		</>
	)
}

export default Book