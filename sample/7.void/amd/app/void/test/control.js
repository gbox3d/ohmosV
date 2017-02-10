/**
 * Created by gunpower on 2016. 5. 26..
 */

define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./message');

    // Load library/vendor modules using
    // full IDs, like:
    var print = require('print');
    //print('hello');

    var property = {
        hello : function () {
            print(messages.getHello());

        }

    };

    return property;


});
