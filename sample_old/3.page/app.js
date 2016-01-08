/**
 * Created by gbox3d on 2014. 2. 26..
 */



var theApp = {

    version : '0.0.1',
    event : {
        downEvent : "click",//"touchstart",
        upEvent : "touchend"
    },
    setup : function() {
        (function() {

            async.waterfall(
                [
                    //부트로더
                    function(next) {

                        theApp.kernel = ohmOS.kernel({
                            dom_screen : document.getElementById('bootloader-screen')
                        });

                        theApp.kernel.printf('start ohmOS-html5 system v1.0');

                        //amd 모듈 세팅할 준비가 되면
                        theApp.onAMD_Load = function() {
                            theApp.kernel.printf('now read AMD system');
                            next(null);
                        }
                    },
                    function(next) {

                        theApp.kernel.printf('now loading AMD...');

                        //amd 셋업
                        theApp.amd.setupAMD(function() {

                            theApp.kernel.printf('AMD complete');

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

                        console.log('start app');

                        //메인 페이지로 시작하기
                        mk.pageManager.setup({
                            startPage : "mainPage", //시작페이지 지정
                            pages : {
                                //페이지들 선언
                                mainPage: mk.createPage({
                                    dom: document.getElementById('page-main'),
                                    card: theApp.amd.card.hello,
                                    setup: function () {

                                        //페이지영역(헤더,푸터)에 대한 이밴트 핸들링을 해준다.

                                        console.log('first page setup');

                                        //다음페이지로가기
                                        this.dom.querySelector('.next-btn').addEventListener(theApp.event.downEvent,function() {

                                            mk.pageManager.changePage("secondPage");

                                        });

                                    }
                                }),
                                secondPage: mk.createPage({
                                    dom: document.getElementById('page-second'),
                                    card: theApp.amd.card.test,
                                    setup: function () {

                                        console.log('second page setup');

                                        //메인페이지로 가기
                                        this.dom.querySelector('.back-btn').addEventListener(theApp.event.downEvent,function() {

                                            mk.pageManager.changePage("mainPage");

                                        });
                                    }
                                })
                            }
                        });
                        ////////setup end
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

