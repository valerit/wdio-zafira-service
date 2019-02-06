const WDIOReporter = require('@wdio/reporter').default;
const { EventEmitter } = require('events')
const getClient = require('./client/index')

const API = require('./api')

class ZafiroWDIOReporter extends EventEmitter {

    constructor (baseReporter, config, options) {
        super()
        const { refreshToken, project, username } = options;
        ZafiroWDIOReporter.refreshToken = refreshToken;
        ZafiroWDIOReporter.project = project;
        ZafiroWDIOReporter.username = username;

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
        const { refreshToken, project } = ZafiroWDIOReporter;
        const client = await getClient(refreshToken);

        await API.startTestRun(client)(process.BUILD_NUMBER || '1');

        process.stdout.write(`Start Test 👏!: "${JSON.stringify(test)}"`)

        const body = {
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
            "ciTestId": "string",
            "configXML": "string",
            "dependsOnMethods": "string",
            "finishTime": 0,
            "id": 0,
            "knownIssue": true,
            "message": "string",
            "messageHashCode": 0,
            "name": "string",
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
            "testArgs": "string",
            "testCaseId": 0,
            "testClass": "string",
            "testGroup": "string",
            "testMetrics": {},
            "testRunId": 0,
            "workItems": [
            "string"
            ]
        };

        // await startTest(client)(body)
    }

    async end (test) {
        const { refreshToken } = ZafiroWDIOReporter;
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
