import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Hospitals from '../hospitals/Hospitals';
import HospitalForm from '../hospitals/HospitalForm';

const Hospital = (props: any) => {
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

