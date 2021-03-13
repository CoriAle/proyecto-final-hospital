import { Schema, model, Document } from 'mongoose';

const HospitalSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	adress: {
		type: String,
		require: true,
	},
	phone: {
		type: String,
	},
}, { timestamps: true });

interface IHospitalSchema extends Document {
	name: string;
	adress: string;
	phone: string;
}

export default model<IHospitalSchema>('Hospital', HospitalSchema);