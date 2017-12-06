"use strict";
const path = require('path');
const tl = require('vsts-task-lib/task');
tl.setResourcePath(path.join(__dirname, 'task.json'));
var isWin = /^win/.test(process.platform);
var exePath = path.join(__dirname, 'tools/PackageBuddy.exe');
var packageBuddyTool;
if (isWin) {
    packageBuddyTool = tl.createToolRunner(exePath);
}
else {
    packageBuddyTool = tl.createToolRunner(tl.which('mono', true));
    packageBuddyTool.arg(exePath);
}
var projectPath = tl.getInput('projectPath', true);
var platform = tl.getInput('platform', true);
var appName = tl.getInput('appName', false);
var build = tl.getInput('build', false);
var versionName = tl.getInput('versionName', false);
var packageName = tl.getInput('packageName', false);
if (projectPath) {
    packageBuddyTool.arg("-projectPath='" + projectPath + "' ");
}
if (platform) {
    packageBuddyTool.arg("-platform=" + platform + " ");
}
if (build) {
    packageBuddyTool.arg("-build='" + build + "' ");
}
if (versionName) {
    packageBuddyTool.arg("-versionName='" + versionName + "' ");
}
if (packageName) {
    packageBuddyTool.arg("-packageName='" + packageName + "' ");
}
if (appName) {
    packageBuddyTool.arg("-appName='" + appName + "' ");
}
var cwd = tl.getPathInput('cwd', false);
// will error and fail task if it doesn't exist
tl.checkPath(cwd, 'cwd');
tl.cd(cwd);
packageBuddyTool.exec({ failOnStdErr: false })
    .then(function (code) {
    tl.exit(code);
})
    .fail(function (err) {
    console.error(err.message);
    tl.debug('taskRunner fail');
    tl.exit(1);
});
//# sourceMappingURL=packageBuddy.js.map