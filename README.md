# wdio-zafira-reporter
A custom service for WDIO to report tests to [Zafira Dashboard] http://demo.qaprosoft.com/zafira/) 

## How to use

An example wdio config

```
const ZfService = require('wdio-zafira-reporter')

exports.config = {
  specs: [
    './test/e2e/*.js'
  ],
  capabilities: [
    { browserName: 'phantomjs' }
  ],
  services: ['phantomjs', new ZfService(
    { // Service Options
      refreshToken: 'eyJhbGci....', // http://demo.qaprosoft.com/zafira-ws/swagger-ui.html#!/auth-api-controller/login
      username: 'admin',
      testSuite: {
        fileName: 'test.xml',
        name: 'example_test',
      },
      job: { // Jenkins Settings
        "jenkinsHost": process.env.HOST || 'demo.qaprosoft.com',
        "jobURL": process.env.BUILD_URL || 'http://demo.qaprosoft.com/jenkins/job/valeridemo/5/', //  // Jenkins Build URL
        "name": process.env.JOB_NAME || 'valeridemo',
      },
      run: {
        buildNumber: process.env.BUILD_NUMBER || 6,
        startedBy: process.env.BUILD_CAUSE_MANUALTRIGGER ? 'HUMAN' : 'SCHEDULER' // One of  "SCHEDULER", "UPSTREAM_JOB", "HUMAN"
      }
    }
  )],
...
}


```
