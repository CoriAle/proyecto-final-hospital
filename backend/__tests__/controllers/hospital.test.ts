import request from 'supertest';
import app from '../../src/app';
import { connect, closeDatabase } from '../../src/repositories/__mocks__/db_handler';

jest.setTimeout(30000);
let server: any = null;
let agent: any = null;
const fakeId = '60564cb9271e21cd83b998ea';

describe('HOSPITAL CONTROLLER, CRUD CORRRECT FLOW', ()=> {
	beforeAll(async (done)=>{
		await connect();
		server = app
      .listen(3009, () => {
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

	let hospital_id = '';
	it('Create a new hospital correctly', async ()=>{
		const resp = await request(app).post('/v1/hospital').send({
			name: 'This is a hospital',
			phone: '1234567',
			adress: 'some adress',
		})
		.set({'x-auth-token': token});
		expect(resp.status).toEqual(201);
		expect(typeof resp.body.data).toEqual('object');
		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('Hospital created!');
		hospital_id = resp.body.data._id;

	});
	it('Create a new hospital with error', async ()=>{
		const resp = await request(app).post('/v1/hospital').send({
		})
		.set({'x-auth-token': token});
		expect(resp.status).toEqual(400);

	});
	it('Update hospital correctly', async ()=>{
		const resp = await request(app)
		.put(`/v1/hospital/${hospital_id}`).send({
			name: 'This is a hospital',
			phone: '1234567',
			adress: 'some updated adress',
		})
		.set({'x-auth-token': token})
		.query({id: hospital_id});
		expect(resp.status).toEqual(200);
		expect(typeof resp.body.data).toEqual('object');
		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('Hospital updated!');
	});
	it('Get hospital list correctly', async ()=>{
		const resp = await request(app)
		.get('/v1/hospital')
		.set({'x-auth-token': token});
		expect(resp.status).toEqual(200);
		expect(typeof resp.body.data).toEqual('object');
		expect(resp.body.data.length).toBeGreaterThanOrEqual(1);

		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('List of hospitals');
	});
	it('Delete hospital correctly', async ()=>{
		const resp = await request(app)
		.delete(`/v1/hospital/${hospital_id}`)
		.set({'x-auth-token': token});
		expect(resp.status).toEqual(200);
		expect(typeof resp.body.data).toEqual('object');
		expect(resp.body.data._id).toEqual(hospital_id);

		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('Hospital Removed');
	});
	it('Update hospital with wrong id', async ()=>{
		const resp = await request(app)
		.put(`/v1/hospital/${fakeId}`)
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
		expect(resp.body.message).toEqual('Hospital not found.');
	});
	it('Delete hospital with wrong id', async ()=>{
		const resp = await request(app)
		.delete(`/v1/hospital/${fakeId}`)
		.set({'x-auth-token': token})
		
		expect(resp.status).toEqual(404);
		expect(typeof resp.body.message).toEqual('string');
		expect(resp.body.message).toEqual('Hospital not found.');
	});

	afterAll(async () => await closeDatabase());
}); 