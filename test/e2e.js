'use strict'
const
  phantomjs = require('phantomjs-prebuilt'),
  webdriverio = require('webdriverio'),
  requireDir = require('require-dir'),
  specs = requireDir('./e2e/'),
  connections = require('./webdriver.local.js')

let program

/** runs PhantomJS */
before(() => phantomjs.run('--webdriver=4444').then(p => program = p))

connections.forEach(connection => {
  describe(desc(connection), () => {
    /** runs WebDriver */
    before(() => global.browser = webdriverio.remote(connection).init())

    /** execute each test within 'e2e' dir */
    for (const key in specs) specs[key]()

    /** ends the session */
    after(() => browser.end())
  })
})

/** closes PhantomJS process */
after(() => program.kill())

/** generate description from capabilities */
function desc (connection) {
  const c = connection.desiredCapabilities
  return [c.browserName].concat(c.version || [], c.platform || []).join(' - ')
}
