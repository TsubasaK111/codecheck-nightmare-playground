const Nightmare = require( "nightmare" );
const expect = require( "chai" ).expect;
const parseBrowserMessages = require("./lib.js").parseBrowserMessages;
const runNightmare = require("./lib.js").runNightmare;

describe("Organization Menu", function() {
  this.timeout("60s");

  let nightmare;
  // const BASE_URL = "https://app.code-check.io";
  const BASE_URL = "http://localhost:9000";
  let browserMessages = [];

  before("start nightmare and sign in", () => {
    nightmare = runNightmare( BASE_URL, browserMessages )
    .goto(`${BASE_URL}/auth/signin`)
    .type('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.code-c-input:nth-child(2) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)', 'devcheck')
    .type('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.code-c-input:nth-child(4) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)', 'password')
    .click('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.b-20:nth-child(5) > button.code-c-button.primary.medium.g-40:nth-child(1)')
    .wait(500)
  });

  it("can access orgs page after signin", done => {
      nightmare
      .goto( BASE_URL )
      // click the org dropdown and select the first listed org.
      .click('ul.code-nav-profile:nth-child(1) > li.code-nav-select:nth-child(1) > figure.text.ellipsis.pointer:nth-child(1)')
      .click('div#nav-org-dropdown > ul:nth-child(1) > li:nth-child(3) > a.text.ellipsis:nth-child(1) > figure:nth-child(1)')
      .url()
      .then( url => {
        expect(url).to.equal(`${BASE_URL}/orgs/org1/console/exams`);
        done();
      })
      .catch(done);
  })

  it("first displays the 'Exams' page when accessing the orgs feature", done => {
    nightmare
    .goto( BASE_URL )
    // click the org dropdown and select the first listed org.
    .click('ul.code-nav-profile:nth-child(1) > li.code-nav-select:nth-child(1) > figure.text.ellipsis.pointer:nth-child(1)')
    .click('div#nav-org-dropdown > ul:nth-child(1) > li:nth-child(3) > a.text.ellipsis:nth-child(1) > figure:nth-child(1)')
    .wait('h2')
    .evaluate(() => {
      return document.querySelector('h2').innerHTML;
    })
    .then( innerHTML => {
      expect(innerHTML).to.equal("Exams");
      done();
    })
    .catch(done);
  })

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
