# Join Midi Refer a Friend Site

## Description
Midi Health Playground website built for Refer a Friend Project

## Installation
- Clone the repository locally.
- Install dependencies with `npm install`. 
- Initialize database using psql (run `psql -U your_username -d postgres` and `CREATE DATABASE midi_db`)
- Configure environment variables as specified in the .env.EXAMPLE file in a .env file in the server folder.
- Run `npm run seed` to seed database with user information.
- Run `npm run start` to start the application.

## Usage
To login as a patient:
1. Click "Book a Visit"
2. Create a new account or login using `admin@gmail.com` or `advocate@gmail.com` with password `password`

To login as a clinician:
1. Click "Clinician Login"
2. Use login `clinician@gmail.com` with password `password`

To login as an admin (Derek):
1. Click "Admin Login"
2. Login using `admin@gmail.com` with password `password`


## License
[MIT License](https://opensource.org/license/mit)