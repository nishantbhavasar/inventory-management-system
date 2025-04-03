# DATABASE DESIGN
https://dbdiagram.io/d/67ebd6e54f7afba184f027f4

# IMAGE STORAGE (FREE)
https://api.imgbb.com/

# Node.js Version
v22.11.0

## Run Backend Server

1. Need Run Postgresql Here i am using Docker to run Postgresql
 - docker run --name inventory-postgres -p 5432:5432 -e POSTGRES_PASSWORD=inventory -d postgres

2. Add .env File Copy example.env and paste in /server/.env

3. Add all postgresql env variable

4. install dependency (make sure use same version for not to have any dependency conflicts)
 - npm install

5. now make a build which compile all ts code in js and make a production build in /dist folder
 - npm run build
----------------
5. run without build
 - npm run dev

6. run Production ready server
 - npm run start

## Run Frontend

1. Install Dependency (make sure to use same node version for not to have any dependency conflicts)
 - npm install

2. Create .env File /client/.env and paste example.env file

3. run application
 - npm run dev