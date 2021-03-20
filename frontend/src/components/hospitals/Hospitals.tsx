import React, { Fragment,useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import HospitalContext from '../../context/hospital/hospitalContext';
import HospitalItem from  './HospitalItem';
import HospitalFilter from './HospitalFilter';

const Hospitals = () => {
	const hospitalContext = useContext(HospitalContext);
	const { hospitals, filtered, getHospitals, loading } = hospitalContext;

	useEffect(() => {
		getHospitals()
	}, []);

	if ( hospitals !== null && hospitals.length === 0 ) {
		return <h4>No hospitals. Please add a hospital.</h4>
	}
	return (
		<Fragment>
			{
				hospitals !== null && !loading ? (
					<div className="row mt">
					    <div className="col-lg-12">
					        <div className="content-panel">
					            <h4><i className="fa fa-angle-right"></i> Hopistals List</h4>
					            <HospitalFilter />
					            <section id="unseen">
					                <table className="table table-bordered table-striped table-condensed">
					                    <thead>
					                        <tr>
					                            <th>Name</th>
					                            <th>Adress</th>
					                            <th>Phone</th>
					                            <th className="text-center">Actions</th>
					                        </tr>
					                    </thead>
				                    	<TransitionGroup component="tbody">
                  							{ filtered !== null ?
                  								filtered.map((hospital) => (
                  									<CSSTransition key={hospital._id} timeout={500}>
                  										<HospitalItem hospital={hospital}/>
                  									</CSSTransition>
                  								)) :
                  								hospitals.map((hospital) => (
                  									<CSSTransition key={hospital._id} timeout={500}>
                  										<HospitalItem hospital={hospital}/>
                  									</CSSTransition>
                  								))
                  							}
                  						</TransitionGroup>
                            </table>
                        	</section>
                    		</div>
                			</div>
            				</div>

				): (
					<Spinner />
				)
			}
		</Fragment>
	)
}

export default Hospitals