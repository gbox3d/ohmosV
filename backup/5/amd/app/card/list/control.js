/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        //디랙티브와 연결
        var this_dom,scrollObj;
        var hoverTimeout,hoverTarget;

        //스크롤시 클릭취소
        function cancelClick() {
            if (hoverTarget) {
                clearTimeout(this.hoverTimeout);

                hoverTarget.classList.remove('iScrollHover');
                hoverTarget = null;
            }
        }

        return {
            setup : function() {
                //이밴트 핸들러는 여기에
                this_dom = document.querySelector('#card-list');

                scrollObj = this_dom.scroller = new iScroll(this_dom, {
                    useTransition: true,
                    onBeforeScrollStart: function (e) {

                        var target = e.target;

                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'
                            && !target.classList.contains('btn')
                            ) {
                            e.preventDefault();
                        }

                        hoverTimeout = setTimeout((function () {

                            if(hoverTarget) {
                                hoverTarget.classList.add('iScrollHover');

                                setTimeout((function() {
                                    hoverTarget.classList.remove('iScrollHover');
                                    //클릭처리
                                    theApp.amd.popup.detail.show();

                                }).bind(this),300);
                            }

                        }).bind(this), 80);

                        hoverTarget = target.parentNode;

                    },
                    onBeforeScrollEnd : function() {

                    },
                    onRefresh: function () {

                    },
                    onScrollMove: function () {
                        cancelClick();

                    },
                    onScrollEnd: function () {
                    }
                });

                //안드로이드 키입력기 버그 때문에 이부분이 필요함
                window.addEventListener('resize',function() {

                    this_dom.scroller.refresh();
                    var active_em = this_dom.querySelector("*:focus");
                    if(active_em) {
                        this_dom.scroller.scrollToElement(active_em);
                    }

                });

                setTimeout(function () {
                    this_dom.style.left = '0';
                }, 800);

                var btns = this_dom.querySelectorAll('li.menu .btn');

                for(var i=0;i<btns.length;i++) {
                    btns[i].addEventListener(theApp.event.downEvent,(function() {
                            var this_btn = btns[i];
                            return function(evt) {

                                console.log(this_btn);

                                this_btn.classList.add('pressed');

                                setTimeout(function() {
                                    this_btn.classList.remove('pressed');
                                },300);

                            }

                        })()
                    );
                }

            },
            show : function(option) {

                this_dom.style.width = window.innerWidth + 'px';
                this_dom.style.height = window.innerHeight + 'px';

                //화면 재구성
                this_dom.classList.add('active');

                scrollObj.refresh();

            },
            hide : function() {
                //화면 종료
                this_dom.classList.remove('active');

            }

        };
    }
);