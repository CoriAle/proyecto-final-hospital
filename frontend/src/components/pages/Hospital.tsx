import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Hospitals from '../hospitals/Hospitals';
import HospitalForm from '../hospitals/HospitalForm';
import AuthContext from '../../context/auth/authContext';

const Hospital = (props: any) => {
	const authContext = useContext(AuthContext);
	useEffect(()=> {
	  authContext.loadUser();
	  // eslint-disable-next-line
	},[]);

	return (
		<div>
		<h3 className="mb">
		  <i className="fa fa-angle-right"></i> Hopistals
		</h3>
		<HospitalForm/>
		<Hospitals/>

		</div>
	)
}

export default Hospital

