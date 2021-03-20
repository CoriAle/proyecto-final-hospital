import React, { useContext, Fragment} from 'react'
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";
import AuthContext from '../../context/auth/authContext';

const Navbar = (props:any) => {
	const authContext = useContext(AuthContext);
     const { isAuthenticated, logout, user } = authContext;
       const onLogout = () => {
         logout();
     };

     const authLinks = (
     	<aside>
		    <div id="sidebar"  className="nav-collapse ">
		        <ul className="sidebar-menu" id="nav-accordion">
		        <div className="centered">
			        <p>
			        	<a className="text-white" href="profile.html">
			        		<i className="fa fa-user fa-5x" aria-hidden="true"></i>
			        	</a>
			        </p>
			        <p>
			        	<a className="text-white" onClick={onLogout} href='#!'>
			        	  <i className='fa fa-sign-out'></i>
			        	  <span className='hide-sm'>Logout</span>
			        	</a>
			        </p>
		        	<h5 className="centered">{ user && user.name}</h5>
		        </div>
		            <li className="mt">
		            	<NavLink to="/hospital" activeClassName="active">
		                    <i className="fa fa-hospital-o"></i>
		                    <span>Hospital</span>
		            	</NavLink>
		            </li>
		            <li className="mt">
		            	<NavLink to="/doctor" activeClassName="active">
		                    <i className="fa fa-user-md"></i>
		                    <span>Doctor</span>
		            	</NavLink>
		            </li>
		            <li className="mt">
		            	<NavLink to="/about" activeClassName="active">
		                    <i className="fa fa-dashboard"></i>
		                    <span>About</span>
		            	</NavLink>
		            </li>
		        </ul>
		    </div>
		</aside>
     );

     if (isAuthenticated) {
     	return authLinks;
     } else {
     	return (<div></div>)
     }
}

export default Navbar