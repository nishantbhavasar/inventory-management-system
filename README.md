# DATABASE DESIGN

https://dbdiagram.io/d/67ebd6e54f7afba184f027f4

# IMAGE STORAGE (FREE)

https://api.imgbb.com/

# Node.js Version

v22.11.0


## What Are The Feature Imlementade

Summury : In This Project i have used Typescript For Both Client & Server To Maximize Human Radability & Code Quality
and also implemeted all listed features in task.

## Here Are listed some of points for minor overview

1.  Auth

- Register User Done (Backend)
- Login User (Backend, Frontend)

2. Inventory

- Create Inventory (Backend, Frontend)
- Delete Inventory (Backend, Frontend)
- Update Inventory (Backend, Frontend)
- Get All Inventory (Backend, Frontend)
- GEt Inventory By ID (Backend, Frontend)

3. Category

- Create Category (Backend, Frontend)
- Delete Category (Backend, Frontend)
- Get All Creatories (Backend, Frontend)

4. RBAC (Role Based Access Control);

- Only Those User Can Access Inventory Routes Who Has Permission To Access

5. Redis

- I Have Setup For Redis But We Don't Required to Add Redis in minor CRUD
- We can use in read for Get By Id Inventory (Implemented But Not Complated)

6. Rebbit-MQ

- I Have Setup For Rebbit-MQ But We Don't Required to use Rebbit-MQ in minor CRUD
- I dont find any usecase to use rebbit mq over here

7. Image Uplaod

- I have also added image uplaod feature but due to limit exist of free image upload i have removed from inventory
  that will be good to add images in inventory

8. Data Validation

- I have implemented Data validation using joi schema to senitize payload

9. Frontend

- I have implemented Commong Component Pattern (DRY Pattern) Which Improve the code quality and reusability
- I Have Used Vite React
- I Have implemented Redux With Redux Persist For Persist Data In Localstorage
- I Have used Class Api Method Which Improve the code quality and reusability
- For Form I have used React-Hook-Form
- Routing I have used React Router


## Run Backend Server

1. Need Run Postgresql Here i am using Docker to run Postgresql

- docker run --name inventory-postgres -p 5432:5432 -e POSTGRES_PASSWORD=inventory -d postgres

2. Add .env File Copy example.env and paste in /server/.env

3. Add all postgresql env variable

4. install dependency (make sure use same version for not to have any dependency conflicts)

- npm install

5. now make a build which compile all ts code in js and make a production build in /dist folder

- npm run build

---

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