import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Doctors from '../doctors/Doctors';
import DoctorForm from '../doctors/DoctorForm';
import AuthContext from '../../context/auth/authContext';

const Doctor = (props:any) => {
	const authContext = useContext(AuthContext);
	useEffect(()=> {
	  authContext.loadUser();
	  // eslint-disable-next-line
	},[]); 

	return (
		<div>
			<h3 className="mb">
			  <i className="fa fa-angle-right"></i> Doctors
			</h3>
			<DoctorForm />
			<Doctors/>
		</div>
	)
}



export default Doctor