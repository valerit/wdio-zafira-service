const API = require('./api')
const getClient = require('./client/index')

class ZfService {
  constructor(launchFinishTimeout = 5000) {
    this.launchFinishTimeout = launchFinishTimeout;
  }

  async onPrepare(config, capabilities) {
    process.stdout.write(`onPrepare: "${JSON.stringify(config)}" \n\n`)
    const options = config.serviceOptions.ZfService;

    const { refreshToken, project, username, testSuite, job, run } = options;
    const client = await getClient(refreshToken);
    // 1. Fetch User Profile
    const userProfile = await API.getUserProfile(client)(username)
    process.stdout.write(`User Profile: "${JSON.stringify(userProfile)}" \n\n`)
    ZfService.userProfile = userProfile;
    // 2. Create Test Suite!
    const testSuiteResp = await API.createTestSuite(client)({
        body: {
            "fileName": testSuite.fileName,
            "name": testSuite.name,
            "userId": userProfile.id
        }
    })
    process.stdout.write(`Test Suite: "${JSON.stringify(testSuiteResp)}" \n\n`)

    ZfService.testSuite = testSuiteResp;

    // 3. Create a job 
    const jobResp = await API.createJob(client)({
        body: {
            ...job,
            "userId": userProfile.id
        }
    })
    process.stdout.write(`Job : "${JSON.stringify(jobResp)}" \n\n`)

    ZfService.job = jobResp;

    // 4. Create a test run
    const testRunResp = await API.startTestRun(client)({
        body: {
            "buildNumber": run.buildNumber,
            "jobId": jobResp.id,
            "startedBy": 'HUMAN',
            "testSuiteId": testSuiteResp.id
        }
    })
    process.stdout.write(`TestRun : "${JSON.stringify(testRunResp)}" \n\n`)
    ZfService.testRun = testRunResp;
  }

  async beforeSuite(suite) {
    process.stdout.write(`beforeSuite : "${JSON.stringify(suite)}" \n\n`)
    // // const { refreshToken } = options;
    // // const client = await getClient(refreshToken);

    // const { userProfile, testSuite } = ZfService;
    // const testCase = await API.createTestCase(client)({
    //     body: {
    //         "primaryOwnerId": userProfile.id,
    //         "testClass": suite.title,
    //         "testMethod": "e2e",
    //         "testSuiteId": testSuite.id,
    //     }
    // });
  }

  async onComplete(exitCode, config) {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    })
  }
}

ZfService.serviceName = 'ZfService';

module.exports = ZfService;
