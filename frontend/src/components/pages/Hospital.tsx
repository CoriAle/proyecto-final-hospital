import React, { useContext, useEffect } from 'react'
import Hospitals from '../hospitals/Hospitals';
import HospitalForm from '../hospitals/HospitalForm';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import HospitalContext from '../../context/hospital/hospitalContext';

const Hospital = (props: any) => {
	const hospitalContext = useContext(HospitalContext);
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const { error } = hospitalContext;

	useEffect(()=> {
	  authContext.loadUser();
	  // eslint-disable-next-line
	},[]);

	useEffect(() => {
		if(error) {
			console.log(error);
			setAlert(error,'danger', 5000);
		}
	}, [error])

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

