import React, { PropsWithChildren, useReducer } from 'react';
import g_instance from '../../utils/generic_instance';
import DoctorContext from './doctorContext';
import DoctorReducer from './doctorReducer';
import { Doctor, Doctors_State } from '../../models/doctor/doctor.model';
import {
	GET_DOCTORS,
	ADD_DOCTOR,
	DELETE_DOCTOR,
	SET_CURRENT_DOCTOR,
	CLEAR_CURRENT_DOCTOR,
	UPDATE_DOCTOR,
	FILTER_DOCTORS,
	CLEAR_DOCTORS,
	CLEAR_FILTER_DOCTOR,
	DOCTOR_ERROR,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const DoctorState = (props: PropsWithChildren<any>) => {
	const initialState: Doctors_State = {
		doctors: null,
		current: null,
		filtered: null,
		error: null,
		loading: false,
	};

	const [state, dispatch] = useReducer(DoctorReducer, initialState);

	const checkAuthToken = () => {
		if (localStorage.getItem('token')) {
			setAuthToken(localStorage.getItem('token'));
		}
	};

	const getDoctors = async () => {
		checkAuthToken();

		try {
			const res = await g_instance.get('/v1/doctor');
			dispatch({ type: GET_DOCTORS, payload: res.data });
		} catch (err) {
			dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
		}
	};

	const addDoctor = async (doctor: Doctor) => {
		checkAuthToken();

		try {
			const res = await g_instance.post('/v1/doctor', doctor);
			dispatch({ type: ADD_DOCTOR, payload: res.data });
		} catch (err) {
			dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
		}
	};

	const deleteDoctor = async (id:string) => {
		checkAuthToken();

		try {
			const res = await g_instance.delete(`/v1/doctor/${id}`);
			dispatch({ type: DELETE_DOCTOR, payload: id });
		} catch (err) {
			dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
		}
	};

	const updateDoctor = async (doctor: Doctor) => {
		checkAuthToken();

		try {
			const res = await g_instance.put(`/v1/doctor/${doctor._id}`, doctor);
			dispatch({ type: UPDATE_DOCTOR, payload: res.data });
		} catch (err) {
			dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
		}
	};

	const clearDoctors =() => {
		dispatch({ type: CLEAR_DOCTORS });
	};

	const setCurrent =(doctor: Doctor) => {
		dispatch({ type: SET_CURRENT_DOCTOR, payload: doctor });
	};

	const clearCurrent =() => {
		dispatch({ type: CLEAR_CURRENT_DOCTOR });
	};

	const filterDoctors =(text: string) => {
		dispatch({ type: FILTER_DOCTORS, payload: text });
	};

	const clearFilter =() => {
		dispatch({ type: CLEAR_FILTER_DOCTOR });
	};

	return (
		<DoctorContext.Provider
			value={{
				doctors: state.doctors,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				loading: state.loading,
				getDoctors,
				addDoctor,
				deleteDoctor,
				updateDoctor,
				clearDoctors,
				setCurrent,
				clearCurrent,
				filterDoctors,
				clearFilter,
			}}
		>
		 { props.children }
		</DoctorContext.Provider>
	);
};

export default DoctorState;