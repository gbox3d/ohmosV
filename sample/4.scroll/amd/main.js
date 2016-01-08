/**
 * Created by gbox3d on 2014. 3. 24..
 *
 * 2016.1.8 bootstrap 지원추가
 *
 */

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'amd/lib',
    paths: {
        app: '../app'
    }
});

theApp.module = {};
theApp.amd = {
    popup : {},
    card : {}
};


theApp.amd.setupAMD = function (option) {

    console.log('start amd loader system 1.1')

    function requirejs_addPanelModule(name,callback) {

        require([
            'app/panel/'+ name +'/control',
            'text!app/panel/'+ name + '/directive.html',
            'text!app/panel/' + name + '/style.css'
        ], function (module,html,css) {

            var temp = document.createElement('div');
            temp.innerHTML = html;
            document.getElementById('root-container').appendChild(temp.children[0]);

            var scriptEl = document.createElement('style');
            scriptEl.innerText = css;
            document.getElementsByTagName('head')[0].appendChild(scriptEl);

            module.setup(name);

            theApp.amd.popup[name] = module;
            //theApp.module['panel_' + name] = module;

            console.log(name + ' module load success');

            if(callback) {
                callback();
            }


        });

    }

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

            module.setup(name);

            theApp.amd.popup[name] = module;
            //theApp.module['popup_' + name] = module;

            console.log(name + ' module load success');

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

            module.setup('amd-popup-'+name);

            theApp.amd.card[name] = module;

//            console.log(name + ' module load success');
            //kernel_printf(name + ' module load success');
            //next(null);

            if(callback) {
                 callback();
            }

        });
    }

    var load_proc = [];

    var modules = option.modules;

    for(var i=0;i<modules.length;i++) {
        var module = modules[i]
        switch (module.type) {
            case 'panel':
                load_proc.push(
                    (function() {
                        var module_name = module.name;
                        return function(next) {
                            requirejs_addPanelModule(module_name, function () {
                                    next(null);

                                }
                            );

                        }

                    })()
                    );
                break;
            case 'popup':
                load_proc.push(
                    (function() {
                        var module_name = module.name;
                        return function(next) {
                            requirejs_addPopupModule(module_name, function () {
                                    next(null);

                                }
                            );

                        }

                    })()
                );
                break;
            case 'card':
                load_proc.push(
                    (function() {
                        var module_name = module.name;
                        return function(next) {
                            requirejs_addCardModule(module_name, function () {
                                    next(null);

                                }
                            );

                        }

                    })()
                );
                break;
            default:
                break;

        }

    }


    async.waterfall(
        /*[
            function(next) {
                requirejs_addPopupModule('testDlg',function() {
                    next(null);
                });

            }
        ]*/
        load_proc,
        function(error,results) {
            option.callback();
        }
    );

}

theApp.onAMD_Load();
