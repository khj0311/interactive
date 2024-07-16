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
<br />

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=Setting%20및%20Gulp&fontSize=24&fontColor=323235)

### 1. 최초 실행

- repository: http://121.252.183.25:8060/MTG/interactive-new.git
- node-v: v20.11.1
- npm-v: 10.2.4

```
npm i
```

<br />

### 2. Gulp

- gulp-v: "^4.0.2"
- server: [localhost:7777](http://localhost:7777)
- 명령어
  - `gulp`
    - build, Watch / server
    - clean, build 이후 수정파일 감지 및 서버 실행
    - watch : 신규 파일은 public 폴더에 실시간으로 반영되지만, 삭제된 파일은 public에서 삭제되지 않음  
      => gulp 재실행 또는 gulp build 필요
  - `gulp build`
    - build (./src => ./public)
    - FTP 업로드 전 모든 파일 build

### 3. Prettierrc

```json
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 180,
  "bracketSpacing": true,
  "bracketSameLine": false
}
```

### 4. settings.json

```json
{
  "emmet.includeLanguages": {
    "ejs": "html"
  },
  "[html]": {
    "editor.defaultFormatter": "j69.ejs-beautify"
  }
}
```

<br />
<br />
<br />
<br />
<br />

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=Structure&fontSize=24&fontColor=323235)

### 1. 기본 구조

```json
📦interactive-new
 ┣ 📂assets // font, image 등 asset
 ┣ 📂public // output (src 폴더 구조에따라 자동으로 생성)
 ┣ 📂src // input
```

### 2. src (input)

```json
 ┣ 📂src
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂js // 공통 js
 ┃ ┃ ┃ ┣ 📂vendor // library, plug-in 등
 ┃ ┃ ┃ ┗ 📜99.common.js
 ┃ ┃ ┗ 📂scss // 공통 scss
 ┃ ┃ ┃ ┣ 📂abstracts
 ┃ ┃ ┃ ┣ 📂mixins
 ┃ ┃ ┃ ┗ 📜common.scss
 ┃ ┣ 📂json
 ┃ ┃ ┣ 📜config.json // 공통으로 사용하는 변수
 ┃ ┃ ┗ 📜contents.json // 전체 페이지의 컨턴츠 요소 (title, imgsrc, alt 등)
 ┃ ┣ 📂layout // 프로젝트 공통 layout 요소 (sidebar 등)
 ┃ ┃ ┣ 📂interface
 ┃ ┃ ┃ ┣ 📜index.ejs
 ┃ ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┃ ┗ 📜main.scss
 ┃ ┃ ┗ 📂overview
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂component-name // 컴포넌트 폴더
 ┃ ┃ ┃ ┃ ┣ 📂component-name-01 // 컴포넌트 개별 컨텐츠 ejs, js, scss
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ejs
 ┃ ┃ ┃ ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┃ ┃ ┃ ┗ 📜main.scss
 ┃ ┃ ┃ ┃ ┣ 📂component-name-02
 ┃ ┃ ┃ ┃ ┗ 📜index.ejs // 동일 컴포넌트 내 전체 컨텐츠 ejs
 ┃ ┃ ┃ ┣ 📂component-name02
 ┃ ┃ ┃ ┣ 📂component-name03
 ┃ ┃ ┗ 📂interactions
 ┃ ┃ ┃ ┣ 📂component-name
 ┃ ┃ ┃ ┣ 📂component-name02
 ┃ ┗ 📜app.ejs // 컴포넌트 템플릿
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜README.md
 ┣ 📜gulpfile.js
```

### 3. public (output)

```json
📂public
 ┃ ┣ 📂common // 공통 css, js
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┗ 📜common.css
 ┃ ┃ ┗ 📂js
 ┃ ┃ ┃ ┗ 📜common.js
 ┃ ┣ 📂components // .src/pages/components
 ┃ ┃ ┣ 📂component-name
 ┃ ┃ ┃ ┣ 📂component-name-01
 ┃ ┃ ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┃ ┃ ┣ 📜main.css
 ┃ ┃ ┃ ┃ ┗ 📜main.js
 ┃ ┃ ┃ ┣ 📂component-name-02
 ┃ ┃ ┃ ┗ 📜index.html
 ┃ ┃ ┣ 📂component-name02
 ┃ ┃ ┣ 📂component-name03
 ┃ ┗ 📂interactions // .src/pages/interactions
 ┃ ┃ ┣ 📂component-name
 ┗ ┗ ┗ 📂component-name02
```

<br />
<br />
<br />
<br />
<br />

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=신규%20페이지%20생성&fontSize=24&fontColor=323235)

### 1. pages 내 카테고리 구분

- 현재 카테고리는 Home, Components, Interactions로 구분되어 있으며, 컴포넌트의 성향에 맞는 카테고리 폴더 안에 페이지 폴더를 생성한다.  
  ex ) ./src/pages/components/[페이지 이름]
  ```json
   📦 src
     ┃ ┣ 📂 pages
     ┃ ┃ ┣ 📂 components // (Tab, Accordion 등 기능이 있는 컴포넌트)
     ┃ ┃ ┗ 📂 interactions // (애니메이션이 포함된 컴포넌트)
  ```

### 2. 파일 구조

- 페이지 폴더 내 index.ejs, main.js, main.scss가 기본 세팅파일

  ```json
     📂 pageName
     ┣ 📂 pageCase01
     ┃ ┣ 📜 index.ejs
     ┃ ┣ 📜 main.js
     ┃ ┗ 📜 main.scss
  ```

