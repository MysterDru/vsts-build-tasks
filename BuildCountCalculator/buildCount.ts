import tl = require('vsts-task-lib/task');
import request = require('sync-request');
import process = require('process');

function run() {
  var hostname = process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI;
  var path = ("/" + process.env.SYSTEM_TEAMPROJECT + "/_apis/build/builds?api-version=2.0&definitions=" + process.env.SYSTEM_DEFINITIONID);
  var authToken = process.env.SYSTEM_ACCESSTOKEN;

  console.log("host: " +hostname);
  console.log("path: " + path);
  console.log("auth token: " + authToken);

  var response = request("GET", hostname + path, {
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });

var responseString = response.getBody();
tl.debug(responseString);

  var responseObject = JSON.parse(response.getBody());

  var outputVar = tl.getInput('outputVariable');

  var count = responseObject["count"];
  console.log("Build Count: " + count);
  console.log("##vso[task.setvariable variable=" + outputVar +";]" + count);
}

run();