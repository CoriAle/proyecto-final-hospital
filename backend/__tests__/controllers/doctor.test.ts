import request from 'supertest';
import app from '../../src/app';
import { connect, closeDatabase } from '../../src/repositories/__mocks__/db_handler';

jest.setTimeout(30000);
let server: any = null;
let agent: any = null;
const fakeId = '60564cb9271e21cd83b998ea';

describe('DOCTOR CONTROLLER, CRUD CORRRECT FLOW', ()=> {
	beforeAll(async (done)=>{
		await connect();
		server = app
      .listen(3008, () => {
        agent = request.agent(server);
        done();
      }).on('error', (err) => {
        done(err);
      });
	});

  let token = '';
	it('Create a new user correctly', async ()=>{
		const resp = await request(app).post('/v1/user').send({
			name: 'Corina Nimatuj',
			email: 'test@test.com',
			password: '12345678',
		});
		expect(resp.status).toEqual(200);
		token = resp.body.data.token;
	});

	let doctor_id = '';
	it('Create a new doctor correctly', async ()=>{
		const resp = await request(app).post('/v1/doctor').send({
			name: 'Corina Nimatuj',
			email: 'test@test.com',
			phone: '1234567',
			adress: 'some adress',
			speciality: 'some speciality',
			hospitals: [],
		})
		.set({'x-auth-token': token});
		expect(resp.status).toEqual(201);
		expect(typeof resp.body.data).toEqual('object');
		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('Doctor created!');
		doctor_id = resp.body.data._id;

	});
	it('Create a new doctor with error', async ()=>{
		const resp = await request(app).post('/v1/doctor').send({
		})
		.set({'x-auth-token': token});
		expect(resp.status).toEqual(400);

	});
	it('Update doctor correctly', async ()=>{
		const resp = await request(app)
		.put(`/v1/doctor/${doctor_id}`).send({
			name: 'Corina Nimatuj',
			email: 'testupdated@test.com',
			phone: '1234567',
			adress: 'some updated adress',
			speciality: 'some updated speciality',
			hospitals: [],
		})
		.set({'x-auth-token': token})
		expect(resp.status).toEqual(200);
		expect(typeof resp.body.data).toEqual('object');
		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('Doctor updated!');
	});
	it('Get doctor list correctly', async ()=>{
		const resp = await request(app)
		.get('/v1/doctor')
		.set({'x-auth-token': token});
		expect(resp.status).toEqual(200);
		expect(typeof resp.body.data).toEqual('object');
		expect(resp.body.data.length).toBeGreaterThanOrEqual(1);

		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('List of doctors');
	});
	it('Delete doctor correctly', async ()=>{
		const resp = await request(app)
		.delete(`/v1/doctor/${doctor_id}`)
		.set({'x-auth-token': token});
		expect(resp.status).toEqual(200);
		expect(typeof resp.body.data).toEqual('object');
		expect(resp.body.data._id).toEqual(doctor_id);

		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('Doctor Removed');
	});
	it('Update doctor with wrong id', async ()=>{
		const resp = await request(app)
		.put(`/v1/doctor/${fakeId}`)
		.set({'x-auth-token': token})
		.send({
			name: 'Corina Nimatuj',
			email: 'testupdated@test.com',
			phone: '1234567',
			adress: 'some updated adress',
			speciality: 'some updated speciality',
			hospitals: [],
		});
		
		expect(resp.status).toEqual(404);
		expect(typeof resp.body.message).toEqual('string');
		expect(resp.body.message).toEqual('Doctor not found.');
	});
	it('Delete doctor with wrong id', async ()=>{
		const resp = await request(app)
		.delete(`/v1/doctor/${fakeId}`)
		.set({'x-auth-token': token})
		
		expect(resp.status).toEqual(404);
		expect(typeof resp.body.message).toEqual('string');
		expect(resp.body.message).toEqual('Doctor not found.');
	});

	afterAll(async () => await closeDatabase());
}); 