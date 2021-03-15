import React, { useState, useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../../context/auth/authContext';

const Register = (props:any) => {
	const authContext = useContext(AuthContext);
	const { register } = authContext;
	const name = useRef() as React.RefObject<HTMLInputElement>;
	const email = useRef() as React.RefObject<HTMLInputElement>;
	const password = useRef() as React.RefObject<HTMLInputElement>;

	
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
		<div className="form-panel">
			<h4 className="mb">
		  	<i className="fa fa-angle-right"></i> Create an Account
		  </h4>
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
		    	<button type="submit" className="btn btn-theme mx">Sign Up</button>
				</div>
			</form>
		</div>
	)
}

export default Register