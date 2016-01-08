/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        //디랙티브와 연결
        var this_dom;

        return {
            setup : function() {
                //이밴트 핸들러는 여기에
                this_dom = document.querySelector("#amd-popup-camera");

                var that = this;

                this_dom.addEventListener(mk.event.downEvent,function(evt) {

                    evt.stopPropagation();

                    that.hide();

                },true);

            },
            show : function(option) {
                //화면 재구성
                this_dom.classList.add('active');

            },
            hide : function() {
                //화면 종료
                this_dom.classList.remove('active');

            }

        };
    }
);