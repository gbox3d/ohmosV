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

                //var that = this;
                var context = this;

                //로그인
                async.waterfall(
                    [
                        function(next) {

                            ok_btn.addEventListener(theApp.event.downEvent,function(evt) {

                                context.hide({
                                    id : inp_id.value,
                                    passwd : inp_pw.value,
                                    test : 'hi'

                                });
                                theApp.amd.popup.wait.show();
                                next(null);
                            });

                        },
                        function(next) {

                            setTimeout(function() {
                                next(null);

                            },800);
                        }

                    ],
                    function(error,results) {

                        theApp.amd.popup.wait.hide();

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

                this.onCallBack = option.callback;

                this.dom.classList.add('active');
                this.blinder.classList.add('active');


            },
            hide : function(param) {

                this.dom.classList.remove('active');
                this.blinder.classList.remove('active');

                if(this.onCallBack) {
                    this.onCallBack(param);
                }

            }
        };
    }
);