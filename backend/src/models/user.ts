import {Schema, model, Document} from 'mongoose';

const UserSchema = new Schema({

	name: {
		type: String, 
		required: true
	},
	email: {
		type: String, 
		required: true,
		unique: true
	},
	password: {
		type: String, 
		required: true
	},
}, { timestamps: true })


interface IUserSchema extends  Document{
	name: string;
	email: string;
	password: string;
}

export default model<IUserSchema>('User', UserSchema);