/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        var this_dom,callback;
        var timerId

        var property = {
            setup : function(name) {

                this_dom = document.querySelector("#amd-popup-" + name);

                this_dom.querySelector('#btn-ok').addEventListener('click',function() {

                    //callback(this_dom.querySelector('#usr').value);
                    //$(this_dom.querySelector('.modal')).modal('hide');

                    property.hide();

                } )

            },
            show : function(option) {

                //this_dom.querySelector('#usr').value = option.usr_name;
                callback = option.callback;

                $(this_dom.querySelector('.modal')).modal();

                var start_time = (new Date()).getTime();

                function loop() {

                    var passed_time =  ( (new Date()).getTime() - start_time );
                    var color = (255* (passed_time/1000) );

                    color %= 255;

                    color = Math.round(color);

                    this_dom.querySelector('.modal-header').style.backgroundColor = 'rgb(' +color + ',0,0)';
                    console.log('time :' +  passed_time + ',' + color);

                    timerId = setTimeout(loop,100)
                }
                loop()


            },
            hide :function(param) {

                $(this_dom.querySelector('.modal')).modal('hide');
                //$(this_dom).modal('hide');

                clearTimeout(timerId);

            }
        };

        return property;

    }
);