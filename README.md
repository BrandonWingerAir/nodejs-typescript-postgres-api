# NodeJS, TypeScript & Postgres REST API example built with TypeORM and Jest Testing

## Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `docker compose up -d` command
4. Run `npm start` OR `npm run test` command

## How to run tests:
Ensure `npm start` is stopped and run `npm run test` command.

## Study Notes:

createConnection deprecated, updated to AppDataSource.

response.body.errors[0] added **type** property and **param** updated to **path**.
