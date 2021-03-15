import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";

const Navbar = (props:any) => {
	return (
		<aside>
		    <div id="sidebar"  className="nav-collapse ">
		        <ul className="sidebar-menu" id="nav-accordion">
		        <p className="centered">
		        	<a href="profile.html">
		        		<img src="assets/img/ui-sam.jpg" className="img-circle" width="60" />
		        	</a>
		        	</p>
		        <h5 className="centered">Marcel Newman</h5>
		        	 
		            <li className="mt">
		            	<NavLink to="/about" activeClassName="active">
		                    <i className="fa fa-dashboard"></i>
		                    <span>About</span>
		            	</NavLink>
		            </li>
		            <li className="mt">
		            	<NavLink to="/hospital" activeClassName="active">
		                    <i className="fa fa-dashboard"></i>
		                    <span>Hospital</span>
		            	</NavLink>
		            </li>
		            <li className="mt">
		            	<NavLink to="/doctor" activeClassName="active">
		                    <i className="fa fa-dashboard"></i>
		                    <span>Doctor</span>
		            	</NavLink>
		            </li>
		        </ul>
		    </div>
		</aside>
	)
}

export default Navbar