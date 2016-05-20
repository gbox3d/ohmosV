/**
 * Created by gbox3d on 2014. 2. 26..
 */

var theApp = {

    version : '0.0.1',
    event : {
        downEvent : "touchstart",
        upEvent : "touchend"
    },
    setup : function(osvCore) {

        console.log('start setup App')
        var scope = this;
        async.waterfall(
            [
                //amd 셋업
                function(next) {

                    osvCore.amd.setupAMD({
                        modules : [
                            {
                                name : 'testDlg',
                                type : 'popup'
                            }

                        ],
                        callback : function() {
                            next();
                        }
                    })
                }
            ],
            function(error,results) {
                if(!error) { //에러 없이 모두 과정 마침..
                    console.log('success start app')
                    osvCore.amd.popup['testDlg'].show(
                        {
                            usr_name : 'gbox',
                            callback : function(val) {
                                alert(val);
                            }
                        }
                    );

                }
                else {
                    console.log(error);
                    alert(JSON.stringify(error));

                }

            }
        );

    }
};
