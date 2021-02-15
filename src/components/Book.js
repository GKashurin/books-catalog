import React, { useState } from 'react'


function Book({ book, editable, bookUpdate, bookDelete }) {
	const [title, setTitle] = useState(book.title)
	const [author, setAuthor] = useState(book.author)
	const [year, setYear] = useState(book.year)
	const [ISBN, setISBN] = useState(book.ISBN)


	return (
		<>
			<div className="books">
				<div className="book">
					{
						!editable ?
							<>
								<h5>Название : <i>{book.title}</i></h5>
								<h5>Автор : <i>{book.author}</i></h5>
								<h5>Год издания : <i>{book.year}</i></h5>
								<h5>ISBN : <i>{book.ISBN}</i></h5>
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
									onChange={(event) => setAuthor(event.target.value)} />
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
					onClick={() => bookUpdate({ id: book.id, title, author, year, ISBN })}
					className="btn btn-primary m-2">{!editable ? "Изменить" : "Обновить"}
				</button>

				<button
					 onClick={() => bookDelete(book)}
					className="btn btn-danger m-2">Удалить
				</button>
			</div>
		</>
	)
}

export default Book