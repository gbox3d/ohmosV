/**
 * Created by gbox3d on 2014. 3. 24..
 *
 * 2016.1.8 bootstrap 지원추가
 *
 */
console.log('loading amd loader module');


(function () {

    function ohmOSVCore(option) {

        requirejs.config({
            //By default load any module IDs from js/lib
            baseUrl: option.baseUrl,//'../amdlib/lib',
            paths: {
                app: option.appPath//'../../1.modal/amd/app'
            }
        });


        var scope = this;

        scope.module = {};
        scope.amd = {
            panel : {},
            popup : {},
            card : {}
        };

        scope.amd.setupAMD = function (option) {

            console.log('start amd loader system 1.3')

            function requirejs_addPanelModule(name,callback) {

                requirejs([
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

                    module.setup(name,'panel');

                    scope.amd.panel[name] = module;
                    //scope.module['panel_' + name] = module;

                    console.log(name + ' panel module load success');

                    if(callback) {
                        callback();
                    }


                });

            }

            function requirejs_addPopupModule(name,callback) {

                requirejs([
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

                    module.setup(name,'popup');

                    scope.amd.popup[name] = module;

                    console.log(name + ' popup module load success');

                    if(callback) {
                        callback();
                    }


                });

            }

            function requirejs_addCardModule(name,callback) {

                requirejs([
                    'app/card/'+ name +'/control',
                    'text!app/card/'+ name + '/directive.html',
                    'text!app/card/' + name + '/style.css'
                ], function (module,html,css) {

                    var temp = document.createElement('div');
                    temp.innerHTML = html;
                    document.getElementById('root-container').appendChild(temp.children[0]);

                    var scriptEl = document.createElement('style');
                    scriptEl.innerText = css;
                    document.getElementsByTagName('head')[0].appendChild(scriptEl);

                    module.setup(name,'card');

                    scope.amd.card[name] = module;
                    //scope.module['popup_' + name] = module;

                    console.log(name + ' card module load success');

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
                load_proc,
                function(error,results) {
                    option.callback();
                }
            );

        }

        console.log('complete load amd loader module');

    }

    var evt_OSVLoaded = new Event('OSVLoaded');

    evt_OSVLoaded.ohmOSVCoreModule = ohmOSVCore;
    // evt_OSVLoaded.extra = {
    //     msg : 'ok',
    //     osvcore : ohmOSVCoreModule
    // }
    console.log('dispatch OSVLoaded event');
    document.dispatchEvent(evt_OSVLoaded);

})()




