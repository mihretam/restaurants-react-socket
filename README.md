# ExpressJS/ReactJS starter

ExpressJS / React JS starter project with JWT authentication implementation and roles.

## Server

### Requirements:
- Local installation of MongoDB or
- Database as a service for MongoDB at https://mlab.com

#### Install dependencies:
```$xslt
npm install
```

#### Copy configuration file
```$xslt
cp .env.example .env
```

```$xslt
Create test user at https://ethereal.email

Change email credentials in .env
```

#### For development

```$xslt
npm run start
```

### Steps to create new user:
OPTION 1:
- Submit request using Postman to the following API endpoint: http://localhost:3001/api/v1/register with following body:
```json
{
  "email": "string",
  "password": "string",
  "fullName": "string",
  "role": "string" 
}
```
OPTION 2:
- Visit API documentation, and use endpoint documentation to create new user. Documentation is at http://localhost:3001/api/v1/docs

AFTER SUCCESSFUL REQUEST: 

- Open previously created intercept mailbox at ethereal.email and check for email confirmation link.

- Click on the link to confirm your email

- Now, you should be able to log in using client login form.

#### For production
```$xslt
npm run build
npm run serve
```

Server is accessible at http://localhost:3001

#### API Documentation:
http://localhost:3001/api/v1/docs


Brand Master Flash Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Install dependencies:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

You can change apiEndpoint (for accessing server) in src/config/config.js
