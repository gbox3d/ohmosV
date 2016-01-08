/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        var this_dom,callback;

        return {
            setup : function() {

                this_dom = document.querySelector("#amd-popup-alert");
//                this.blinder = this.dom.querySelector(".blinder");

                var that = this;

                this_dom.querySelector('.frame .btn.ok').addEventListener(mk.event.downEvent,function(evt) {

                    this.classList.add('press');

                    setTimeout(function() {

                        that.hide(evt);

                        if(callback) {
                            callback();
                        }
                        else {

                        }


                    },300);

                    evt.stopPropagation();

                },true);
            },
            show : function(option) {

                //var thisObj = theApp.popup.alert;
//                this.blinder.classList.add('active');

                this_dom.style.width = window.innerWidth + 'px';
                this_dom.style.height = window.innerHeight + 'px';

                this_dom.classList.add('active');
                callback = option.onCallBack;

                this_dom.querySelector('.frame .body .msg').innerText = option.msg;
                this_dom.querySelector('.frame .header .text').innerText = option.title;

                //능돌적으로 크기 조절 (250 까지..)
                var body_em = this_dom.querySelector('.frame .body');

                if(body_em.offsetHeight > 250) {

                    body_em.classList.add('maxHeight');

                }
                else {
                    body_em.classList.remove('maxHeight');
                }
            },
            hide :function(param) {

//                console.log('hide');
                //this.blinder.classList.remove('active');

                this_dom.classList.remove('active');
                this_dom.querySelector('.frame .body').classList.remove('maxHeight'); //크기 원래대로
                this_dom.querySelector('.frame .btn.ok').classList.remove('press');


            }
        };
    }
);