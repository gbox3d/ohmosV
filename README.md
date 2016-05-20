# ohmosV 1.3
require.js 기반으로 작성된 html5 SPA(Single Page Application) framework입니다.
뷰단위로 나눠서 작업가능하며 html,css,js를 뷰단위로 분리하여 관리 할수있습니다.

어플리캐이션 전역객체의 이름은 theApp로 정해져있습니다


-초기화 코드

```js

requirejs.onError = function (e) {
        console.log(e)
    }
    
document.addEventListener('OSVLoaded', function(evt) {

        theApp.setup(
                new evt.ohmOSVCoreModule(
                {
                    baseUrl : '../../libs/amdlib/lib',
                    appPath : '../../../sample/2.tab/amd/app'
                }

        ));

});
```



-setup 함수 예제

```js
var theApp = {
    version : '0.0.1',
    event : {
        downEvent : "touchstart",
        upEvent : "touchend"
    },
    setup : function(osvCore) {
           
           osvCore.amd.setupAMD({
                modules : [
                            {
                                name : 'testDlg',
                                type : 'popup'
                            }

                        ],
                callback : function() {
                            next();
                 }
            })
    }
}
```

헤더태그부분에 아래 코드를 삽입합니다.

```html
<script data-main="../../libs/amdlib/main" src="../../libs/amdlib/lib/require.js"></script>
```
위의 코드에서 theApp전역객체에 amd 객체를 초기화해준다. 이것이 완료되면 OSVLoaded 이밴트가 발생한다.



