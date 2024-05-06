# Lensphere

Lensphere web app is the place for photographers to find inspiration and share experiences. Unlike other photography communities or image sites, Lensphere focuses on inspiration and experience sharing. On the Gallery page, you'll randomly see ten photos each time you refresh, designed to allow users to freely explore others' work for inspiration. The Events page features user-initiated photography events.

## Setup

To set up the Lensphere web app, open `lensphere` in VS Code and execute the following commands in the integrated terminal:

```
npm install  
cd client  
npm install  
cd ..  
cd server  
npm install
```
### Backend Setup

Open your system's terminal (Terminal or PowerShell) and log in to your MySQL database system:

```
mysql -u root -p
```

Next, create the `lensphere` database:

```
CREATE DATABASE lensphere;
EXIT;
```

> Alternatively, you can create the database using MySQL Workbench.

Back in the integrated terminal, set up the backend environment by copying the server-side `.env.example` file to a new `.env` file and filling it out as prompted:

```
cd server
cp .env.example .env
```
Once the `.env` files are properly set up, initialize the database with the required tables by running:
```
npm run db
```

> Note: Executing the command above will reset the database: rollback all migrations, run all migrations to the latest, and seed the database with initial data. This should be done to initialize a fresh database and the command should be used with caution to avoid losing existing data.

### Frontend Setup

Within the integrated terminal, copy the client-side `.env.example` file to a `.env` file for the frontend configuration:

```
cd client
cp .env.example .env
```

> Fill out the .env file with the appropriate variables as prompted

## Start the App

After completing both the client and server-side configurations, you can start both the frontend and backend by running the following command from the `lensphere` folder:

```
npm start
```

To start the frontend and backend services separately, navigate to the `client` and `server` directories individually, and run the corresponding startup commands as shown below:

- For frontend, run following command:

```
cd client
npm start
```

- For backtend, run following command:

```
cd server
npx nodemon index.js
```
