import React, { PropsWithChildren, useReducer } from 'react';
import g_instance from '../../utils/generic_instance';
import HospitalContext from './hospitalContext';
import HospitalReducer from './hospitalReducer';
import { Hospital, Hospitals_State } from '../../models/hospital/hospital.model';
import {
	GET_HOSPITALS,
	ADD_HOSPITAL,
	DELETE_HOSPITAL,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_HOSPITAL,
	FILTER_HOSPITALS,
	CLEAR_HOSPITALS,
	CLEAR_FILTER,
	HOSPITAL_ERROR,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const HospitalState = (props: PropsWithChildren<any>) => {
	const initialState: Hospitals_State = {
		hospitals: null,
		current: null,
		filtered: null,
		error: null,
		loading: false,
	};

	const [state, dispatch] = useReducer(HospitalReducer, initialState);

	const checkAuthToken = () => {
		if (localStorage.getItem('token')) {
			setAuthToken(localStorage.getItem('token'));
		}
	};

	const getHospitals = async () => {
		checkAuthToken();

		try {
			const res = await g_instance.get('/v1/hospital');
			dispatch({ type: GET_HOSPITALS, payload: res.data });
		} catch (err) {
			dispatch({ type: HOSPITAL_ERROR, payload: err.response.data.message });
		}
	};

	const addHospital = async (hospital: Hospital) => {
		checkAuthToken();

		try {
			const res = await g_instance.post('/v1/hospital', hospital);
			dispatch({ type: ADD_HOSPITAL, payload: res.data });
		} catch (err) {
			dispatch({ type: HOSPITAL_ERROR, payload: err.response.data.message });
		}
	};

	const deleteHospital = async (id:string) => {
		checkAuthToken();

		try {
			//const res = await g_instance.delete(`/v1/hospital/${id}`);
			dispatch({ type: DELETE_HOSPITAL, payload: id });
		} catch (err) {
			dispatch({ type: HOSPITAL_ERROR, payload: err.response.data.message });
		}
	};

	const updateHospital = async (hospital: Hospital) => {
		checkAuthToken();

		try {
			const res = await g_instance.put(`/v1/hospital/${hospital._id}`, hospital);
			dispatch({ type: UPDATE_HOSPITAL, payload: res.data });
		} catch (err) {
			dispatch({ type: HOSPITAL_ERROR, payload: err.response.data.message });
		}
	};

	const clearHospitals =() => {
		dispatch({ type: CLEAR_HOSPITALS });
	};

	const setCurrent =(hospital: Hospital) => {
		dispatch({ type: SET_CURRENT, payload: hospital });
	};

	const clearCurrent =() => {
		dispatch({ type: CLEAR_CURRENT });
	};

	const filterHospitals =(text: string) => {
		dispatch({ type: FILTER_HOSPITALS, payload: text });
	};

	const clearFilter =() => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<HospitalContext.Provider
			value={{
				hospitals: state.hospitals,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				loading: state.loading,
				getHospitals,
				addHospital,
				deleteHospital,
				updateHospital,
				clearHospitals,
				setCurrent,
				clearCurrent,
				filterHospitals,
				clearFilter,
			}}
		>
		 { props.children }
		</HospitalContext.Provider>
	);
};

export default HospitalState;