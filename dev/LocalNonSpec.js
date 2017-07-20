"use strict";

const Nightmare = require( "nightmare" );

// function onError(error){
//   console.error( 'Test-runner failed:', error );
// }

// let app;
let nightmare;
const BASE_URL = "http://localhost:3031";

// app = require('../app');

nightmare = new Nightmare({
  // // Uncomment the below to see what's going on ^^
  // openDevTools: {
  //   mode: "detach"
  // },
  // show: true,
  typeInterval: 20,
  pollInterval: 50
});

nightmare.goto( BASE_URL )
.end()
.then(function (result) {
  console.info(result);
  // debugger;
  done();
})
.catch();

// nightmare.goto( BASE_URL )
// .wait(2000)
// .exists('#textWrapper')
// .then( exists => {
//   expect(exists).to.be.true;
//   done();
// })
// .catch(done);

// nightmare.goto( BASE_URL )
// .wait(2000)
// .exists('#progressText')
// .then( exists => {
//   expect(exists).to.be.true;
//   done();
// })
// .catch(done);

// nightmare.goto( BASE_URL )
// .wait('#progressText')
// .evaluate(function() {
//   return document.querySelector('#progressText').innerHTML;
// })
// .then( progressText => {
//   expect(progressText).to.contain('2 minutes');
//   done();
// })
// .catch(done);

// nightmare.goto( BASE_URL )
// .wait('#progressText')
// .wait(2000)
// .evaluate(function() {
//   return document.querySelector('#progressText').innerHTML;
// })
// .end()
// .then( (result) => {
//   expect(result).to.contain('1 minute');
//   expect(result).to.contain('58 seconds');
//   done();
// })
// .catch(done);

// nightmare.goto( BASE_URL )
// .wait('#progressText')
// .screenshot('timer.png')
// .end()
// .then(done)
// .catch(done);

nightmare.end();
