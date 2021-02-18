import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import {Formik} from "formik";
import firebase from 'firebase';

import Catalog from "../components/Catalog";
import {useDispatch, useSelector} from "react-redux";
import {
	addBookToFirebase,
	initialiseBooks,
	removeBookFromFirebase,
	updateBook
} from "../actions/actions";

function Home() {
	const [,setBooks] = useState([]);
	const [editableBook, setEditableBook] = useState(undefined)
	const books = useSelector((state => state.booksReducer));
	const dispatch = useDispatch();

	const updateBookToFirebase = (book) => {
		const { id, ...otherBook } = book;
		if (!!editableBook) {
			setEditableBook(undefined);

			firebase.firestore().collection('books').doc(id).update(otherBook)
				.then(() => {
					dispatch(updateBook({ id: book.id, ...book }))
				setBooks(books => books.map(item => item.id === id ? book : item))
			})

				.catch((err) => console.log(err));
			return;
		}

		setEditableBook(book);
	}

	const bookDelete = (book) => {
		dispatch(removeBookFromFirebase(book))
	}

	const handleOnSubmitAddBookForm = (book, {resetForm}) => {
		dispatch(addBookToFirebase(book));
		resetForm();
	}

	useEffect(() => {
		dispatch(initialiseBooks());

	}, []);

	const validationSchema = Yup.object().shape({
		title: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		author: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		year: Yup.number().positive().integer().typeError('Должно быть числом').required('Поле обязательно'),
		ISBN: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
	})
	return (
		<div className="wrapper">

			<Formik initialValues={{
				title: '',
				author: '',
				year: '',
				ISBN: ''
			}
			}
					validateOnBlur
					onSubmit={handleOnSubmitAddBookForm}
					validationSchema={validationSchema}
			>
				{ ( {

						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						isValid,
						handleSubmit,
						dirty
					} ) => (
					<div className='addBookForm'>
						<p>
							<label htmlFor={'title'}>Название книги</label><br/>
							<input
								className={'input'}
								type='text'
								name='title'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
								placeholder="Введите название книги"
							/>
						</p>
						{touched.title && errors.title && <p className={'error'}>{errors.title}</p>}

						<p>
							<label htmlFor={'author'}>Автор</label><br/>
							<input
								className={'input'}
								type='text'
								name='author'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.author}
								placeholder='Введите автора'
							/>
						</p>
						{touched.author && errors.author && <p className={'error'}>{errors.author}</p>}

						<p>
							<label htmlFor={'year'}>Год издания</label><br/>
							<input
								className={'input'}
								type="number"
								name='year'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.year}
								placeholder='Введите год издания'
							/>
						</p>

						<p>
							<label htmlFor={'ISBN'}>Введите ISBN</label><br/>
							<input
								className={'input'}
								type='text'
								name='ISBN'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.ISBN}
								placeholder='Введите ISBN'
							/>
						</p>
						{touched.ISBN && errors.ISBN && <p className={'error'}>{errors.ISBN}</p>}

						<button
							className="btn btn-primary m-4"
							disabled={!isValid && !dirty}
							onClick={handleSubmit}
							type='submit'
						>Добавить книгу</button>
					</div>
				)}
			</Formik>
			<Catalog
				books={books}
				editableBook={editableBook}
				bookUpdate={updateBookToFirebase}
				bookDelete={bookDelete}
			/>
		</div>
	);
}

export default Home;