const Nightmare = require( "nightmare" );
const expect = require( "chai" ).expect;
const parseBrowserMessages = require("./lib.js").parseBrowserMessages;
const runNightmare = require("./lib.js").runNightmare;

describe("index page (basic functionality)", function() {
  this.timeout("60s");

  let nightmare;
  // const BASE_URL = "https://app.code-check.io";
  const BASE_URL = "http://localhost:9000";
  let browserMessages = [];

  before("start nightmare instance", () => {
    nightmare = runNightmare( BASE_URL, browserMessages )
  });

  it("loads with 200 OK result", done => {
    nightmare
    .then( result => {
      // debugger;
      expect(result).to.be.ok;
      expect(result.code).to.equal(200);
      done();
    })
    .catch(done);
  });

  it("prints no errors to client console", done => {
    nightmare
    .then( result => {
      let hasErrors = parseBrowserMessages(browserMessages);
      expect(hasErrors).to.be.false;
      done();
    })
    .catch(done);
  });

  it("loads open challenge page", done => {
    nightmare
    .url()
    .then( url => {
      expect(url).to.equal(`${BASE_URL}/openchallenges`);
      done();
    })
    .catch(done);
  });


  after("screenshot and close", done => {
    let datetime = new Date();
    let filename = `./test_screenshot__${datetime.toString()}.png`;

    nightmare
    // take a screenshot for manual review and iteration.
    .screenshot(filename)
    // disconnect and close Electron process
    .end()
    .then( result => {
      done();
    })
    .catch(done);
    });
});
