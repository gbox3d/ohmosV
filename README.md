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

헤더태그부분에 아래 코드를 삽인한다.

```html
<script data-main="amd/main" src="amd/lib/require.js"></script>
```
위의 코드에서 theApp전역객체에 amd 객체를 초기화해준다. 이것이 완료되면 OSVLoaded 이밴트가 발생한다.



