import React, { useEffect, useContext } from 'react'
import Doctors from '../doctors/Doctors';
import DoctorForm from '../doctors/DoctorForm';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import DoctorContext from '../../context/doctor/doctorContext';

const Doctor = (props:any) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const doctorContext = useContext(DoctorContext);
	const { setAlert } = alertContext;
	const { error } = doctorContext;

	useEffect(()=> {
	  authContext.loadUser();
	  // eslint-disable-next-line
	},[]); 

	useEffect(() => {
		if(error) {
			console.log(error);
			setAlert(error,'danger', 5000);
		}
	}, [error]);

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