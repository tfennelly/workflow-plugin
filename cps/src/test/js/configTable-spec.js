/* jslint node: true */
/* global describe, it, expect */

"use strict";

var jsTest = require("jenkins-js-test");

describe("ACE Editor tests", function () {

    it("- test", function (done) {
        jsTest.onPage(function() {
            var $ = require('jquery-detached').getJQuery();


            done();
        }, 'workflow-config.html');
    });
});
