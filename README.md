# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

## Study Notes:

createConnection deprecated, updated to AppDataSource.

### Test - should not create a user without a first name (updated response):
response.body.errors[0]).toEqual({ 
    type: 'field', 
    msg: 'Invalid value', 
    path: 'firstName', 
    location: 'body' 
});