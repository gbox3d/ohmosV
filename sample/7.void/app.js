/**
 * Created by gbox3d on 2014. 2. 26..
 */



var theApp = {
    version : '1.0.0',
    setup : function(osvCore) {
        this.osvCore = osvCore;
        var scope = this;

        async.waterfall(
            [
                function(next) {
                    
                    requirejs(
                        ['app/void/test/control'],
                        function (module) {
                            console.log(module)
                            console.log('test module load complete!')
                            scope.osvCore.module.test = module;
                            //module.test('hello amd!')

                            next();
                        }
                    );
                    

                }
            ],
            function(error,results) {
                if(error) {
                    console.log(error);
                }
                else {
                    scope.osvCore.module.test.hello()
                    console.log('success')
                }

            }
        );

    }
};

