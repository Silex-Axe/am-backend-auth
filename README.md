#

In this folder, include a .env file with the contents:
```
DATABASE_URL=postgres://password:user@localhost:5432/alexmelcon
DATABASE_SCHEMA=auth_db
JWT_SECRET=secret
PORT=3000
```
This has been avoided at the moment in order to prevent password leaks