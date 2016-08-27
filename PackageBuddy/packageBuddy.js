var path = require('path');
var tl = require('vso-task-lib');

var exePath = path.join( __dirname, 'tools/PackageBuddy.exe');

var mono = new tl.ToolRunner(tl.which('mono', true));

var projectPath = tl.getInput('projectPath', true);
var platform = tl.getInput('platform', true);
var versionCode = tl.getInput('versionCode', false);
var versionName = tl.getInput('versionName', false);
var packageName = tl.getInput('packageName', false);

mono.arg(exePath + ' ')

if(projectPath) {
    mono.arg("-projectPath='" + projectPath + "' ");
}

if(platform) {
    mono.arg("-platform=" + platform + " ");
}

if(versionCode) {
    mono.arg("-versionCode='" + versionCode + "' ");
}

if(versionName) {
    mono.arg("-versionName='" + versionName + "' ");
}

if(packageName) {
    mono.arg("-packageName='" + packageName + "' ");
}

var cwd = tl.getPathInput('cwd', false);

// will error and fail task if it doesn't exist
tl.checkPath(cwd, 'cwd');
tl.cd(cwd);

mono.exec({ failOnStdErr: false})
.then(function(code) {
    tl.exit(code);
})
.fail(function(err) {
    console.error(err.message);
    tl.debug('taskRunner fail');
    tl.exit(1);
})
