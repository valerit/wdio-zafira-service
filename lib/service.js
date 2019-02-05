class ZfService {
  constructor(launchFinishTimeout = 5000) {
    this.launchFinishTimeout = launchFinishTimeout;
  }

  async onComplete(exitCode, config) {
    const reporters = config.reporters.filter((reporter) => reporter.reporterName === "ZafiroWDIOReporter");
    if (reporters.length === 0) {
      return;
    }

    await new Promise((resolve, reject) => {
      const interval = 1000; // 1s
      let count = 0;    
      const id = setInterval(() => {
        count += interval;
        if (count > this.launchFinishTimeout) {
          reject('Report is not finished yet') // Report timeout
        }
        if (reporters[0].isFinished) {
          clearInterval(id);
          resolve();
        }
      }, interval);
    })
  }
}

ZfService.serviceName = 'ZfService';

module.exports = ZfService;
