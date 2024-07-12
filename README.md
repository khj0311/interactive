<div align="center">

![header](https://capsule-render.vercel.app/api?type=waving&height=200&color=ffc72c&section=header&text=Interactive&fontSize=60&fontColor=323235)

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=Tech%20Stack&fontSize=24&fontColor=323235)

#### Platform & Languages

<img src="https://img.shields.io/badge/html5-e34f26?style=flat&logo=html5&logoColor=white" style="height:30px"/>
<img src="https://img.shields.io/badge/ejs-b4ca65?style=flat&logo=ejs&logoColor=white" style="height:30px"/>
<img src="https://img.shields.io/badge/css3-1572b6?style=flat&logo=css3&logoColor=white" style="height:30px"/>
<img src="https://img.shields.io/badge/sass-cc6699?style=flat&logo=sass&logoColor=white" style="height:30px"/>
<img src="https://img.shields.io/badge/javascript-f7df1e?style=flat&logo=javascript&logoColor=white" style="height:30px"/>
<img src="https://img.shields.io/badge/json-000000?style=flat&logo=json&logoColor=white" style="height:30px"/>

#### Tools

<img src="https://img.shields.io/badge/gitlab-fc6d26?style=flat&logo=gitlab&logoColor=white" style="height:30px"/>
<img src="https://img.shields.io/badge/node.js-5fa04e?style=flat&logo=node.js&logoColor=white" style="height:30px"/>
<img src="https://img.shields.io/badge/npm-cb3837?style=flat&logo=npm&logoColor=white" style="height:30px"/>
<img src="https://img.shields.io/badge/gulp-cf4647?style=flat&logo=gulp&logoColor=white" style="height:30px"/>

</div>

<br />
<br />

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=Gulp&fontSize=24&fontColor=323235)

### Gulp 명령어

#### gulp

- build, Watch / server
- clean, build 이후 수정파일 감지 및 서버 실행
- watch : 신규 파일은 public 폴더에 실시간으로 반영되지만, 삭제된 파일은 public에서 삭제되지 않음
  => gulp 재실행 또는 gulp build 필요

#### gulp build

- build (./src => ./dist)
- FTP 업로드 전 모든 파일 build

<br />

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=신규%20페이지%20생성&fontSize=24&fontColor=323235)

1. pages 내 카테고리 구분
   현재 카테고리는 Home, Components, Interactions로 구분되어 있으며, 컴포넌트의 성향에 맞는 카테고리 폴더 안에 페이지 폴더를 생성한다.
   ex ) ./src/pages/components/[페이지 이름]
   <br />
2. 파일 구조
   페이지 폴더 내 index.ejs, main.js, main.scss가 기본 세팅파일이며,
   /pageName
   ㄴ index.ejs
   ㄴ main.js
   ㄴ main.scss
   페이지 내 Case가 다수 존재할 경우,
   /pageName
   ㄴ pageCase01
   &nbsp;&nbsp;ㄴ index.ejs
   &nbsp;&nbsp;ㄴ main.js
   &nbsp;&nbsp;ㄴ main.scss
   ㄴ pageCase02
   ㄴ pageCase03
   ㄴ pageCaseN...
   ㄴ index.ejs // case ejs 집합
   <br />
3. contents.json
   ./src/json/contents.json
   ejs 템플릿으로 전환 이후 html 내 title, headline, description, image src, alt 등의 정보는 모두 contents.json에서 관리
   {
   &nbsp;&nbsp;"name": "Tab Basic",&nbsp;&nbsp;// 페이지 타이틀 (필수)
   &nbsp;&nbsp;"id": "tab-01",&nbsp;&nbsp;// 폴더명 (필수)
   &nbsp;&nbsp;"goals": ["클릭한 탭 리스트의 컨텐츠 노출", "init 시 첫번째 탭 <mark>active</mark> 클래스 추가"],&nbsp;&nbsp;// 개발 목표 (선택)
   &nbsp;&nbsp;"refUrl": "https://www.samsung.com/global/galaxy/galaxy-watch4/#bp-ecg",&nbsp;&nbsp;// 참고 URL (선택)
   }

- 위 json 데이터 table 뷰로 바꿔야함 여기까지... 일단.. 미안합니다 Zoey
  <br />

---

## Style

### mediaQuery & vw-conversion Mixin

** 현재 tablet, mobile 분기만 사용 **

- ./src/common/scss/mixins/\_conversion.scss 참고

1. desktop
   - query: @media (min-width: 1440px)
2. tablet
   - query: @media (min-width: 768px) and (max-width: 1439px)
   - viewport: 1440px 이상 고정값 (px) / viewport: 768px ~ 1440px (vw)
   - mixin (px 단위 없이 작성): @include vw-pc(property, px)
3. mobile
   - query: @media (max-width: 787px)
   - viewport: 767px 이하 (vw)
   - mixin (px 단위 없이 작성): @include vw-mo(property, px)

#### Snippets - vw-conversion

```
{
	"vw-pc": {
		"scope": "scss",
		"prefix": "@pc",
		"body": [
			"@include vw-pc($1, $2);",
		],
		"description": "vw-pc"
	},
	"vw-mo": {
		"scope": "scss",
		"prefix": "@mo",
		"body": [
			"@include vw-mo($1, $2);",
		],
		"description": "vw-mo"
	}
}
```
