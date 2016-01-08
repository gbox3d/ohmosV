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
        return (function() {

            //탭바 페이지 설정
            function MainPage() {

                var this_dom;
                var tab;
                var prev_tab;

                function _changeTab(new_tab) {

                    if(prev_tab) {
                        prev_tab.dom.classList.remove('active');
                        prev_tab.card.hide();
                        prev_tab.btn.classList.remove('active');
                    }

                    new_tab.dom.classList.add('active');
                    new_tab.btn.classList.add('active');
                    new_tab.card.show();
                    prev_tab = new_tab;

                }
                this.pub_method = {
                    setup: function() {
                        this_dom = document.getElementById('page-main');
                        //탭초기화
                        tab = [
                            {
                                dom : document.querySelector('.mk-tab.a1'),
                                card :theApp.amd.card.a1,
                                btn : document.querySelector('.mk-tabbar .tab-btn.a1')
                            },
                            {
                                dom : document.querySelector('.mk-tab.a2'),
                                card :theApp.amd.card.a2,
                                btn : document.querySelector('.mk-tabbar .tab-btn.a2')
                            }
                        ];


                        for(var i=0;i<tab.length;i++) {

                            tab[i].btn.addEventListener(theApp.event.downEvent,(function() {

                                var _tab = tab[i]; //클로져

                                return function() {
                                    _changeTab(_tab);
                                }

                            })());
                        }
                    },
                    show :function() {
                        //시작탭
                        _changeTab(tab[0]);
                        this_dom.classList.add('active');
                    },
                    hide : function() {

                        this_dom.classList.remove('active');

                    }

                }
            }

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



                        //theApp.kernel.printf('success start app');
                        console.log('start app');

                        var mainPageObj = new MainPage();
                        mainPageObj.pub_method.setup();
                        mainPageObj.pub_method.show();
                    }
                    else {
                        console.log(error);
                        alert(JSON.stringify(error));
                    }

                }
            );

        }).bind(theApp)();
    }
};

