import React, { useState, useContext, useEffect }from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props:any) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if(error === 'Invalid Credentials') {
			setAlert(error, 'danger', 5000);
			clearErrors();
		}
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const { email, password } = user;


	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
	{	console.log(e.target.name)
		setUser({...user, [e.target.name]: e.target.value });
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log("Aca")
		e.preventDefault();
		    if (email === '' || password === '') {
		      setAlert('Please fill in all fields', 'danger', 5000);
		    } else {
		      login({
		        email,
		        password,
		      });
		    }
		};

	return (
		<div id="login-page">
		  	<div className="container">
				<form className="form-login" onSubmit={onSubmit}>
				  <h2 className="form-login-heading">sign in now</h2>
				  <div className="login-wrap">

				      <input
				      	type="text"
				      	className="form-control"
				      	placeholder="Email"
				      	autoFocus 
				      	name="email"
				      	value={email}
				      	onChange={onChange}
				      />
				      <br />
				      <input type="password"
					    className="form-control"
					    placeholder="Password"
					    name="password"
					    value={password}
					    onChange={onChange}
				       />
				      <button className="btn btn-theme btn-block" type="submit"><i className="fa fa-lock"></i> SIGN IN</button>
				      <hr/>
				      <div className="registration">
				          Don't have an account yet?<br />
				          <Link to="/register">
					          <a className="" href="#">
					              Create an account
					          </a>
				          </Link>
				      </div>
				  </div>
				</form>	  	
		  	</div>
		</div>
	)
}

// Login.propTypes = {

// }

export default Login;