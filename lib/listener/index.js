const ClientPromise = require('../client');

const { getProjectByName  } = require('../api/projects');
const { createTestSuite } = require('../api/test-suites');
const { startTestRun, finishTestRun } = require('../api/test-runs');
const { createJob } = require('../api/jobs');
const { startTest, finishTest  } = require('../api/test')
const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));
class ZapfiraListener {

	constructor() {

	}

	async onPrepare() {
		// Start Zafira Client
		this.client = await ClientPromise;

		// Initializes Project Context
		this.project = await getProjectByName(this.client)('UNKNOWN');
		console.log(`Project is ${JSON.stringify(this.project)}`);

		// Register user whi started test run -- Thought this is deprecated

		//  Register test suite
		const TestSuiteBody = {
			description: 'Cart Tests',
			userId: 1,
			fileName: 'test.js',
			name: 'test.js',
		};
		const headers = { 
			Project: 'UNKNOWN'
		};
		this.suite = await createTestSuite(this.client)({ body: TestSuiteBody, headers });
		console.log(`this.suite is ${JSON.stringify(this.suite)}`);

		// Register job that triggers test run
		const jobBody = {
			userId: 1,
			jenkinsHost: 'https://qajenkins.uacf.io',
			jobURL: 'https://qajenkins.uacf.io/jenkins/job/Automation/job/UA_SHOP_JS_TESTS',
			name: 'Automation-JS'
		};

		this.job = await createJob(this.client)({ body: jobBody, headers });
		console.log(`this.job is ${JSON.stringify(this.job)}`);


		// Register test run
		const jobRunBody = {
			blocker:false,
			testSuiteId: 1,
			configXML: "string",
			userId: 1,
			startedBy: "HUMAN",
			jobId: 5,
			buildNumber: this.suite.id,
			driverMode: "METHOD_MODE", //What the hell is this??
		};
		this.run = await startTestRun(this.client)({ body: jobRunBody, headers });
		console.log(`this.run is ${JSON.stringify(this.run)}`);


		const test = {
			"artifacts": [
			  {
				"expiresIn": 0,
				"id": 0,
				"link": "string",
				"name": "string",
				"testId": 0
			  }
			],
			"blocker": true,
			"ciTestId": this.run.ciTestId,
			"configXML": "string",
			"dependsOnMethods": "string",
			"finishTime": 0,
			"id": this.suite.id,
			"knownIssue": true,
			"message": "string",
			"messageHashCode": 0,
			"name": "Checkout Test",
			"needRerun": true,
			"retry": 0,
			"startTime": 0,
			"status": "UNKNOWN",
			"tags": [
			  {
				"id": 0,
				"name": "string",
				"value": "string"
			  }
			],
			"testArgs": "Test Args",
			"testCaseId": this.suite.id,
			"testClass": "Test Class",
			"testGroup": "Test Metric",
			"testMetrics": {},
			"testRunId": this.run.id,
			"workItems": [
			  "string"
			]
		  };
		  this.testRunStart = await startTest(this.client)(test);
		  console.log(`this.testRunStart is ${JSON.stringify(this.testRunStart)}`);
		  console.log(`before wait`); 
		  await wait(10000);
		  console.log(`after wait`);
		  const testFinish = {
			"artifacts": [
			  {
				"expiresIn": 0,
				"id": 0,
				"link": "string",
				"name": "string",
				"testId": 0
			  }
			],
			"blocker": true,
			"ciTestId": this.run.ciTestId,
			"configXML": "string",
			"dependsOnMethods": "string",
			"finishTime": 0,
			"id": this.suite.id,
			"knownIssue": true,
			"message": "string",
			"messageHashCode": 0,
			"name": "string",
			"needRerun": false,
			"retry": 0,
			"startTime": 0,
			"status": "PASSED",
			"tags": [
			  {
				"id": 0,
				"name": "string",
				"value": "string"
			  }
			],
			"testArgs": "string",
			"testCaseId": this.suite.id,
			"testClass": "string",
			"testGroup": "string",
			"testMetrics": {},
			"testRunId": this.run.id,
			"workItems": [
			  "string"
			]
		  };
		  // this.testRunFinish = await finishTest(this.client)(0, testFinish);
		  this.testRunFinish = await finishTest(this.client)(1, testFinish);
		  /* this.testRunFinish = await finishTest(this.client)(2, testFinish);
		  this.testRunFinish = await finishTest(this.client)(3, testFinish);
		  this.testRunFinish = await finishTest(this.client)(4, testFinish);
		  this.testRunFinish = await finishTest(this.client)(5, testFinish);
		  this.testRunFinish = await finishTest(this.client)(6, testFinish); */
		  console.log(`this.testRunFinish is ${JSON.stringify(this.testRunFinish)}`);

		  // Register test run results
		  const testRunFinish = await finishTestRun(this.client)(this.run.id);
		  console.log(`this.testRunFinish is ${JSON.stringify(testRunFinish)}`);

	}

	async onTestStart() {
		
	}

	async onTestSuccess() {

	}

	async onFinish() {

	}
}

new ZapfiraListener().onPrepare().then(() => console.log('done'));