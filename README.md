# 자주쓰는 기능 종합

## Summary

- 자주쓰는 함수들을 매번 구글링하기 귀찮고 특수한 경우에 리팩토링이 필요한 경우가 많았는데 불편해서 모아두기위한 함수덩어리입니다.
- 라이브러리화 시키기에는 특정 기능만 써야하는경우도 있고 특정 데이터만 써야하는경우도 있는데다가 코드검증하기도 귀찮아서 검증된 코드들을 모아서합니다.
- 혹시라도 가져다가 사용하실떄는 서비스에 맞는지 한번더 고민해보고 체크해보고 그다음에 사용하시길 바랍니다.
- 잘하는 사람이 아니기 때문에 코드에 오류가 있을수도 있고 비효율적인 부분도 있을수 있습니다. 의견은 언제나 환영입니다.

## Validate (/javascript/validate.js)

- 유효성관련 데이터를 모아놓은 함수
- 유효성검사 추가 2025.04.10
- 유효성검사 추가, 함수명 컨벤션 시작 및 파일명변경 (Validation -> Validate)로 변경 2025.07.24

## Progress

- 전처리 또는 후처리에 필요한 함수
- Timezone 포함한 UTC추가 2025.04.10

## Event

- 이벤트 액션 관리 처리 함수

## Static Data

- 자주 사용할수도 있는 데이터들 모음집
- country 추가 2024.02.10
- phone_info 추가 2025.04.10

### .vscode

```
{
  "javascript.updateImportsOnFileMove.enabled": "always",
  "explorer.confirmDragAndDrop": true,
  "prettier.singleQuote": true,
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "editor.formatOnSave": true,
  "window.zoomLevel": 0.5,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}

```
