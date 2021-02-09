import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {deleteBook, updateBook} from "../actions/actions";

function Book({book}) {
	const [editable, setEditable] = useState(false)
	const [values, setValues] = useState(book.values)

	let dispatch = useDispatch();
	return (
		<>
			<div className="books">
				<div className="book">

					<h5>Название : <i>{book.values.title}</i></h5>
					<h5>Автор : <i>{book.values.author}</i></h5>
					<h5>Год издания : <i>{book.values.year}</i></h5>
					<h5>ISBN : <i>{book.values.ISBN}</i></h5>
				</div>
				<button
					onClick={() => {

					}}
					className="btn btn-primary m-2">Изменить
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