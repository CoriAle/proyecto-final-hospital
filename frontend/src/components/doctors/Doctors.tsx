import React, { Fragment,useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import DoctorContext from '../../context/doctor/doctorContext';
import PropTypes from 'prop-types';
import DoctorItem from  './DoctorItem';
import DoctorFilter from './DoctorFilter';

const Doctors = () => {
	const doctorContext = useContext(DoctorContext);
	const { doctors, filtered, getDoctors, loading } = doctorContext;

	useEffect(() => {
		getDoctors()
	}, []);

	if ( doctors && doctors.length === 0 ) {
		return <h4>No doctors. Please add a doctor.</h4>
	}
	return (
		<Fragment>
			{
				doctors  && !loading ? (
					<div className="row mt">
					  <div className="col-lg-12">
					    <div className="content-panel">
		            <h4><i className="fa fa-angle-right"></i> Doctors List</h4>
		            <DoctorFilter />
					      <section id="unseen">
	                <table className="table table-bordered table-striped table-condensed">
                    <thead>
                      <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Adress</th>
                          <th>Speciality</th>
                          <th className="text-center">Hospitals</th>
                          <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                  	<TransitionGroup component="tbody">
        							{ filtered ?
        								filtered.map((doctor) => (
        									<CSSTransition key={doctor._id} timeout={500}>
        										<DoctorItem doctor={doctor}/>
        									</CSSTransition>
        								)) :
        								doctors.map((doctor) => (
        									<CSSTransition key={doctor._id} timeout={500}>
        										<DoctorItem doctor={doctor}/>
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



export default Doctors