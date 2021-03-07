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
	doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
      }
    ],
}, { timestamps: true });

interface IHospitalSchema extends Document {
	name: string;
	adress: string;
	phone: string;
	doctors: Array<Schema.Types.ObjectId>;
}

export default model<IHospitalSchema>('Doctor', HospitalSchema);