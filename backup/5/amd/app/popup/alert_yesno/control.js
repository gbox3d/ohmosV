/**
 * Created by gbox3d on 2014. 3. 24..
 */


define(function() {

    var this_dom;

    return {
        setup : function() {

            this_dom = this.dom = document.querySelector("#amd-popup-yesno");
            this.blinder = this.dom.querySelector(".blinder");

            var that = this;

            this.dom.querySelector('.frame .btn.ok').addEventListener(theApp.event.downEvent,function(evt) {


                this.classList.add('press');

                setTimeout(function() {

                    evt.result = 'yes';
                    that.hide(evt);


                },300);

                evt.stopPropagation();

            },true);

            this.dom.querySelector('.frame .btn.no').addEventListener(theApp.event.downEvent,function(evt) {

                console.log('click');
                this.classList.add('press');

                setTimeout(function() {

                    evt.result = 'no';
                    that.hide(evt);


                },300);

                evt.stopPropagation();

            },true);

            return true;

        },
        show : function(option) {

            //var thisObj = theApp.popup.alert;

            this.blinder.classList.add('active');
            this.dom.classList.add('active');
            this.onCallBack = option.onCallBack;

            this.dom.querySelector('.frame .body .msg').innerText = option.msg;
            this.dom.querySelector('.frame .header .text').innerText = option.title;

            var body_em = this.dom.querySelector('.frame .body');

            if(body_em.offsetHeight > 250) {

                body_em.classList.add('maxHeight');

            }
            else {
                body_em.classList.remove('maxHeight');
            }
        },
        hide :function(param) {
            this.blinder.classList.remove('active');
            this.dom.classList.remove('active');
            this.dom.querySelector('.frame .body').classList.remove('maxHeight'); //크기 원래대로
            this.dom.querySelector('.frame .btn.ok').classList.remove('press');
            this.dom.querySelector('.frame .btn.no').classList.remove('press');

            if(this.onCallBack) {
                this.onCallBack(param);
            }
        }
    };
});