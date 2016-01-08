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

            },
            show : function(option) {
                //화면 재구성
                this_dom.style.width = window.innerWidth + 'px';
                this_dom.style.height = window.innerHeight + 'px';

            },
            hide : function() {
                //화면 종료

            }

        };
    }
);