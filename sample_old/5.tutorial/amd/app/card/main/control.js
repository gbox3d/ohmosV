/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        var this_dom,scrollObj;

        return {
            setup: function() {

                this_dom = document.querySelector('#card-main');

                scrollObj = this_dom.scroller = new iScroll(this_dom, {
                    useTransition: true,
                    onBeforeScrollStart: function (e) {

                        var target = e.target;

                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'
                            && !target.classList.contains('btn')
                            ) {
                            e.preventDefault();
                        }

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

                                mk.pageManager.changePage('listPage');

                            },300);

                        }

                    })()
                    );
                }


            },
            show : function() {

                this_dom.style.width = window.innerWidth + 'px';
                this_dom.style.height = window.innerHeight + 'px';

                this_dom.classList.add('active');

                scrollObj.refresh();

            },
            hide : function() {

                this_dom.classList.remove('active');

            }
        };
    }
);