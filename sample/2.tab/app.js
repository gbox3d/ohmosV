/**
 * Created by gbox3d on 2014. 2. 26..
 */


//const async = require("../../node_modules/async")
var theApp = {

    version: '0.0.1',
    event: {
        downEvent: "touchstart",
        upEvent: "touchend"
    },
    setup: function(osvCore) {

        var scope = this;

        (function() {

            async.waterfall(
                [
                    function(next) {

                        //amd 셋업
                        osvCore.amd.setupAMD({
                            modules: [{
                                name: 'tabview',
                                type: 'panel'
                            }],
                            callback: function() {
                                console.log('AMD complete');
                                next(null);

                            }
                        });
                    }
                ],
                function(error, results) {

                    if (!error) { //에러 없이 모두 과정 마침..
                        console.log('success start app');

                        osvCore.amd.panel['tabview'].show();

                    } else {
                        console.log(error);
                        alert(JSON.stringify(error));

                    }

                }
            );

        }).bind(theApp)()

    }
};