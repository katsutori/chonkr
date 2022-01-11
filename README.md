# Chonkr

This is a chonky clone of [Flickr](https://www.flickr.com/). Access the [Chonkr MVP](https://chonkr.herokuapp.com/).

**Chonkr** is the place to go to share your photos of preciously plump animals.

# Index
|
[MVP Feature List](https://github.com/katsutori/chonkr/wiki/MVP-Feature-List) |
[Database Schema](https://github.com/katsutori/chonkr/wiki/Database-Schema) |
[API Documentation](https://github.com/katsutori/chonkr/wiki/API-Documentation) |
[Frontend Routes](https://github.com/katsutori/chonkr/wiki/Frontend-Routes) |


# Technologies Used
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>


# Getting started

1. Clone this repo.

    * ```git clone git@github.com:katsutori/chonkr.git```

2. Install dependencies from the root directory.

    * ```npm install```

3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.

    * ```CREATE USER <name> WITH CREATEDB PASSWORD <'password'>```

4. Create a .env file in the backend directory based on the .env.example found within the respective directory.

5. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for your JWT_SECRET, and your desired PORT (preferably 5000).

6. Add the following proxy to your package.json file within your frontend directory, replacing or keeping the 5000 port to match your PORT configuration found in your .env file:.

    8 ```"proxy": "http://localhost:5000"```

7. Create Database, Migrate, and Seed models

    * ```npx dotenv sequelize db:create```
    * ```npx dotenv sequelize db:migrate```
    * ```npx dotenv sequelize db:seed:all```

8. Start the services in the backend directory

    * ```npm start```

9. Start the services in the frontend directory, which should open the project in your default browser. If not, navigate to http://localhost:3000.

    * ```npm start```

10. You can use the Demo user or create an account to begin using **Chonkr**.

# Features

Logged in users can:

 - Add/View/Edit/Delete Photos
