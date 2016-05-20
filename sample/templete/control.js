/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        //디랙티브와 연결
        var this_dom;

        var property = {
            setup : function(name,type) {
                //이밴트 핸들러는 여기에
                this_dom = document.querySelector("#amd-"+ type +"-" + name);

            },
            show : function(option) {
                //화면 재구성

            },
            hide : function() {
                //화면 종료

            }

        };

        return property;
    }
);