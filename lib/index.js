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
        this.write(`Congratulations! Your test "${test.title}" passed 👏`);
    }
};
ZafiroWDIOReporter.reporterName = 'ZafiroWDIOReporter';

module.exports = ZafiroWDIOReporter;
