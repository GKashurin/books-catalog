import React from 'react'
import * as Yup from "yup";
import {Formik} from "formik";
import {Link} from "react-router-dom";

function Registration() {

	const validationSchema = Yup.object().shape({
		name: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		secondName: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		email: Yup.string().email('Введите верный email').required('Поле обязательно'),
		password: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли не совпадают').required('Поле обязательно'),
	})

	return (
		<div>
			<div className="registration-text">
				Уже зарегистрирован?
				<Link to="/"> Войти</Link>
			</div>
			<Formik initialValues={{
				name: '',
				secondName: '',
				email: '',
				password: '',
				confirmPassword: ''
			}
			}
					validateOnBlur//валидация при переходе на след. поле
					onSubmit={(values) => {console.log(values)}}//вместо вывода в консоль тут можно отправить данные на сервер или изменять стейт
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
							<label htmlFor={'name'}>Имя</label><br/>
							<input
								className={'input'}
								type='text'
								name='name'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
							/>
						</p>
						{touched.name && errors.name && <p className={'error'}>{errors.name}</p>}

						<p>
							<label htmlFor={'secondName'}>Фамилия</label><br/>
							<input
								className={'input'}
								type='text'
								name='secondName'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.secondName}
							/>
						</p>
						{touched.secondName && errors.secondName && <p className={'error'}>{errors.secondName}</p>}

						<p>
							<label htmlFor={'email'}>email</label><br/>
							<input
								className={'input'}
								type='text'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
						</p>

						<p>
							<label htmlFor={'password'}>Пароль</label><br/>
							<input
								className={'input'}
								type='password'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
						</p>
						{touched.password && errors.password && <p className={'error'}>{errors.password}</p>}

						<p>
							<label htmlFor={'password'}>Подтвердите пароль</label><br/>
							<input
								className={'input'}
								type='password'
								name='confirmPassword'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.confirmPassword}
							/>
						</p>
						{touched.confirmPassword && errors.confirmPassword && <p className={'error'}>{errors.confirmPassword}</p>}

						{touched.email && errors.email && <p className={'error'}>{errors.email}</p>}
						<button
							className="btn btn-primary mx-2"
							disabled={!isValid && !dirty}
							onClick={handleSubmit}
							type='submit'
						>Отправить</button>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default Registration;