import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {

	return (
		<div className="wrapper">
			<Header/>
            <section>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/registration" component={Registration} />
                    {/*home будет приватный роутинг*/}
                    <Route path="/home" component={Home} />
                    <Route path="/exit" component={Login} />
                </Switch>
            </section>
            {/*<div className="content">*/}
			{/*    <Home/>*/}
			{/*    <Registration/>*/}
            {/*</div>*/}
		</div>
	);
}

export default App;