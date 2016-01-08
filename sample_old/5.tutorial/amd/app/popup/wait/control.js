/**
 * Created by gbox3d on 2014. 3. 24..
 */

_mk__module = {
    setup : function() {

        this.dom = document.querySelector("#amd-popup-wait");
        this.blinder = this.dom.querySelector(".blinder");
    },
    show : function() {
        this.blinder.classList.add('active');
        this.dom.classList.add('active');

    },
    hide : function() {
        this.blinder.classList.remove('active');
        this.dom.classList.remove('active');
    }
};
define(
    function() {
        return _mk__module;
    }
);