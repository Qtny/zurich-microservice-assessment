# Zurich Microservice Assessment

This is an assessment given by Zurich for the position of a microservice software engineer. This project is written using the NestJS framework, which runs locally and can be able to connect to a local existing Postgres database.


## Tech Stack

This project uses Node version **20.14.0** and Postgres version **15**.


## How to start

To start running on local (on port 3001), starting by run this command to install all dependencies
```bash
npm install
```


Then run this command to start the project.
```bash
npm run start
```

For production deployment, you can run this command to build the image via docker compose.
```bash
docker-compose build
```

## How the API works

The GET `/billing` route is unprotected, therefore you do not need a JWT to access the API. However, the POST, PUT and DELETE are all protected. The `/auth/login` route can be used to acquire the JWT to access the protected routes. More information about the API can be found in the Swagger docs via `/api`  

## Disclaimer
1. The application image spun up does not work locally since in a Docker container, only 1 port can be exposed and the choice is between exposing to a local Postgres database via port `5432` or exposing the application port via port `3000`.

2. The original `.env` file is intentionally left out and not to be committed into the remote repository, therefore an example of how the `.env` would looked like is put in place, called the `.env.example`. For the same reasons, the `docker-compose.yml` env variables are also left blank.