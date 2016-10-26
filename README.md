# vsts-build-tasks

Custom build &amp; release tasks for VSTS

## Current Tasks
* <b>PackageBuddy</b>: Task that leverages my [PackageBuddy nuget package](https://github.com/keannan5390/Xamarin.PackageBuddy) to allow for easily specifying the package name & version information in Android &amp; iOS apps.
* <b>BuildCountCalculator</b>: Task that uses the VSTS REST API to determine the number of builds that have run for the current build definition. NOTE: this is not the same thing as "$(rev:r)". The build revision only increments across a given build number. This task is meant to determine the number of times a build definition has run.


As I write more custom tasks I'll add them here.
