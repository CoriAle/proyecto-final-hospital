import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
const Login = (props:any) => {
	return (
		<div id="login-page">
		  	<div className="container">
				<form className="form-login" action="index.html">
				  <h2 className="form-login-heading">sign in now</h2>
				  <div className="login-wrap">

				      <input type="text" className="form-control" placeholder="User ID" autoFocus />
				      <br />
				      <input type="password" className="form-control" placeholder="Password" />
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
				  <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabIndex={-1} id="myModal" className="modal fade">
				      <div className="modal-dialog">
				          <div className="modal-content">
				              <div className="modal-header">
				                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				              </div>
				              <div className="modal-body">
				                  <p>Enter your e-mail address below to reset your password.</p>
				                  <input type="text" name="email" placeholder="Email" autoComplete="off" className="form-control placeholder-no-fix" />
				              </div>
				              <div className="modal-footer">
				                  <button data-dismiss="modal" className="btn btn-default" type="button">Cancel</button>
				                  <button className="btn btn-theme" type="button">Submit</button>
				              </div>
				          </div>
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