- 페이지 내 Case가 다수 존재할 경우
  ```json
  📂 pageName
  ┣ 📂 pageCase01
  ┃ ┣ 📜 index.ejs
  ┃ ┣ 📜 main.js
  ┃ ┗ 📜 main.scss
  ┣ 📂 pageCase02
  ┣ 📂 pageCase03
  ┣ 📂 pageCaseN
  ┣ 📂 index.ejs // (case ejs 집합)
  ```

### 3. contents.json

- ./src/json/contents.json
  ejs 템플릿으로 전환 이후 html 내 title, headline, description, image src, alt 등의 정보는 모두 `contents.json`에서 관리

```json
{
  "name": "Tab Basic", // 페이지 타이틀 (필수)
  "id": "tab-01", // 폴더명 (필수)
  "goals": ["클릭한 탭 리스트의 컨텐츠 노출", "init 시 첫번째 탭 <mark>active</mark> 클래스 추가"], // 개발 목표 (선택)
  "refUrl": "https://www.samsung.com/global/galaxy/galaxy-watch4/#bp-ecg" // 참고 URL (선택)
}
```

- 위 json 데이터 table 뷰로 바꿔야함 여기까지... 일단.. 미안합니다 Zoey
- 이게 맞는지 모르겠지만...쭉 작성을 해보겠습니다... - 조이 드림-

<br />
<br />
<br />
<br />
<br />

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=Mark-up&fontSize=24&fontColor=323235)

### 1. Convention

- EJS 사용( `EJS language support`, `ejs Snippets` 확장프로그램 사용 권장)
  - config : config.json 내 데이터 변수 (blankSrc 등)
  - data : contents.json 내 데이터 변수 (title, headline, description, image src, alt 등)
- BEM 클래스 명명 규칙 사용 (https://getbem.com/introduction/)
  - Block: - (공백은 '-')
  - Element: \_\_ (Dash)
  - Modifier: -- (Underscore)
  - Prefix : `mtg-comp...? component-name?` (....이제 없나요..!?)
  - 작성 예시
  ```html
  <!-- Component Area -->
  <!-- 공통 레이아웃 -->
  <div class="component">
    <!-- 컴포넌트 이름 -->
    <div class="accordion accordion--basic">
      <!-- .component-name(필수) .component-name--option(필수) -->
      <div class="accordion-headline">...</div>
      <div class="accordion-description">...</div>
    </div>
  </div>
  ```
- asset 경로
  - 공통으로 사용하는 이미지: ./asset/images/
  - 컴포넌트 내에서 사용되는 이미지: ./asset/images/{component-name}/
- asset명
  - 공통으로 사용하는 이미지: file-name.jpg
  - 컴포넌트 내에서 사용되는 이미지: {component-name}-file-name.jpg

<br />
<br />
<br />
<br />
<br />

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=Style&fontSize=24&fontColor=323235)

### 1. Scss Template

```scss
.component .component-name {
  :is(&--option) {
    // component option
    // style 작성
  }
}

@include desktop {
  .component .component-name {
    :is(&--option) {
      // style 작성
    }
  }
}

@include mobile {
  .component .component-name {
    :is(&--option) {
      // style 작성
    }
  }
}
```

### 2. mediaQuery & vw-conversion Mixin

- **현재 tablet, mobile 분기만 사용** (`./src/common/scss/mixins/_conversion.scss` 참고)

1.  desktop
    - query: @media (min-width: 1440px)
2.  tablet
    - query: @media (min-width: 768px) and (max-width: 1439px)
    - viewport: 1440px 이상 고정값 (px) / viewport: 768px ~ 1440px (vw)
    - mixin (px 단위 없이 작성): `@include vw-pc(property, px)`
3.  mobile

    - query: @media (max-width: 787px)
    - viewport: 767px 이하 (vw)
    - mixin (px 단위 없이 작성): `@include vw-mo(property, px)`

4.  Snippets - vw-conversion
    ```json
    {
      "vw-pc": {
        "scope": "scss",
        "prefix": "@pc",
        "body": ["@include vw-pc($1, $2);"],
        "description": "vw-pc"
      },
      "vw-mo": {
        "scope": "scss",
        "prefix": "@mo",
        "body": ["@include vw-mo($1, $2);"],
        "description": "vw-mo"
      }
    }
    ```

<br />
<br />
<br />
<br />
<br />

![header](https://capsule-render.vercel.app/api?type=soft&height=50&color=ffd55f&section=header&text=JS&fontSize=24&fontColor=323235)

### 1. JS Template

```js
(function () {
  // 이벤트 선언부
  class Componennt {
    constructor(section, opts) {
      this.opts = {
        ...opts, // 컴포넌트의 옵션 값
      };
      this.selector = {
        section,
        componennt: '.componennt', // 컴포넌트에서 사용되는 selector
      };
      this.class = {
        featureHide: 'is-feature-hide', // 컴포넌트에서 사용되는 class
      };
      this.el = {
        section: document.querySelector(this.selector.section) || null,
        componennt: null, // 컴포넌트에서 사용되는 elements
      };
      this.events = {
        ex: this.ex.bind(this), // 컴포넌트에서 사용되는 events
      };
      this.init(); // 컴포넌트 init
    }
    init() {
      // init 시점 실행 function
      if (this.el.section === null || this.el.section.classList.contains(this.class.featureHide)) return;

      this.setElements();
      this.attachEvents();
    }
    setElements() {
      this.el.componennt = this.el.section.querySelector(this.selector.componennt);
    }
    attachEvents() {
      window.addEventListener('load', this.events.ex());
    }
  }

  // 이벤트 호출부
  document.addEventListener('DOMContentLoaded', () => {
    new Componennt('.componennt.componennt--option');
  });
})();
```
