import * as path from 'path';
import * as tl from 'vsts-task-lib/task';
import * as fs from 'fs';
import * as os from 'os';

tl.setResourcePath(path.join( __dirname, 'task.json'));

var isWin = /^win/.test(process.platform);

var exePath = path.join( __dirname, 'tools/PackageBuddy.exe');

var packageBuddyTool;
if(isWin)
{
    packageBuddyTool = tl.createToolRunner(exePath);
}
else 
{
    packageBuddyTool = tl.createToolRunner(tl.which('mono', true));
    packageBuddyTool.arg(exePath);
}

var projectPath = tl.getInput('projectPath', true);
var platform = tl.getInput('platform', true);
var appName = tl.getInput('appName', false);
var build = tl.getInput('build', false);
var versionName = tl.getInput('versionName', false);
var packageName = tl.getInput('packageName', false);

if(projectPath) {
    packageBuddyTool.arg("-projectPath='" + projectPath + "' ");
}

if(platform) {
    packageBuddyTool.arg("-platform=" + platform + " ");
}

if(appName) {
    packageBuddyTool.arg("-appName='" + build + "' ");
}

if(build) {
    packageBuddyTool.arg("-build='" + build + "' ");
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
});