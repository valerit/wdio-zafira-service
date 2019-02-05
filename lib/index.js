const WDIOReporter = require('@wdio/reporter').default;
const { EventEmitter } = require('events')
const getClient = require('./client/index')
class ZafiroWDIOReporter extends EventEmitter {

    constructor (baseReporter, config, options) {
        super()
        const { refreshToken } = options;
        ZafiroWDIOReporter.refreshToken = refreshToken;

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
