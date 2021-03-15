import React, { useContext }from 'react'
import DoctorContext from '../../context/doctor/doctorContext';
import { Doctor } from '../../models/doctor/doctor.model'
import PropTypes from 'prop-types';


interface DoctorItemProps {
  doctor: Doctor;
}

const DoctorItem = (props:DoctorItemProps) => {
  const { doctor } = props;
  const doctorContext = useContext(DoctorContext);
  const { deleteDoctor, setCurrent, clearCurrent } = doctorContext;
  
  const onDelete = () => {
    deleteDoctor(doctor._id);
    clearCurrent();
  };

  return (
    <tr>
        <td>{ doctor.name }</td>
        <td>{ doctor.email }</td>
        <td>{ doctor.phone }</td>
        <td>{ doctor.adress }</td>
        <td>{ doctor.speciality }</td>
        <td className="text-center numeric">{ doctor.hospitals.length }</td>
        <td className="text-center">
          <button 
          	type="button" 
          	className="btn btn-theme03 mx"
          	onClick={() => setCurrent(doctor)}
          >
            <i className="fa fa-pencil"></i>  Update
          </button>
          <button 
          	type="button"
          	className="btn btn-theme04 mx"
          	onClick={onDelete}
          	>
            <i className="fa fa-trash-o"></i>  Delete
          </button>
        </td>
    </tr>
  )
}

DoctorItem.propTypes = {
	doctor: PropTypes.object.isRequired
}

export default DoctorItem;
