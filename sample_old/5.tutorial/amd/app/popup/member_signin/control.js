/**
 * Created by gbox3d on 2014. 3. 24..
 */



define(
    function() {
        var this_dom,blinder,callback;
        var scrollObj;
        var sel_sido;
        var isActive = false;
        return {
            setup : function() {

                var that = this;
                callback = null;
                this_dom =  document.querySelector("#amd-popup-member-signin");
                blinder = this_dom.querySelector(".blinder");

                scrollObj = this_dom.scrollObj = new iScroll(this_dom.querySelector('.mk-scroll-wrapper'), {
                    useTransition: true,
                    onBeforeScrollStart: function (e) {

                        var target = e.target;

                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'
                            && !target.classList.contains('btn')
                            ) {
                            e.preventDefault();
                        }

                        console.log('check');

                    },
                    onBeforeScrollEnd : function() {

                    },
                    onRefresh: function () {

                    },
                    onScrollMove: function () {

                    },
                    onScrollEnd: function () {
                    }
                });

                //안드로이드 키입력기 버그 때문에 이부분이 필요함
                window.addEventListener('resize',function() {

                    if(isActive) {
                        scrollObj.refresh();
                        var active_em = this_dom.querySelector("*:focus");
                        if(active_em) {
                            this_dom.scroller.scrollToElement(active_em);
                        }

                        kernel_printf('refresh : answer_pub_game resize');
                    }
                });

                setTimeout(function () {
                    this_dom.style.left = '0';
                }, 800);

                var okBtn = this_dom.querySelector(".btn-box .btn.ok");
                var cancelBtn = this_dom.querySelector(".btn-box .btn.cancel");

                okBtn.addEventListener(theApp.event.downEvent,function(evt) {

                    okBtn.classList.add('press');

                    //클릭전달되는것 방지
                    setTimeout(function() {
                        //this_dom.style.zIndex = '25';
                        okBtn.classList.remove('press');

                        that.hide();

                        if(callback) {
                            evt.result = 'cancle';
                            callback(evt);
                        }


                    },300);

                    evt.stopPropagation();

                },true);

                cancelBtn.addEventListener(theApp.event.downEvent,function(evt) {

                    cancelBtn.classList.add('press');

                    setTimeout(function() {

                        cancelBtn.classList.remove('press');

                        that.hide();

                        if(callback) {
                            evt.result = 'cancle';
                            callback(evt);
                        }

                    },300);

                    evt.stopPropagation();



                },true);



            },
            show : function(option) {


                //회원 가입화면 보이기
                this_dom.classList.add('active');
                blinder.classList.add('active');

                scrollObj.refresh();



            },
            hide : function() {
                blinder.classList.remove('active');
                this_dom.classList.remove('active');
            }
        };
    }
);