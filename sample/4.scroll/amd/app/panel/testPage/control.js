/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        //디랙티브와 연결
        var this_dom;
        var Scroll_obj;

        return {
            setup : function(name) {
                //이밴트 핸들러는 여기에
                this_dom = document.querySelector("#amd-popup-" + name);
                this_dom.classList.add('hide');

                Scroll_obj = new IScroll(this_dom.querySelector('#wrapper'),
                    {
                        mouseWheel : true
                    }
                );



            },
            show : function(option) {
                //화면 재구성
                this_dom.classList.remove('hide');

                setTimeout(function() {
                    Scroll_obj.refresh();
                },300)

            },
            hide : function() {
                //화면 종료
                this_dom.classList.add('hide');

            }

        };
    }
);