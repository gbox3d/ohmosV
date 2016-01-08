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

                this_dom.querySelector('.btn.testmodal').addEventListener('click',function() {

                    theApp.amd.popup.testDlg.show({
                        callback : function(val) {

                            this_dom.querySelector('.log-tex').innerText = 'hi~ ' + val;

                        },
                        usr_name : 'test'
                    });

                });

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