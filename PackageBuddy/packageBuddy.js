var path = require('path');
var tl = require('vso-task-lib');

var isWin = /^win/.test(process.platform);

var exePath = path.join( __dirname, 'tools/PackageBuddy.exe');

var packageBuddyTool;

if(isWin)
{
    packageBuddyTool = new tl.ToolRunner(exePath);
}
else 
{
    var packageBuddyTool = new tl.ToolRunner(tl.which('mono', true));
    packageBuddyTool.arg(exePath + ' ');    
}

var projectPath = tl.getInput('projectPath', true);
var platform = tl.getInput('platform', true);
var versionCode = tl.getInput('versionCode', false);
var versionName = tl.getInput('versionName', false);
var packageName = tl.getInput('packageName', false);

if(projectPath) {
    packageBuddyTool.arg("-projectPath='" + projectPath + "' ");
}

if(platform) {
    packageBuddyTool.arg("-platform=" + platform + " ");
}

if(versionCode) {
    packageBuddyTool.arg("-versionCode='" + versionCode + "' ");
}

if(versionName) {
    packageBuddyTool.arg("-versionName='" + versionName + "' ");
}

if(packageName) {
    packageBuddyTool.arg("-packageName='" + packageName + "' ");
}

var cwd = tl.getPathInput('cwd', false);

// will error and fail task if it doesn't exist
tl.checkPath(cwd, 'cwd');
tl.cd(cwd);

packageBuddyTool.exec({ failOnStdErr: false})
.then(function(code) {
    tl.exit(code);
})
.fail(function(err) {
    console.error(err.message);
    tl.debug('taskRunner fail');
    tl.exit(1);
})
