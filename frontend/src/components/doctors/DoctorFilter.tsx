import React, { useContext, useRef, useEffect } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';

const DoctorFilter = () => {
  const doctorContext = useContext(DoctorContext);

  const text = useRef<any>('');

  const { filterDoctors, clearFilter, filtered } = doctorContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (text.current.value !== '') {
      filterDoctors(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className="form-horizontal style-form filter-margin">
      <div className="form-group">
        <label className="col-sm-2 col-sm-2 control-label">Filter</label>
        <div className="col-sm-10">
          <input
            className="form-control round-form"
            ref={text} 
            type="text"
            placeholder="Filter Doctors..." 
            onChange={onChange} />
        </div>
      </div>
    </form>
  );
};

export default DoctorFilter;
