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
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 3000);
        })
        this.isFinished = true
    }
};
ZafiroWDIOReporter.reporterName = 'ZafiroWDIOReporter';

module.exports = ZafiroWDIOReporter;
