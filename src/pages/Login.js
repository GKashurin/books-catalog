import React from 'react'
import * as Yup from "yup";
import {Formik} from "formik";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserSuccess} from "../actions/actions";

function Login() {
	let dispatch = useDispatch()
	const history = useHistory();

	const isLoggedIn = useSelector(({loginReducer}) => loginReducer.isLoggedIn)
//toolkit. createSlice
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Введите верный email').required('Поле обязательно'),
		password: Yup.string().typeError('Должно быть строкой').required('Поле обязательно')
	})

	if (isLoggedIn) {
		history.push("/home")
	}

	return (
		<div>
			<div className="login-text">Новый пользователь?
				<Link to="/registration"> Зарегистрируйтесь</Link>
			</div>
			<Formik initialValues={{
				email: '',
				password: ''
			}
			}
					validateOnBlur//валидация при переходе на след. поле
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

						<button
							className="btn btn-primary mx-2"
							disabled={!isValid && !dirty}
							onClick={() => {
								dispatch(fetchUserSuccess())
							}}
							type='submit'
						>Войти</button>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default Login;