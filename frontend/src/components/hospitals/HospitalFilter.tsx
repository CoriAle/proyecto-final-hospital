import React, { useContext, useRef, useEffect } from 'react';
import HospitalContext from '../../context/hospital/hospitalContext';

const HospitalFilter = () => {
  const hospitalContext = useContext(HospitalContext);

  const text = useRef<any>('');

  const { filterHospitals, clearFilter, filtered } = hospitalContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (text.current.value !== '') {
      filterHospitals(e.target.value);
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
            placeholder="Filter Hospitals..." 
            onChange={onChange} />
        </div>
      </div>
    </form>
  );
};

export default HospitalFilter;
