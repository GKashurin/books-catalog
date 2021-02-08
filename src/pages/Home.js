import React from 'react'

import * as Yup from "yup";
import {Formik} from "formik";

function Home() {
	const validationSchema = Yup.object().shape({
		title: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		author: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		year: Yup.number().positive().integer().typeError('Должно быть числом').required('Поле обязательно'),
		ISBN: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
	})
	return (
		<div className="wrapper">

			{/*<Input/>*/}

			<Formik initialValues={{
				title: '',
				author: '',
				year: '',
				ISBN: ''
			}
			}
					validateOnBlur//валидация при переходе на след. поле
					onSubmit={(values) => {localStorage.setItem('uuu', JSON.stringify(values))}}//вместо вывода в консоль тут можно отправить данные на сервер или изменять стейт
					validationSchema={validationSchema}
			>
				{ ( {
						//объект внутри - это children
						values,
						errors,
						touched,//показывает, взаимодействовал ли пользователь с полем ранее
						handleChange, //вызывается, когда меняется значение формы
						handleBlur, //вызывается, когда пользователь уходит с поля
						isValid,//показывает валидна форма в данный момент или нет
						handleSubmit,// привязывается к кнопке отправки формы. Вызывает функцию onSubmit
						dirty//показывает, изменялись ли когда-то значения в форме
					} ) => (
					<div className='form'>
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
							<label htmlFor={'ISBN'}>введите ISBN</label><br/>
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
							className="btn btn-primary mx-2"
							disabled={!isValid && !dirty}
							onClick={handleSubmit}
							type='submit'
						>Добавить книгу</button>
					</div>
				)}
			</Formik>

			{/*<Catalog/>*/}

		</div>
	);
}

export default Home;