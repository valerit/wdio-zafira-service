'use strict'
const Reporter = require('../lib')

exports.config = {
  specs: [
    './test/e2e/first.js'
  ],
  capabilities: [
    { browserName: 'phantomjs' }
  ],
  services: ['phantomjs'],
  exclude: [],
  maxInstances: 2, // it depends on the plan of the cloud servvice
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['dot', 'spec', Reporter],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  }
}
