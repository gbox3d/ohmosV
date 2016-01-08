/**
 * Created by gbox3d on 2014. 3. 24..
 */

//결문 결과 보기

define(
    function() {

        //디랙티브와 연결
        var this_dom;

        return {
            setup : function() {

                this.dom = document.querySelector("#amd-popup-input_form");
                this.blinder = this.dom.querySelector(".blinder");

                var that = this

                this.scrollObj = new iScroll(this.dom.querySelector(".mk-scroll-wrapper"),
                    {
                        onBeforeScrollStart: function (e) {
                            //클릭등의 리스트선택 이밴트 처리는 이부분에서해준다.

                            //모바일기기에서 전체 화면 출렁임방지
                            e.preventDefault();

                        },
                        onScrollMove: function(e) {
                            //스크롤시 데이터 목록 리프레쉬등을 처리 해줍니다.

                        },
                        onBeforeScrollEnd: function(e) {
                            //스크롤시 데이터 목록 리프레쉬등을 처리 해줍니다.

                        }
                    }
                );

                this.dom.querySelector('.frame .btn.ok').addEventListener(theApp.event.downEvent,function(evt) {

                    this.classList.add('press');
                    setTimeout((function() {

                        this.classList.remove('press');
                        that.hide();

                    }).bind(this),300);

                    evt.stopPropagation();
                });



            },
            show : function(option) {
                this.blinder.classList.add('active');
                this.dom.classList.add('active');

                this.scrollObj.refresh();



            },
            hide : function() {
                this.blinder.classList.remove('active');
                this.dom.classList.remove('active');
            }

        };
    }
);
