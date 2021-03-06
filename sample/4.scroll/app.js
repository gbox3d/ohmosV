/**
 * Created by gbox3d on 2014. 2. 26..
 */



var theApp = {

    version : '0.0.1',
    event : {
        downEvent : "touchstart",
        upEvent : "touchend"
    },
    setup : function() {

        var scope = this;

        (function() {

            async.waterfall(
                [
                    ////부트로더
                    //function(next) {
                    //    //amd 모듈 세팅할 준비가 되면
                    //    scope.onAMD_Load = function() {
                    //        console.log('now read AMD system')
                    //        next(null);
                    //
                    //    }
                    //},
                    function(next) {

                        //amd 셋업
                        scope.amd.setupAMD(
                            {
                                modules : [

                                    {
                                        name : 'testPage',
                                        type : 'panel'
                                    }
                                ],
                                callback : function() {
                                    console.log('AMD complete');
                                    next(null);
                                }
                            }
                        );
                    }
                ],
                function(error,results) {

                    if(!error) { //에러 없이 모두 과정 마침..
                        console.log('success start app');
                        scope.amd.panel.testPage.show();

                    }
                    else {
                        console.log(error);
                        alert(JSON.stringify(error));

                    }

                }
            );

        }).bind(theApp)()

    }
};

