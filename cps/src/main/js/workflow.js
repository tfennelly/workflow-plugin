var $ = require('jquery-detached').getJQuery();
var wrapper = $('#workflow-editor-wrapper');

var textarea = $('textarea', wrapper);

$('.textarea-handle', wrapper).remove();

var ace = require('jenkins-ace-editor');
var aceEditorObj = ace.edit('workflow-editor');

var theScript = textarea.val();

aceEditorObj.setValue(theScript, 1);
aceEditorObj.getSession().on('change', function(e) {
    textarea.val(aceEditorObj.getValue());
});

if (theScript === '') {
    var $aceEditor = $('#workflow-editor', wrapper);
    var samples = $('<div class="samples"><select>' +
        '<option >try sample workflow...</option>' +
        '<option value="hello">Hello World</option>' +
        '<option value="maven">Maven Build</option>' +
        '</select></div>');

    samples.insertBefore($aceEditor);

    var sampleSelect = $('select', samples);
    sampleSelect.change(function() {
        var theSample = require('./samples').getSample(sampleSelect.val());
        aceEditorObj.setValue(theSample, 1);
    });
}

var configTable = require('./configTable');
configTable.addTabs(configTable.markConfigTables()[0], 'config_workflow');

// Adding the CSS via the adjunct mechanism (ala how the .js is added) causes the
// form-submission to explode. So, adding it manually. See gulpfile for more details.
var jenkinsModules = require('jenkins-js-modules');
jenkinsModules.addPluginCSSToPage('workflow-cps', 'workflow.css')

textarea.hide();
wrapper.show();
