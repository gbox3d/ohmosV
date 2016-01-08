/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        //디랙티브와 연결
        var this_dom,blinder;
        var callback;

        return {
            setup : function() {
                //이밴트 핸들러는 여기에

                this_dom = document.querySelector("#amd-popup-map");
                blinder = this_dom.querySelector(".blinder");

                var that = this;
                this_dom.querySelector('.frame .btn.ok').addEventListener(mk.event.downEvent,function(evt) {

                    this.classList.add('press');

                    setTimeout(function() {

                        that.hide(evt);
                        if(callback) {
                            callback();
                        }

                    },300);

                    evt.stopPropagation();

                },true);
            },
            show : function(option) {
                //화면 재구성
                blinder.classList.add('active');
                this_dom.classList.add('active');

                var map;
                function initialize() {
                    var myLatlng = new google.maps.LatLng(36.3241640, 127.3378020);
                    var myOptions = {
                        zoom : 16,
                        center : myLatlng,
                        mapTypeId : google.maps.MapTypeId.ROADMAP
                    }
                    map = new google.maps.Map(this_dom.querySelector(".map_canvas"), myOptions);

//                    google.maps.event.addListener(map, 'zoom_changed', function() {
//                        setTimeout(moveToDarwin, 3000);
//                    });

                    var marker = new google.maps.Marker({
                        position : myLatlng,
                        map : map,
                        title : "Hello World!"
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        map.setZoom(8);
                    });
                }

                initialize();

            },
            hide : function() {
                //화면 종료
                blinder.classList.remove('active');
                this_dom.classList.remove('active');
            }

        };
    }
);