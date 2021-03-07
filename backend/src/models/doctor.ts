import {Schema, model, Document} from 'mongoose';

const DoctorSchema = new Schema({

	name: {
		type: String, 
		required: true
	},
	email: {
		type: String, 
		required: true,
		unique: true
	},
	phone: {
		type: String, 
		required: true
	},
	adress: {
		type: String, 
		required: true
	},
	speciality: {
		type: String,
		required: true
	},
	hospitals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
      }
    ],
}, { timestamps: true })


interface IDoctorSchema extends  Document{
	name: string;
	email: string;
	password: string;
	hospitals: Array<Schema.Types.ObjectId>;
}

export default model<IDoctorSchema>('Doctor', DoctorSchema);