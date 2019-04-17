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
* tests for the database module (`tests/server/db.test.js`)
* configuration for Jest and Enzyme (including JSDOM)
* configuration for server-side debugging in VS Code
* contract testing (consumer & provider) with Pact
* end-to-end testing with Cypress


## Contract testing

This repo uses Pact to perform contract testing. When the client contract tests are run, a Pact file is automatically saved to `tests/contracts/pacts`. Normally the consumer and provider are _not_ in the same repository, so they can't share the same filesystem (the Pact file). The alternative is to use a [Pact Broker](https://github.com/pact-foundation/pact_broker). When the provider verification test are run, Pact contacts the broker service to retrieve the Pact file to perform the verification. This repo uses [a Docker container](https://hub.docker.com/r/dius/pact-broker) to host the broker.

Here is the process for running the contract tests:

* Start the Pact broker and its database with `npm run pact:broker:start`
* Run the consumer contract tests with `npm run test:contracts:consumer`
  - This will create the Pact file and save it to `tests/contracts/pacts`
* Publish the Pact file to the broker with `npm run pact:publish`
* Run the provider contract verification test with `npm run test:contracts:provider`
* Stop the Pact broker and its database with `npm run pact:broker:stop`

*Note:* If you'd like run the contract tests without the broker (and the need for Docker), you can uncomment the code in `tests/server/contracts/fruits.test.js` and it will use the local Pact file.
