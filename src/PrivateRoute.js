import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from "./pages/Home";
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => (
			auth === true) ? (
				<Home {...props}/>
			) : (
			<Redirect to="/" />
			)

			}
	/>
);
export default PrivateRoute;