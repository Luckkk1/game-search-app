***게임에 대한 다양한 정보를 얻고 원하는 게임을 자신의 라이브러리에 추가할 수 있는 웹사이트***

구성원 : 개인

[기술적인 부분]

1. ```Router```를 이용한 SPA 구현
Router를 구현하면서 SPA의 단점을 보완하기 위하여 ```LazyLoading```을 통한 최적화와 사용자가 로그인 상태일때에만 접근 가능한 ```Private Route```를 설정하였습니다. 또한 Router는 최신버전의 ```ver 6```를 사용하였습니다.


2. ```Firebase``` 활용
댓글이나 사용자가 추가한 게임들을 Firebase DB에 각각 저장하여 필요할 때 호출하여 사용하였습니다. 또한 ```Firebase의 Auth API```를 활용하여 인증토큰 형식으로 로그인 로그아웃기능을 구현하였습니다. 로그인에 성공하면 반환받은 토큰을 로컬저장소에 저장하여 로그인 상태를 관리했습니다. 동시에 토큰의 만료시간도 같이 저장하여 그 시간이 도달할 경우 ```자동으로 로그아웃``` 되도록 하였습니다.


3. ```외부 API``` 활용
기본적으로 외부에서 제공받은 게임 API를 활용하였습니다. 게임서치 웹페이지 특성 상 이미지가 많이 등장하는데 이미지의 로드시간을 줄이기 위하여 외부 CDN을 활용하여 api로 받아온 이미지일지라도 리사이징 되도록 하였습니다. 또한 사용자의 IP를 기반으로 현재 국가를 탐색하는 API를 활용하여 회원가입 시 국가선택이 자동으로 이루어지도록 설정하였습니다. API가 값을 불러오지 못한다면 수동으로 선택할 수 있도록 드롭다운 메뉴가 표시되도록 하였습니다.


4. ```Redux tool kit```의 활용
리덕스 툴킷을 이용하여 전역적으로 로그인 상태를 관리하였습니다.


5. 반복적인 작업을 피하고자 하였습니다.
```useHttp 커스텀훅```을 이용하여 간단히 api요청을 주고받을 수 있었습니다. 그리고 이 훅은 로딩, 에러, fetch함수를 리턴하는데 이를 통하여 ```로딩, 에러와 같은 사이드 스테이트를 대비```하였습니다. 또한 게임 카드와 게임 리스트 컴포넌트를 반복적으로 사용함으로써 불필요한 코드를 줄였습니다.


6. 로그인, 회원가입 시 필요한 ```form의 유효성검사```를 추가하였습니다.
각 항목은 모두 유효성검사가 완료되어 Form이 유효한 상태가 되어야만 제출이 되도록 설정하였습니다.


7. ```반응형``` 웹사이트
어느 화면에서나 컨텐츠를 제대로 볼 수 있도록 반응형으로 제작하였습니다.


[기능적인 부분]

1. ```게임라이브러리``` 추가기능
로그인을 하면 게임카드에 +버튼이 활성화됩니다. 버튼을 클릭하면 v가 표시되면서 자신의 라이브러리로 게임이 추가됩니다. 반대로 한번더 클릭하면 라이브러리에서 삭제 됩니다. 라이브러리는 프로필에서 확인이 가능합니다.


2. ```리뷰댓글``` 기능
게임 디테일 마다 리뷰댓글을 적을 수 있습니다. 각각은 독립적이며 제출 즉시 업데이트되어 화면에 출력됩니다. 또한 자신이 설정한 닉네임과 작성한 시간이 댓글에 표시됩니다.


3. ```게임탐색``` 기능
인기게임, 최신게임, 장르별 게임으로 탐색이 가능합니다. 장르는 다양하며 각각 모두 다른 게임이 출력됩니다.


4. ```MetaScore```확인 기능
각각의 게임 카드마다 점수가 나와있으며 해당 점수에 따라 그 점수의 배경색이 달라집니다. 평가가 좋은 게임일 수록 점수는 높아집니다.


[미완성 기능]
소개,게시판,비밀번호변경,닉네임변경,검색기능

꾸준히 이 프로젝트를 발전시켜나가고 있습니다!
