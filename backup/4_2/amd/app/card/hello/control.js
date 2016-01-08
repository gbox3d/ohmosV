/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        var this_dom,scrollObj;

        return {
            setup: function() {

                this_dom = document.querySelector('#card-hello');

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
                    //mk.pageManager.changePage("mainPage");
                }, 800);

                this_dom.querySelector('.btn').addEventListener(theApp.event.downEvent,function(evt) {

                    this.classList.add('pressed');
                    setTimeout((function() {
                        this.classList.remove('pressed');

                        mk.pageManager.changePage("secondPage");

                    }).bind(this),300);

                });

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