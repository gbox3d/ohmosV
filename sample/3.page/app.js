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

        this.osvCore = osvCore;
        var scope = this;

        async.waterfall(
            [
                //amd 셋업
                function(next) {
                    console.log('start setup amd ========================================');
                    osvCore.amd.setupAMD({
                        modules: [{
                                name: 'testDlg',
                                type: 'popup'
                            },
                            {
                                name: 'testPage',
                                type: 'panel'
                            }
                        ],
                        callback: function() {
                            console.log('AMD complete ========================================');
                            next(null);
                        }
                    });
                }
            ],
            function(error, results) {

                if (!error) { //에러 없이 모두 과정 마침..
                    console.log('success start app');
                    osvCore.amd.panel.testPage.show();

                } else {
                    console.log(error);
                    alert(JSON.stringify(error));

                }

            }
        );



    }
};