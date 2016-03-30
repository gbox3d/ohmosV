# ohmosV
어플리캐이션 전역객체의 이름은 theApp로 정해져있다

-기본셋업코드
```js
var theApp = {
    version : '0.0.1',
    event : {
        downEvent : "touchstart",
        upEvent : "touchend"
    },
    setup : function() {
           this.amd.setupAMD({
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

document.addEventListener('OSVLoaded', function() {
        theApp.setup()
    });
```
amd 실행환경이 준비되면 OSVLoaded 이밴트가 발생한다.

