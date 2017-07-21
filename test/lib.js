const Nightmare = require( "nightmare" );

module.exports.runNightmare = function( BASE_URL, browserMessages, show=false ){
  let nightmare = new Nightmare({
    // Comment below to hide test browser on screen
    show: show,
    // openDevTools: {
    //   mode: "detach"
    // },
    pollInterval: 50
  })
  .on('console', function (logType, args) {
    let output = `console.${logType}: ${args}`
    browserMessages.push(output);
  })
  .on('page', function(type, message, stack){
    let output = `page ${type}: ${message}`
    browserMessages.push(output);
  })
  .goto( BASE_URL )

  return nightmare;
}

module.exports.parseBrowserMessages = function( browserMessages ){
  // makes printable any messages obtained from the frontend console.
  let hasErrors;
  let message;

  switch (true) {
  case browserMessages === undefined:
  case browserMessages.length === 0:
    message = "Info: Nothing was printed to frontend console.";
    hasErrors = false;
    break;
  case browserMessages.length >= 1:
    let output = "The below was printed to frontend console: " + 
      browserMessages.reduce( (text, line) => {
        return `\n ${text} \n ${line}`;
      }) + "\n";
    message = output;
    if (output.toLowerCase().search("error") === -1) { hasErrors = false; }
    break;
  default:
    message = 
        "Error: Console output from frontend is not in the expected format.";
    hasErrors = true;
  }

  console.log(message)

  return hasErrors;
}