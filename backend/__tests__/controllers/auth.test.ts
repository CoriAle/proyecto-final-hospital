import request from 'supertest';
import app from '../../src/app';
import { connect, closeDatabase } from '../../src/repositories/__mocks__/db_handler';


jest.setTimeout(30000);

let server: any = null;
let agent: any = null;
let token = '';

describe('AUTH USER, NEW SESSION', ()=> {
	beforeAll(async (done)=>{
		await connect();
		server = app
      .listen(3005, () => {
        agent = request.agent(server);
        done();
      }).on('error', (err) => {
        done(err);
      });
	});

	it('Create a new user correctly', async ()=>{
		const resp = await request(app).post('/v1/user').send({
			name: 'Corina Nimatuj',
			email: 'test@test.com',
			password: '12345678',
		});
		expect(resp.status).toEqual(200);
	});
	it('Create a new session correctly', async ()=>{
		const resp = await request(app).post('/v1/auth').send({
			email: 'test@test.com',
			password: '12345678',
		});

		token = resp.body.token;
		expect(resp.status).toEqual(200);
		expect(typeof resp.body.token).toEqual('string');
		expect(resp.body.token.length).toBeGreaterThanOrEqual(1);

	});
	it('Get current user data', async ()=>{
		const resp = await request(app).get('/v1/auth')
		.set({'x-auth-token': token});

		expect(resp.status).toEqual(201);
		expect(typeof resp.body.data).toEqual('object');
		expect(typeof resp.body.msj).toEqual('string');
		expect(resp.body.msj).toEqual('User info!');
		expect(typeof resp.body.data.name).toEqual('string');
		expect(resp.body.data.name).toEqual('Corina Nimatuj');
		expect(typeof resp.body.data.email).toEqual('string');
		expect(resp.body.data.email).toEqual('test@test.com');
	});
	it('Bad Token ', async ()=>{
		const resp = await request(app).get('/v1/auth')
		.set({'x-auth-token': 'THIS_IS_A_BAD_TOKEN'});

		expect(resp.status).toEqual(401);
	});
	it('Bad password', async ()=>{
		const resp = await request(app).post('/v1/auth').send({
			email: 'test@test.com',
			password: '12',
		});

		expect(resp.status).toEqual(400);
		expect(typeof resp.body.message).toEqual('string');
		expect(resp.body.message).toEqual('Invalid Credentials');

	});
	it('Non valid user', async ()=>{
			const resp = await request(app).post('/v1/auth').send({
				email: 'test2@test.com',
				password: '12',
			});

			expect(resp.status).toEqual(400);
			expect(typeof resp.body.message).toEqual('string');
			expect(resp.body.message).toEqual('Invalid User');

	});
	afterAll(async () => await closeDatabase());
});