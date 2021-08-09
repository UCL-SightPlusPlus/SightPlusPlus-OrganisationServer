# SightPlusPlus-OrganisationServer
## Webapp Local Setup
Make sure you have node and mongodb installed
* Install dependencies
Open up a terminal and direct to the project folder. Run the commands below one by one:
```
npm init
npm i express mongoose ejs method-override
npm i --save-dev nodemon dotenv
```
* Environment settings
Create a .env file in the project folder and save your environment settings
```
DATABASE_HOST = $dbHost
DATABASE_PORT = $dbPort
DATABASE_NAME = $dbName
```
* Start server
```
npm start
```
Open a browser and derict to localhost:5000