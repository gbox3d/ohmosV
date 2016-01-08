/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        //프라이빗변수
        var this_dom,blinder;
        var callback;
        var ok_btn,reg_btn,inp_id,inp_pw;

        return {
            setup : function() {

                this_dom = this.dom = document.getElementById('amd-popup-login');
                blinder = this.blinder = this.dom.querySelector('.blinder');

                ok_btn = this.dom.querySelector('.frame .btn.login');
                reg_btn = this.dom.querySelector('.frame .btn.register');

                inp_id = this.dom.querySelector('.frame .input .id');
                inp_pw = this.dom.querySelector('.frame .input .passwd');

                var that = this;

                //로그인
                async.waterfall(
                    [
                        function(callback) {

                            ok_btn.addEventListener(theApp.event.downEvent,function(evt) {

                                that.hide();
                                theApp.amd.popup.wait.show();
                                callback(null);
                            });

                        },
                        function(callback) {

                            setTimeout(function() {
                                callback(null);

                            },800);

//                            theApp.api.login({
//                                callback : function(result) {
//                                    callback(null,result);
//
//                                },
//                                data : {
//                                    id : inp_id.value,
//                                    pw : inp_pw.value,
//                                    usim : theApp.userInfo.uuid
//                                }
//                            });
                        }

                    ],
                    function(error,results) {

                        theApp.amd.popup.wait.hide();

//                        if(results.result == 'ok') {
//                            results.id = inp_id.value;
//                            results.pw = inp_pw.value;
//
//                        }

                        if(callback) {
                            callback(results);
                        }

                    }
                );

                //회원 가입 버튼 처리
                reg_btn.addEventListener(theApp.event.downEvent,function() {

                    //이 팝업을을 살짝 뒤로 보내기
                    this_dom.style.zIndex = 25;

                    theApp.amd.popup.member_signin.show({
                        callback : function() {
                            this_dom.style.zIndex = 'none';
                        }
                    });

                });

            },
            show : function(option) {

                callback = option.callback;

                this.dom.classList.add('active');
                this.blinder.classList.add('active');


            },
            hide : function() {

                this.dom.classList.remove('active');
                this.blinder.classList.remove('active');

            }
        };
    }
);