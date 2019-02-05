const WDIOReporter = require('@wdio/reporter').default;
const { EventEmitter } = require('events')

class ZafiroWDIOReporter extends EventEmitter {

    constructor (baseReporter, config, options) {
        super()

        this.on("end", this.end.bind(this));
    }

    async end (test) {
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
};
ZafiroWDIOReporter.reporterName = 'ZafiroWDIOReporter';
ZafiroWDIOReporter.isFinished = false;

module.exports = ZafiroWDIOReporter;
