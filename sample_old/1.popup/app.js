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

        var context = this;

        (function() {

            async.waterfall(
                [
                    //부트로더
                    function(next) {

                        context.kernel = ohmOS.kernel({
                            dom_screen : document.getElementById('bootloader-screen')
                        });

                        context.kernel.printf('start ohmOS-html5 system v1.0');

                        //amd 모듈 세팅할 준비가 되면
                        context.onAMD_Load = function() {
                            context.kernel.printf('now read AMD system');
                            next(null);
                        }
                    },
                    function(next) {

                        context.kernel.printf('now loading AMD...');

                        //amd 셋업
                        context.amd.setupAMD(function() {

                            context.kernel.printf('AMD complete');

                            next(null);

                        });
                    },
                    function(next) {

                        //화면 전환
                        setTimeout(function() {
                            document.getElementById('bootloader-screen').style.display = 'none';
                            document.getElementById('root-container').style.display = 'block';
                            next(null);

                        },80);
                    }
                ],
                function(error,results) {

                    if(!error) { //에러 없이 모두 과정 마침..

                        context.kernel.printf('success start app');

                        context.amd.popup.alert.show({
                            title : 'hello',
                            msg : '안녕하세요!',
                            onCallBack : function() {
                                console.log('alert closed!');
                            }
                        });

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

