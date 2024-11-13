import { AppDataSource } from "./../../src/data-source";
import * as request from 'supertest';
import app from "../../src/app";
import { port } from "../../src/config";

let connection, server;

const testUser = {
    firstName: 'Test',
    lastName: 'User',
    age: 30
};

beforeEach(async() => {
    connection = await AppDataSource.initialize();
    await connection.synchronize(true);
    server = app.listen(port);
});

afterEach(() => {
    connection.close();
    server.close();
});

// Acceptance Tests
it('initialize with no users', async() => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
});

it('should create a user', async() => {
    const response = await request(app).post('/users').send(testUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ...testUser, id: 1 });
});

it('should not create a user without a first name', async() => {
    const response = await request(app).post('/users').send({ lastName: 'User', age: 21 });

    expect(response.statusCode).toBe(400);

    expect(response.body.errors).not.toBeNull();
    expect(response.body.errors.length).toBe(1);
    expect(response.body.errors[0]).toEqual({ 
        type: 'field', 
        msg: 'Invalid value', 
        path: 'firstName', 
        location: 'body' 
    });
});

it('should not create a user if age is less than 0', async() => {
    const response = await request(app).post('/users').send({ firstName: 'Test', lastName: 'User', age: -1 });

    expect(response.statusCode).toBe(400);

    expect(response.body.errors).not.toBeNull();
    expect(response.body.errors.length).toBe(1);
    expect(response.body.errors[0]).toEqual({ 
        type: 'field',
        value: -1,
        msg: 'age must be a postive integer',
        path: 'age',
        location: 'body'
    });
});