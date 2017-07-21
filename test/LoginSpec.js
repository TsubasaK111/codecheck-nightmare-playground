const Nightmare = require( "nightmare" );
const expect = require( "chai" ).expect;
const parseBrowserMessages = require("./lib.js").parseBrowserMessages;
const runNightmare = require("./lib.js").runNightmare;

describe("Login function", function() {
  this.timeout("60s");

  let nightmare;
  // const BASE_URL = "https://app.code-check.io";
  const BASE_URL = "http://localhost:9000";
  let browserMessages = [];

  before("start nightmare instance", () => {
    nightmare = runNightmare( BASE_URL, browserMessages )
  });

  it("signin button exists on index page", done => {
    nightmare
    .exists("ul.code-nav-menu > li.code-nav-signin > a.highlight")
    .then( exists => {
      expect(exists).to.be.true;
      done();
    })
    .catch(done);
  });

  it("clicking signin button directs user to login page", done => {
    nightmare
    // click the signin button
    .click('ul.code-nav-menu > li.code-nav-signin > a.highlight')
    // .div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.code-c-input:nth-child(2) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)', 'devcheck')
    .url()
    .then( url => {
      expect(url).to.equal(`${BASE_URL}/auth/signin`);
      done();
    })
    .catch(done);
  });

  it("can sign in (nav-profile exists)", done => {
    nightmare
    .goto(`${BASE_URL}/auth/signin`)
    // enter user name into form
    .type('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.code-c-input:nth-child(2) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)', 'devcheck')
    // enter password
    .type('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.code-c-input:nth-child(4) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)', 'password')
    // click `sign in`
    .click('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.b-20:nth-child(5) > button.code-c-button.primary.medium.g-40:nth-child(1)')
    // nav-profile is the top-left block that includes the organization dropdown and 'My Answers'.
    .wait(500)
    .exists("ul.code-nav-profile")
    .then( exists => {
      expect(exists).to.be.true;
      done()
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
