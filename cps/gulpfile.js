//
// See https://github.com/tfennelly/jenkins-js-builder
//
var builder = require('jenkins-js-builder');

//
// Use the predefined tasks from jenkins-js-builder.
// See https://github.com/tfennelly/jenkins-js-builder#predefined-gulp-tasks
//
builder.defineTasks(['test', 'bundle', 'rebundle']);

//
// Sources are not in the default locations. Following a more maven-like pattern here.
// See https://github.com/tfennelly/jenkins-js-builder#setting-src-and-test-spec-paths
//
builder.src('src/main/js');
builder.tests('src/test/js');

//
// Bundle the modules.
// See https://github.com/tfennelly/jenkins-js-builder#bundling
//
builder.bundle('src/main/js/workflow.js')
    .withExternalModuleMapping('jquery-detached', 'jquery-detached:jquery2')
    .withExternalModuleMapping('jenkins-ace-editor', 'ace-editor:aceeditor119')
    .inDir('target/generated-adjuncts/org/jenkinsci/plugins/workflow');
