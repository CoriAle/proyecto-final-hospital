import { Request, Response, Router } from 'express';
import { ErrorHandler, handleError } from '../error';
import auth_token from '../middlewares/auth/auth.midd';
import Doctor from '../models/doctor';
import postValidator from '../middlewares/validators/doctor/post.validator';
import putValidator from '../middlewares/validators/doctor/put.validator';
import validationHandler  from '../middlewares/validator';

const router = Router();

router.post(
	'/',
	//auth_token, 
	postValidator,
	validationHandler,
	async(req:Request, res: Response) => {

		try {
			const {
				name,
				email,
				phone,
				speciality,
				adress,
				hospitals,
			} = req.body;

			const newDoctor = new Doctor({
				name,
				email,
				phone,
				speciality,
				adress,
				hospitals,
			});

			const doctor = await newDoctor.save();

			return res.status(201).json({
				data: doctor,
				msj: 'Doctor created!',
			});

		} catch(err) {
			const custom = new ErrorHandler(500, 'Server Error.' + err._message );
			console.log(err);

			handleError(custom, req, res);
		}
	},
);

router.put(
	'/:id',
	//auth_token, 
	putValidator,
	validationHandler,
	async(req:Request, res: Response) => {

		try {
			const {
				name,
				email,
				phone,
				speciality,
				adress,
				hospitals,
			} = req.body;
			const doctorFields:any ={};

			if(name) doctorFields.name = name;
			if(email) doctorFields.email = email;
			if(phone) doctorFields.phone = phone;
			if(speciality) doctorFields.speciality = speciality;
			if(adress) doctorFields.adress = adress;
			if(hospitals) doctorFields.hospitals = hospitals;

			let doctor = await Doctor.findById(req.params.id);

			if(!doctor) {
				const custom = new ErrorHandler(404, 'Doctor not found.');
	    		handleError(custom, req, res);
	    	}

			 doctor = await Doctor.findByIdAndUpdate(
			 	req.params.id,
			 	{ $set: doctorFields },
			 	{ new: true },
			).populate('hospitals');

			return res.status(200).json({
				data: doctor,
				msj: 'Doctor updated!',
			});

		} catch(err) {
			const custom = new ErrorHandler(500, 'Server Error.' + err._message );
			console.log(err);

			handleError(custom, req, res);
		}
	},
);

router.get(
	'/',
	// auth_token,
	async(req: Request, res:Response) => {
		try {
			const doctors = await Doctor.find({}).populate('hospitals').sort('-createdAt');

			return res.status(200).json({
				data: doctors,
				msj: 'List of doctors',
			});
		} catch(err) {
			const custom = new ErrorHandler(500, 'Server Error.' + err._message );
			console.log(err);

			handleError(custom, req, res);
		}
	},
);

router.delete(
	'/:id',
	// auth_token,
	async(req: Request, res:Response) => {
		try {
			const id = req.params.id;
			const doctor = await Doctor.findById(id);
			if(!doctor) {
				const custom = new ErrorHandler(404, 'Doctor not found.');
	    		handleError(custom, req, res);
	    	}

	    	await Doctor.findByIdAndRemove(id);
			return res.status(200).json({
				data: doctor,
				msj: 'Doctor Removed',
			});
		} catch(err) {
			const custom = new ErrorHandler(500, 'Server Error.' + err._message );
			console.log(err);

			handleError(custom, req, res);
		}
	}
);

export default router;


//https://stackoverflow.com/questions/46019149/many-to-many-with-mongoose