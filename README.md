 ohmosV 1.3
===========

![arduino](https://plus.google.com/u/0/photos/albums/pjepc5j34mda2m6dmj5md7rsmm12irnqu?pid=6287715158709401458&oid=110687673892501970268)

#### JavaScript UI kernel for modern web ####

require.js 기반으로 작성된 html5 SPA(Single Page Application) framework입니다.
뷰단위로 나눠서 작업가능하며 html,css,js를 뷰단위로 분리하여 관리 할수있습니다.

## Useful links

| Resource | Location |
| -------------- | -------------- |
| Require JS       | http://www.requirejs.org/ |
| Node JS          | https://nodejs.org/en/ |

### what's new ###
-1.3 
1.  amd 관련한 lib 파일과 폴더를 공유가능하도록 재구성
2. theApp 으로 어플리캐이션 프레임웍 전역객체를 고정하지않아도 되도록 구성
( OSVLoaded 이밴트에서 프레임웍코어 객체인 ohmOSVCoreModule 를  콜백함수로 넣어 주도록 수정했음)

### Usage ###

-초기화 코드 (index.html 일부분)

```js

requirejs.onError = function (e) {
        console.log(e)
    }
    
document.addEventListener('OSVLoaded', function(evt) {

        theApp.setup(
                new evt.ohmOSVCoreModule(
                {
                    baseUrl : '../../libs/amdlib/lib',
                    appPath : '../../../sample/1.modal/amd/app'
                }

        ));

});
```



-setup 함수 예제 ( app.js 일부분)

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

예제에서는 모듈은 amd->app 폴더에 있습니다.
app/ 하단으로 폴더이름을 만들고자 하는 모듈이름과 같게 명명합니다.
그 안에 control.js,directive.html,style.css 를 만듭니다. 

control.js 의 예 는 아래와 같습니다
```js

define(
    function() {

        //디랙티브와 연결
        var this_dom;

        var property = {
            setup : function(name,type) {
                //이밴트 핸들러는 여기에
                this_dom = document.querySelector("#amd-"+ type +"-" + name);

            },
            show : function(option) {
                //화면 재구성

            },
            hide : function() {
                //화면 종료

            }

        };

        return property;
    }
);
```

directive.html 은 아래와 같습니다.
id 인 amd-yyy-xxx 에서
yyy 는 모듈의 형태에 따라 popup,panel,card 등으로 정합니다
xxx 는 모듈의 이름을 써줍니다.
```html
<div id="amd-yyy-xxx" class="container-fluid hide" >

</div>
```

style.css 에는 amd-yyy-xxx 밑으로 적용하고 싶은 css를 추가 해줍니다. 

## 폴더 구성 예 ##
```txt
root + 
     |- amd +
     |      |- app +
     |             |- panel
     |             |- popup +
     |                      |-testDlg +
     |                                |- control.js
     |                                |- directive.html
     |                                |- style.css
     |- app.js
     |- index.html
```
