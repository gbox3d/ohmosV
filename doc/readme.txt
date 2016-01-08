종속성 단계

(popup) < card < tab < page

-page
페이지(page)는 종속성의 마지막 단계이다. 즉 모든 종속에서 독립적이지 않다.
페이지끼리 서로 종속적으로 엮일수있다. 한페이내에서 여러개의 다른 페이지값을 참조하고 멤버 함수나 메쎄지등을 사용할수 있다.
페이지 관리자가 그역활을 한다.
여기서 페이지의 개념은 SPA상에서 논리적인 구분이다. 웹페이지 단위와는 다르다.
웹페이지는 어플단위와같다.

-popup
팝업은 모든 종속에서 독립적이며 베타적이다. 자신에 대해서만 알면된다.
팝업은 유아이 기본 시스템이다. 운영체제구현에서 커널과 같은 위치를 가진다.

-card
카드는 페이지의 내부를 실제로 구현하는 오브잭트이다. 탭바등을 통해서 여러개의 카드가 가능하다.

-tab
여러개의 카드를 관리하는 덱역활을 한다. 실제 구현은 탭이없는 기본 페이지와 탭이있는 페이지 형태로 형식을 구분해서 구현되었다.
탭이있다는 것은 페이지상에서 관리해야할카드가 2개이상이라는 의미이다.

-page manager

mk.pageManger

setup 함수로 초기화 하는데 인자로 시작페이지와 페이지정보들이 담겨있는 리스트를 넘겨준다.

함수인자:
startPage : 시작페이지
pages : 관리될 페이지 리스트

주요멤버함수
mk.pageManger.changePage(페이지 이름) : 페이지바꾸기
mk.pageManger.backPage() : 이전 페이지로 돌아가기

예>
//메인 페이지로 시작하기
                        mk.pageManager.setup({
                            startPage : "mainPage", //시작페이지 지정
                            pages : {
                                //페이지들 선언
                                mainPage: mk.createPage({
                                    dom: document.getElementById('page-main'),
                                    card: theApp.amd.card.hello,
                                    setup: function () {

                                        //페이지영역(헤더,푸터)에 대한 이밴트 핸들링을 해준다.

                                        console.log('first page setup');

                                        //다음페이지로가기
                                        this.dom.querySelector('.next-btn').addEventListener(theApp.event.downEvent,function() {

                                            mk.pageManager.changePage("secondPage");

                                        });

                                    }
                                }),
                                secondPage: mk.createPage({
                                    dom: document.getElementById('page-second'),
                                    card: theApp.amd.card.test,
                                    setup: function () {

                                        console.log('second page setup');

                                        //메인페이지로 가기
                                        this.dom.querySelector('.back-btn').addEventListener(theApp.event.downEvent,function() {

                                            mk.pageManager.changePage("mainPage");

                                        });
                                    }
                                })
                            }
                        });
-page

함수인자:
dom : 페이지의 dom을 지정한다
card : 페이지의 내용을 체울 카드 객체를 지정한다.
setup : 페이지가 초기화 할때 콜백된다. 여기에 이밴트 핸들러 등의 처리를 해준다.


-단가책정방침

페이지는 재작비 산정시 중요한 과표가 된다. 기본 3페이지 200만원선 이먀  1페이지당 추가시 50만원선으로 책정한다.
페이지레이아웃의 구현복잡도에 따라 비용은 달라진다.

페이지에 들어가는 카드와탭에 따라 비용은 달라질수있다. 탭이 들어가면 다시 100만원이 추가된다. 1탭추가시 50만원추가한다.

