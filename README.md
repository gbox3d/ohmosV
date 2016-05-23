 ohmosV 1.3
===========


#### JavaScript UI kernel for modern web ####

require.js 기반으로 작성된 html5 SPA(Single Page Application) framework입니다.
뷰단위로 나눠서 작업가능하며 html,css,js를 뷰단위로 분리하여 관리 할수있습니다.

## Useful links

| Resource | Location |
| -------------- | -------------- |
| Require JS       | [http://www.requirejs.org/) |
| Node JS          | [https://nodejs.org/en/) |

### what's new ###
-1.3 
1.  amd 관련한 lib 파일과 폴더를 공유가능하도록 재구성
2. theApp 으로 어플리캐이션 프레임웍 전역객체를 고정하지않아도 되도록 구성
( OSVLoaded 이밴트에서 프레임웍코어 객체인 ohmOSVCoreModule 를  콜백함수로 넣어 주도록 수정했음)

### Usage ###

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



