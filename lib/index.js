const client = require('./client');
const { createTestSuite } = require('./api/test-suites');
const { createProject } = require('./api/projects');
const { createJob } = require('./api/jobs');
const { startTestRun } = require('./api/test-runs');

/* const body = {
	description: 'Cart Tests',
	userId: 1,
	fileName: 'test.js',
	name: 'test.js',
};
const body1 = {
	description: 'UI-AUTOMATION',
	id: 0,
	name: 'UI-AUTOMATION'
};
 */

/* const body = {
	userId: 1,
	jenkinsHost: 'http://jenkins.org',
	jobURL: 'http://test-jenkins.org/job/mySuiteJob',
	name: 'Automation-JS'
}; */

const body = {
	"blocker": true,
		"buildNumber": 0,
		"ciRunId": "5",
		"configXML": "string",
		"driverMode": "METHOD_MODE",
		"id": 5,
		"jobId": 5,
		"knownIssue": true,
		"project": {
		  "description": "UI-AUTOMATION",
		  "id": 0,
		  "name": "UI-AUTOMATION"
		},
		"reviewed": true,
		"scmBranch": "string",
		"scmCommit": "string",
		"scmURL": "string",
		"startedBy": "SCHEDULER",
		"status": "UNKNOWN",
		"testSuiteId": 1,
		// "upstreamJobBuildNumber": 0,
		// "upstreamJobId": 0,
		"userId": 1,
		"workItem": "string"
};

(async () => {
	const c = await client;
	const response = await startTestRun(c)({ body, headers: {
		Project: 'UI-AUTOMATION'
	}});
	console.log(`response is ${JSON.stringify(response)}`);
})();