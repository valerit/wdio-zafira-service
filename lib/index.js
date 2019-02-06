const WDIOReporter = require('@wdio/reporter').default;
const { EventEmitter } = require('events')
const getClient = require('./client/index')

const API = require('./api')

class ZafiroWDIOReporter extends EventEmitter {

    constructor (baseReporter, config, options) {
        super()
        ZafiroWDIOReporter.options = options;

        this.on("suite:start", this.suiteStart.bind(this));
        this.on("suite:end", this.suiteEnd.bind(this));

        this.on("test:start", this.testStart.bind(this));
        this.on("test:pass", this.testPass.bind(this));
        this.on("test:fail", this.testFail.bind(this));
        this.on("test:pending", this.testPending.bind(this));

        this.on("start", this.start.bind(this));
        this.on("end", this.end.bind(this));
        // this.on("runner:command", this.runnerCommand.bind(this));
        // this.on("runner:result", this.runnerResult.bind(this));
        // this.on("runner:end", this.runnerEnd.bind(this));
    }

    async start(test) {
        const { refreshToken, project, username, testSuite, job } = ZafiroWDIOReporter.options;
        const client = await getClient(refreshToken);
        // 1. Fetch User Profile
        const userProfile = await API.getUserProfile(client)(username)
        process.stdout.write(`User Profile: "${JSON.stringify(userProfile)}" \n\n`)

        // 2. Create Test Suite!
        const testSuiteResp = await API.createTestSuite(client)({
            body: {
                "fileName": testSuite.fileName,
                "name": testSuite.name,
                "userId": userProfile.id
            }
        })
        process.stdout.write(`Test Suite: "${JSON.stringify(testSuiteResp)}" \n\n`)
    
        // 3. Create a job 
        const jobResp = await API.createJob(client)({
            body: {
                ...job,
                "userId": userProfile.id
            }
        })
        process.stdout.write(`Job : "${JSON.stringify(jobResp)}" \n\n`)

        // 4.
        const testRunResp = await API.startTestRun(client)({
            body: {
                "buildNumber": job.BUILD_NUMBER,
                "jobId": jobResp.id,
                "startedBy": username,
                "testSuiteId": testSuiteResp.id
            }
        })
        process.stdout.write(`TestRun : "${JSON.stringify(testRunResp)}" \n\n`)
    }

    async end (test) {
        const { refreshToken } = ZafiroWDIOReporter.options;
        const client = await getClient(refreshToken);
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 3000);
        })
        process.stdout.write(`Congratulations 👏!: "${JSON.stringify(test)}"`)

        ZafiroWDIOReporter.isFinished = true;

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }

    async suiteStart(suit) {}

    async suiteEnd(suit) {}

    async testStart(test) {}

    async testPass(test) {}

    async testFail(test) {}

    async testPending(test) {}
};

ZafiroWDIOReporter.reporterName = 'ZafiroWDIOReporter';
ZafiroWDIOReporter.isFinished = false;

module.exports = ZafiroWDIOReporter;
