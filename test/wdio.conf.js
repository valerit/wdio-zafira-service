'use strict'
const Reporter = require('../lib')
const Service = require('../lib/service')

exports.config = {
  specs: [
    './test/e2e/first.js'
  ],
  capabilities: [
    { browserName: 'phantomjs' }
  ],
  services: ['phantomjs', new Service(7000)],
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
  reporterOptions: {
    ZafiroWDIOReporter: {
      refreshToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwicGFzc3dvcmQiOiIveU45VDZZaHY5ZHRCeDNmSUFZSmxqeG12YzRObGhrMCIsInRlbmFudCI6InphZmlyYSIsImV4cCI6MTMwMzk3OTc0MzUwfQ.DuKkYg4FnU1Knyas7-YRF-wNk_Uv5wmRqmds44Z134r7VDvyoPr2KZmYZuu5dQIgErfyV4aN0e5zYgWGEebpUg',
      username: 'admin',
      testSuite: {
        fileName: 'valeri.xml',
        name: 'valeri_test',
      },
      job: { // Jenkins Settings
        "jenkinsHost": process.env.HOST || 'demo.qaprosoft.com',
        "jobURL": process.env.BUILD_URL || 'http://demo.qaprosoft.com/jenkins/job/valeridemo/5/', //  // Jenkins Build URL
        "name": process.env.JOB_NAME || 'valeridemo',
      }
    }
  },
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  }
}
