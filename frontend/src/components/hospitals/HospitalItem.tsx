import React, { useContext }from 'react'
import HospitalContext from '../../context/hospital/hospitalContext';
import { Hospital } from '../../models/hospital/hospital.model'
import PropTypes from 'prop-types';


interface HospitalItemProps {
  hospital: Hospital;
}

const HospitalItem = (props:HospitalItemProps) => {
  const { hospital } = props;
  const hospitalContext = useContext(HospitalContext);
  const { deleteHospital, setCurrent, clearCurrent } = hospitalContext;
  
  const onDelete = () => {
    deleteHospital(hospital._id);
    clearCurrent();
  };

  return (
    <tr>
        <td>{ hospital.name }</td>
        <td>{ hospital.adress }</td>
        <td>{ hospital.phone }</td>
        <td className="text-center">
          <button 
          	type="button" 
          	className="btn btn-theme03 mx"
          	onClick={() => setCurrent(hospital)}
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

HospitalItem.propTypes = {
	hospital: PropTypes.object.isRequired
}

export default HospitalItem;
