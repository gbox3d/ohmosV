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
                'app/card/'+ name +'/control',
                'text!app/card/'+ name + '/directive.html',
                'text!app/card/' + name + '/style.css'
        ], function (module,html,css) {

            var temp = document.createElement('div');
            temp.innerHTML = html;
            document.querySelector(selector).appendChild(temp.children[0]);

            var scriptEl = document.createElement('style');
            scriptEl.innerText = css;
            document.getElementsByTagName('head')[0].appendChild(scriptEl);

            module.setup();

            theApp.amd.card[name] = module;

            theApp.kernel.printf('[card module]' + name + ' module load success');

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

            },
            function(next) {

                requirejs_addCardModule(
                    'hello',//모듈이름
                    '#page-main .mk-content',//dom 에 삽입될 위치 샐랙터의 자식으로 들어감
                    function() {
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
