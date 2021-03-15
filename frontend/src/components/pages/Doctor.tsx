import React from 'react'
import PropTypes from 'prop-types'
import Doctors from '../doctors/Doctors';
import DoctorForm from '../doctors/DoctorForm';

const Doctor = (props:any) => {
	return (
		<div>
			<DoctorForm />
			<Doctors/>
		</div>
	)
}



export default Doctor