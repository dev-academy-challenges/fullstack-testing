/* global jasmine provider */

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 // This is to give the pact mock server time to start

if (process.env.NODE_ENV === 'pactTest') {
  // Create mock provider
  beforeAll(() => provider.setup())

  // Ensure the mock provider verifies expected interactions for each test
  afterEach(() => provider.verify())

  // Tear down the mock and write the pact
  afterAll(() => provider.finalize())
}
