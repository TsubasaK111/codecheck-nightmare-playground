const Nightmare = require( "nightmare" );
const expect = require( "chai" ).expect;
const parseBrowserMessages = require("./lib.js").parseBrowserMessages;
const runNightmare = require("./lib.js").runNightmare;

describe("Exam creation feature", function() {
  this.timeout("60s");

  let nightmare;
  // const BASE_URL = "https://app.code-check.io";
  const BASE_URL = "http://localhost:9000";
  let browserMessages = [];

  before("start nightmare, sign in and go to exams page", () => {
    nightmare = runNightmare( BASE_URL, browserMessages, show=true )
    .goto(`${BASE_URL}/auth/signin`)
    .type('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.code-c-input:nth-child(2) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)','devcheck')
    .type('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.code-c-input:nth-child(4) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)','password')
    .click('div.code-auth-main.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > div.b-20:nth-child(5) > button.code-c-button.primary.medium.g-40:nth-child(1)')
    .wait(500)
    .goto(`${BASE_URL}/orgs/org1/console/exams`)
  });

  it("can create an exam", done => {
    let datetime = new Date();
    let examName = `./E2E_sample_exam_${datetime.toString()}.png`;

    nightmare
    // create exam button
    .click('div.code-workspace:nth-child(1) > div:nth-child(1) > div.pure-g:nth-child(1) > div.pure-u-1-2.p-20.g-20:nth-child(2) > a.code-btn.primary.large.mw-140.pull-right:nth-child(1)')
    .wait(100)
    // Create Exam Modal exam name field
    .text(
      'html > body.ReactModal__Body--open > div.ReactModalPortal:nth-child(4) > div.ReactModal__Overlay.ReactModal__Overlay--after-open:nth-child(1) > div.ReactModal__Content.ReactModal__Content--after-open:nth-child(1) > div:nth-child(2) > div.pure-g:nth-child(2) > div.pure-u-1:nth-child(1) > form.code-c-form.pure-form.pure-form-stacked:nth-child(1) > div.code-c-input:nth-child(2) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)',
      examName
    )
    // .text(
    //   'form.code-c-form.pure-form.pure-form-stacked:nth-child(1) > div.code-c-input:nth-child(2) > div.code-c-input__inner:nth-child(1) > input.code-c-input__input:nth-child(1)',
    //   examName
    // )
    // Click 'create' button
    .click('body.ReactModal__Body--open > div.ReactModalPortal:nth-child(4) > div.ReactModal__Overlay.ReactModal__Overlay--after-open:nth-child(1) > div.ReactModal__Content.ReactModal__Content--after-open:nth-child(1) > div:nth-child(2) > div.pure-g:nth-child(4) > div.pure-u-1.t-20.g-20.text.center:nth-child(1) > button.code-c-button.primary.large:nth-child(1)')
    .then( i => {
      debugger;
    })
    .then( result => {
      // expect(result).to.equal("Exams");
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
