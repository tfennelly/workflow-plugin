//
// See https://github.com/tfennelly/jenkins-js-builder
//
var builder = require('jenkins-js-builder');

//
// Bundle the modules.
// See https://github.com/tfennelly/jenkins-js-builder#bundling
//
builder.bundle('src/main/js/workflow-editor.js')
    .withExternalModuleMapping('jqueryui-detached', 'jquery-detached:jqueryui1')
    .withExternalModuleMapping('jenkins-js-widgets', 'js-widgets:jenkins-js-widgets', {addDefaultCSS: true}) // HPI needs to be built from https://github.com/tfennelly/jenkins-js-widgets
    .inDir('target/generated-resources/adjuncts/org/jenkinsci/plugins/workflow/cps');
