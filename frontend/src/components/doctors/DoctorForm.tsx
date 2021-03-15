import React, { useState, useContext, useEffect } from 'react'
import DoctorContext from '../../context/doctor/doctorContext';
import { Doctor } from '../../models/doctor/doctor.model';
import PropTypes from 'prop-types'

const DoctorForm = () => {
	const doctorContext = useContext(DoctorContext);
	const { addDoctor, clearCurrent, updateDoctor, current } = doctorContext;
	
	useEffect(() => {
			if(current !== null) {
				setDoctor(current);
			} else {
				setDoctor({
					name: '',
					email: '',
					phone: '',
					adress: '',
					speciality: '',
				} as Doctor);
		};
	}, [doctorContext, current]);

	const [doctor, setDoctor] = useState({
		name: '',
		email: '',
		phone: '',
		adress: '',
		speciality: '',
	} as Doctor);

	const { name, email, phone, adress, speciality } = doctor;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDoctor({...doctor, [e.target.name]: e.target.value });

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (current === null) {
			addDoctor(doctor);
		} else {
			updateDoctor(doctor);
		}

		clearAll();
	};

	const clearAll = () => clearCurrent();

	return (
		<div className="form-panel">
			<h4 className="mb">
		  	<i className="fa fa-angle-right"></i> { current ? 'Edit Doctor' : 'Add Doctor' }
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
		        	value={name}
		        	onChange={onChange}
		        />
		    	</div>
				</div>
		    <div className="form-group">
		      <label className="col-sm-2 control-label col-lg-2" htmlFor="adress">
		      	Email
		      </label>
		      <div className="col-lg-10">
		        <input
		        	type="email"
		        	className="form-control"
		        	id="email"
		        	name="email"
		        	value={email}
		        	onChange={onChange}
		        />
		    	</div>
				</div>
		    <div className="form-group">
		      <label className="col-sm-2 control-label col-lg-2" htmlFor="phone">
		      	Phone
		      </label>
		      <div className="col-lg-10">
		        <input
		        	type="text"
		        	className="form-control"
		        	id="phone"
		        	name="phone"
		        	value={phone}
		        	onChange={onChange}
		        />
		    	</div>
				</div>
				<div className="form-group">
		      <label className="col-sm-2 control-label col-lg-2" htmlFor="phone">
		      	Adress
		      </label>
		      <div className="col-lg-10">
		        <input
		        	type="text"
		        	className="form-control"
		        	id="adress"
		        	name="adress"
		        	value={adress}
		        	onChange={onChange}
		        />
		    	</div>
				</div>
				<div className="form-group">
		      <label className="col-sm-2 control-label col-lg-2" htmlFor="phone">
		      	Speciality
		      </label>
		      <div className="col-lg-10">
		        <input
		        	type="text"
		        	className="form-control"
		        	id="speciality"
		        	name="speciality"
		        	value={speciality}
		        	onChange={onChange}
		        />
		    	</div>
				</div>
				
			  <div className="text-right mt">
			    	<button type="submit" className="btn btn-theme mx">Submit</button>
			    	<button className="btn btn-theme02 mx" onClick={clearAll}>Clear</button>
				</div>
			</form>
		</div>
	)
}

DoctorForm.propTypes = {

}

export default DoctorForm