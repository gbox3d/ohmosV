/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        var this_dom,callback,isCancel;

        var property = {
            setup : function(name,type) {

                this_dom = document.querySelector("#amd-" + type + "-" + name);

                this_dom.querySelector('#btn-ok').addEventListener('click',function() {
                    isCancel = false;

                    property.hide();

                } );

                $(this_dom.querySelector('[role=dialog]')).on('hide.bs.modal', function () {
                    console.log('hide.bs.modal')

                    if(!isCancel) {
                        callback(this_dom.querySelector('#usr').value);
                    }
                    else {
                        callback('canceled'); //캔슬처리
                    }

                });

                $(this_dom.querySelector('[role="dialog"]')).on('hidden.bs.modal', function (evt) {
                    console.log('hidden.bs.modal')
                    console.log(evt);



                });

                $(this_dom.querySelector('[role="dialog"]')).on('dismiss.bs.modal', function () {
                    console.log('hidden.bs.modal')
                });




            },
            show : function(option) {

                isCancel = true;
                this_dom.querySelector('#usr').value = option.usr_name;
                callback = option.callback;

                $(this_dom.querySelector('.modal')).modal();

            },
            hide :function(param) {

                $(this_dom.querySelector('.modal')).modal('hide');
                //$(this_dom).modal('hide');

            }
        };
        return property

    }
);