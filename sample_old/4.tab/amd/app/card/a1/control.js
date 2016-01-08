/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {
        var this_dom;
        return {
            setup : function() {
                this_dom = document.querySelector('#card-a1');
            },
            show : function(option) {

                this_dom.style.width = window.innerWidth + 'px';
                this_dom.style.height = window.innerHeight + 'px';

                this_dom.classList.add('active');

            },
            hide : function() {
                this_dom.classList.remove('active');

            }

        };
    }
);