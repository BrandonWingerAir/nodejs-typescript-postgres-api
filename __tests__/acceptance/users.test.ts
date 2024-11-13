import { AppDataSource } from "./../../src/data-source";
import * as request from 'supertest';
import app from "../../src/app";
import { port } from "../../src/config";

let connection, server;

beforeEach(async() => {
    connection = await AppDataSource.initialize();
    await connection.synchronize();
    server = app.listen(port);
});

afterEach(() => {
    connection.close();
    server.close();
});

it('initialize with no users', async() => {
    const response = await request(app).get('/users');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
});