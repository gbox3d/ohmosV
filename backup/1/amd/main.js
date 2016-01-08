/**
 * Created by gbox3d on 2014. 3. 24..
 */

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'amd/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

theApp.module = {};
theApp.amd = {
    popup : {},
    card : {}
};


theApp.amd.setupAMD = function (callack) {

    function requirejs_addPopupModule(name,callback) {

        require([
            'app/popup/'+ name +'/control',
            'text!app/popup/'+ name + '/directive.html',
            'text!app/popup/' + name + '/style.css'
        ], function (module,html,css) {

            var temp = document.createElement('div');
            temp.innerHTML = html;
            document.getElementById('root-container').appendChild(temp.children[0]);

            var scriptEl = document.createElement('style');
            scriptEl.innerText = css;
            document.getElementsByTagName('head')[0].appendChild(scriptEl);

            module.setup();

            theApp.amd.popup[name] = module;
            theApp.module['popup_' + name] = module;

//            console.log(name + ' module load success');
            theApp.kernel.printf('[popup module]' + name + ' module load success');

            if(callback) {
                callback();
            }


        });

    }

    function requirejs_addCardModule(name,selector,callback) {

        require([
            'app/'+ name +'/control',
            'text!app/'+ name + '/directive.html',
            'text!app/' + name + '/style.css'
        ], function (module,html,css) {

            var temp = document.createElement('div');
            temp.innerHTML = html;
            document.querySelector(selector).appendChild(temp.children[0]);

            var scriptEl = document.createElement('style');
            scriptEl.innerText = css;
            document.getElementsByTagName('head')[0].appendChild(scriptEl);

            module.setup();

            theApp.amd.card[name] = module;

//            console.log(name + ' module load success');
            kernel_printf(name + ' module load success');

            //next(null);

            if(callback) {
                 callback();
            }


        });
    }


    async.waterfall(
        [
            function(next) {
                requirejs_addPopupModule('alert',function() {
                    next(null);
                });

            }
        ],
        function(error,results) {
            callack();
        }
    );

}

theApp.onAMD_Load();




/*
//경고창
require([
    'app/alert/control',
    "text!app/alert/directive.html",
    "text!app/alert/style.css"
], function (module,html,css) {

    var temp = document.createElement('div');
    temp.innerHTML = html;
    document.getElementById('root-container').appendChild(temp.children[0]);

    var scriptEl = document.createElement('style');
    scriptEl.innerText = css;
    document.getElementsByTagName('head')[0].appendChild(scriptEl);

    module.setup();

    //console.log(require('app/alert/control'));

    theApp.amd.popup.alert = module;
    theApp.module.popup_alert = module;
});

//yes no 팝업
require([
    'app/alert_yesno/control',
    "text!app/alert_yesno/directive.html",
    "text!app/alert_yesno/style.css"
], function (module,html,css) {

    var temp = document.createElement('div');
    temp.innerHTML = html;
    document.getElementById('root-container').appendChild(temp.children[0]);

    var scriptEl = document.createElement('style');
    scriptEl.innerText = css;
    document.getElementsByTagName('head')[0].appendChild(scriptEl);

    module.setup();

    theApp.amd.popup.alert_yesno = module;
    theApp.module.popup_yesno = module;
});

//answer 팝업
require([
    'app/answer/control',
    "text!app/answer/directive.html",
    "text!app/answer/style.css"
], function (module,html,css) {

    var temp = document.createElement('div');
    temp.innerHTML = html;
    document.getElementById('root-container').appendChild(temp.children[0]);

    var scriptEl = document.createElement('style');
    scriptEl.innerText = css;
    document.getElementsByTagName('head')[0].appendChild(scriptEl);

    module.setup();

    theApp.amd.popup.answer = module;
    theApp.module.popup_answer = module;
});
    */