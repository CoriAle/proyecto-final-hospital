import React, { useState, useContext, useEffect } from 'react'
import HospitalContext from '../../context/hospital/hospitalContext';
import { Hospital } from '../../models/hospital/hospital.model';

const HospitalForm = () => {
	const hospitalContext = useContext(HospitalContext);
	const { addHospital,
			clearCurrent,
			updateHospital,
			current,
			error,
			loading 
		} = hospitalContext;
	
	useEffect(() => {
			if(current !== null) {
				setHospital(current);
			} else {
				setHospital({
					name: '',
					adress: '',
					phone: '',
				} as Hospital);
		};
	}, [hospitalContext, current]);


	const [hospital, setHospital] = useState({
		name: '',
		adress: '',
		phone: '',
	} as Hospital);

	const { name, adress, phone} = hospital;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setHospital({...hospital, [e.target.name]: e.target.value });

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (current === null) {
			addHospital(hospital);
		} else {
			updateHospital(hospital);
		}

		clearAll();
	};

	const clearAll = () => clearCurrent();

	return (
		<div className="form-panel">
			<h4 className="mb">
		  	<i className="fa fa-angle-right"></i> { current ? 'Edit Hospital' : 'Add Hospital' }
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
		    <div className="text-right mt">
		    	<button
		    		type="submit"
		    		className="btn btn-theme mx"
		    		disabled={!!loading}>
		    		Submit
		    	</button>
		    	<button 
		    		className="btn btn-theme02 mx"
		    		onClick={clearAll}
		    		type="button"
		    	>
		    		Clear
		    	</button>
				</div>
			</form>
		</div>
	)
}

HospitalForm.propTypes = {

}

export default HospitalForm