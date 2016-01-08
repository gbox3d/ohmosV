/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        //디랙티브와 연결
        var this_dom;

        return {
            setup : function(name) {
                //이밴트 핸들러는 여기에
                this_dom = document.querySelector("#amd-popup-" + name);
                this_dom.classList.add('hide');

            },
            show : function(option) {
                //화면 재구성
                this_dom.classList.remove('hide');

            },
            hide : function() {
                //화면 종료
                this_dom.classList.add('hide');

            }

        };
    }
);