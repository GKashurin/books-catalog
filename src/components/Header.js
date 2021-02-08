import React from 'react';
import Logo from '../assets/logo.svg'
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions/actions";
import {useHistory} from "react-router-dom";

const Header = () => {
	let dispatch = useDispatch()
	const isLoggedIn = useSelector(({loginReducer}) => loginReducer.isLoggedIn)
	const history = useHistory();

	if (!isLoggedIn) {
		history.push("/")
	}
	return (
		<header className="header">
			<div className="logo">
				<img width="48" src={Logo} alt={'logo'}/>
			</div>
			<button
				onClick={() => dispatch(logOut(!isLoggedIn))}
				className="btn badge-light m-2"
			>Выйти
			</button>
		</header>
	);
}

export default Header;