const WDIOReporter = require('@wdio/reporter').default;

class ZafiroWDIOReporter extends WDIOReporter {

    constructor (options) {
        /**
         * make reporter to write to output stream by default
         */
        options = Object.assign(options, { stdout: true });
        super(options);
    }

    onTestPass (test) {
        process.stdout.write(`Congratulations! Your test "${JSON.stringify(test)}" passed 👏`);
    }
};
ZafiroWDIOReporter.reporterName = 'ZafiroWDIOReporter';

module.exports = ZafiroWDIOReporter;
