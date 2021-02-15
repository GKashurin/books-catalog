import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

import Catalog from "../components/Catalog";
import firebase from 'firebase';

function Home() {
	const [books, setBooks] = useState([]);
	const [editableBook, setEditableBook] = useState(undefined)

	const bookUpdate = (book) => {
		const { id, ...otherBook } = book;
		if (!!editableBook) {
			setEditableBook(undefined);
			firebase.firestore().collection('books').doc(id).update(otherBook).then(() => {
				alert('Успешно обновлена книга');
				setBooks(books => books.map(x => x.id === id ? book : x));
			}).catch((err) => {
				alert('Ошибка обновления книги')
				console.log(err);
			});

			return;
		}

		setEditableBook(book);
	}

	const bookDelete = (book) => {
		firebase.firestore().collection('books').doc(book.id).delete().then(() => {
			setBooks(books => books.filter(x => x.id !== book.id))
		}).catch(err => {
			console.log(err);
			alert('Ошибка удаления книги');
		})
	}

	const bookAdd = (book) => {
		firebase.firestore().collection('books').add(book).then((value) => {
			setBooks(books => [...books, { id: value.id, ...book }]);
			alert('Успешно добавлена книга');

		}).catch(err => {
			console.log(err);
			alert('Ошибка добавления книги');
		})
	}

	useEffect(() => {
		firebase.firestore().collection('books').get().then(({ docs }) => {
			setBooks(docs?.map(x => ({ ...x.data(), id: x.id })));
		});
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
			}}
				validateOnBlur//валидация при переходе на след. поле
				onSubmit={bookAdd}
				validationSchema={validationSchema}
			>
				{({
					//объект внутри - это children
					values,
					errors,
					touched,//показывает, взаимодействовал ли пользователь с полем ранее
					handleChange, //вызывается, когда меняется значение формы
					handleBlur, //вызывается, когда пользователь уходит с поля
					isValid,//показывает валидна форма в данный момент или нет
					handleSubmit,// привязывается к кнопке отправки формы. Вызывает функцию onSubmit
					dirty//показывает, изменялись ли когда-то значения в форме
				}) => (
					<div className='addBookForm'>
						<p>
							<label htmlFor={'title'}>Название книги</label><br />
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
							<label htmlFor={'author'}>Автор</label><br />
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
							<label htmlFor={'year'}>Год издания</label><br />
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
							<label htmlFor={'ISBN'}>Введите ISBN</label><br />
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
				bookUpdate={bookUpdate}
				bookDelete={bookDelete}
			/>
		</div>
	);
}

export default Home;