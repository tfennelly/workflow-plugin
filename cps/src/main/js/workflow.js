var $ = require('jquery-detached').getJQuery();
var wrapper = $('#workflow-editor-wrapper');
var scriptSection = wrapper.closest('tr.dropdownList-container');
var configTable = scriptSection.closest('table');

// Hide all other rows on the config
var siblings = scriptSection.siblings();
siblings.hide();

// But show the previous 2 rows so as to show the section heading.
// (this is the sort of hacking that's needed when the page structure sucks).
scriptSection.prev().show().prev().show();

// Add a "show all" clickable above.
var showAll = $('<div style="text-align: center; cursor: pointer" title="Show all configuration options">show all</div>');
showAll.insertBefore(configTable);
showAll.click(function() {
    siblings.show();
    showAll.remove();
});

var textarea = $('textarea', wrapper);

$('.textarea-handle', wrapper).remove();

var ace = require('jenkins-ace-editor');
var aceEditorObj = ace.edit('workflow-editor');

var theScript = textarea.val();

aceEditorObj.setValue(theScript, 1);
aceEditorObj.getSession().on('change', function(e) {
    textarea.val(aceEditorObj.getValue());
});
aceEditorObj.setOptions({
    enableBasicAutocompletion: true
});

if (theScript === '') {
    var $aceEditor = $('#workflow-editor', wrapper);
    var samples = $('<div><select>' +
        '<option >try sample workflow...</option>' +
        '<option value="hello">Hello World</option>' +
        '<option value="maven">Maven Build</option>' +
        '</select></div>');

    samples.insertBefore($aceEditor);
    samples.css({
        'position': 'absolute',
        'right': '10px',
        'z-index': 100,
        'top': '10px'
    });

    var sampleSelect = $('select', samples);
    sampleSelect.change(function() {
        var theSample = require('./samples').getSample(sampleSelect.val());
        aceEditorObj.setValue(theSample, 1);
    });
}

// Reshow the buttons
$('#bottom-sticker', configTable).closest('tr').show();

wrapper.show();
textarea.hide();
