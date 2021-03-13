import { Request, Response, Router } from 'express';
import { ErrorHandler, handleError } from '../error';
import auth_token from '../middlewares/auth/auth.midd';
import Hospital from '../models/hospital';
import postValidator from '../middlewares/validators/hospital/post.validator';
import putValidator from '../middlewares/validators/hospital/put.validator';
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
				phone,
				adress,
			} = req.body;

			const newHospital = new Hospital({
				name,
				phone,
				adress,
			});

			const hospital = await newHospital.save();

			return res.status(201).json({
				data: hospital,
				msj: 'Hospital created!',
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
				phone,
				adress,
			} = req.body;
			const hospitalFields:any ={};

			if(name) hospitalFields.name = name;
			if(phone) hospitalFields.phone = phone;
			if(adress) hospitalFields.adress = adress;

			let hospital = await Hospital.findById(req.params.id);

			if(!hospital) {
				const custom = new ErrorHandler(404, 'Hospital not found.');
	    		handleError(custom, req, res);
	    	}


			 hospital = await Hospital.findByIdAndUpdate(
			 	req.params.id,
			 	{ $set: hospitalFields },
			 	{ new: true },
			);

			return res.status(200).json({
				data: hospital,
				msj: 'Hospital updated!',
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
			const hospitals = await Hospital.find({}).sort('-createdAt');

			return res.status(200).json({
				data: hospitals,
				msj: 'List of hospitals',
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
			const hospital = await Hospital.findById(id);
			if(!hospital) {
				const custom = new ErrorHandler(404, 'Hospital not found.');
	    		handleError(custom, req, res);
	    	}

	    	await Hospital.findByIdAndRemove(id);
			return res.status(200).json({
				data: hospital,
				msj: 'Hospital Removed',
			});
		} catch(err) {
			const custom = new ErrorHandler(500, 'Server Error.' + err._message );
			console.log(err);

			handleError(custom, req, res);
		}
	}
);

export default router;