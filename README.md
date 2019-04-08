# Fullstack Testing

This repo aims to illustrate a number of different testing approaches involved with writing automated tests for a fullstack application. The types of things that can be tested in this application are:

* client React components
* server-side Express routes
* the relational database module
* the API contracts (client & server)
* the user interactions


## To get started

```
git clone https://github.com/don-smith/fullstack-testing
cd fullstack-testing
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000).


## What's included

* a single, simple API endpoint (`/api/v1/fruits`)
* a single React component (`<App />`)
* a fake database module (`server/db.js`)
* an API client module (`client/apiClient.js`)
* a single client-side test (`/tests/client/App.test.js`)
* configuration for Jest and Enzyme (including JSDOM)
* configuration for server-side debugging in VS Code


## What is still yet to implement

* contract testing with Pact
* end-to-end testing with Cypress
* a proper database module (`server/db.js`)
* tests for the database module (`tests/server/db.test.js`)
