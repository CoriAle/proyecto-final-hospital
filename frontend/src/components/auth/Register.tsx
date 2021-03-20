import React, { useState, useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { Link } from "react-router-dom";

const Register = (props:any) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { register } = authContext;
	const name = useRef() as React.RefObject<HTMLInputElement>;
	const email = useRef() as React.RefObject<HTMLInputElement>;
	const password = useRef() as React.RefObject<HTMLInputElement>;

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if(error === 'Invalid User') {
			setAlert(error, 'danger', 5000);
			clearErrors();
		}
	}, [error, isAuthenticated, props.history]);

	
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newUser = {
			name: name.current?.value,
			email: email.current?.value,
			password: password.current?.value,
		};

		register(newUser);
	};

	return (
		<section className="wrapper site-min-height">
			<div className=" form-login form-register">
				<h2 className="form-login-heading">Create an Account</h2>
				<div className="login-wrap">
					<form 
						className="form-horizontal tasi-form"
						onSubmit={onSubmit}
					>
				    <div className="form-group">
				      <label className="col-sm-2 control-label col-lg-2" htmlFor="name">
				        Name
				      </label>
				      <div className="col-lg-10">
				        <input
				        	type="text"
				        	className="form-control"
				        	id="name"
				        	name="name"
				        	ref={name}
				        />
				    	</div>
						</div>
				    <div className="form-group">
				      <label className="col-sm-2 control-label col-lg-2" htmlFor="email">
				        E-mail
				      </label>
				      <div className="col-lg-10">
				        <input
				        	type="email"
				        	className="form-control"
				        	id="email"
				        	name="email"
				        	ref={email}
				        />
				    	</div>
						</div>
				    <div className="form-group">
				      <label className="col-sm-2 control-label col-lg-2" htmlFor="password">
				        Password
				      </label>
				      <div className="col-lg-10">
				        <input
				        	type="password"
				        	className="form-control"
				        	id="password"
				        	name="password"
				        	ref={password}
				        />
				    	</div>
						</div>
					    <div className="text-right mt">
					    	<button type="submit" className="btn btn-theme btn-block mt">
					    		<i className="fa fa-sign-in" aria-hidden="true"></i> SIGN UP
					    	</button>
						</div>
					      <hr/>
					      <div className="registration">
					          - Or -<br />
					          <Link to="/login">
						          <a className="" href="#">
						             Sign In
						          </a>
					          </Link>
					      </div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Register