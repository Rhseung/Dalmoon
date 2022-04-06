# Command Handler Docs

채팅 명령어 구조를 더욱 쉽게 만들어줍니다.
알림 기반 카카오톡 봇에서 사용 가능한 모듈입니다. (API2 전용)

기본 코드는 다음과 같습니다.

```js
const bot = BotManager.getCurrentBot();
var { Container, Message } = require('CommandHandler');

// 명령어 컨테이너를 지정합니다.
var container = new Container();
// 메시지 클래스 지정, 명령어 접두사 ('/') 지정
var message = new Message().setPrefix('/');

// 문자가 오면
bot.on(Event.MESSAGE, (msg) => {
    message.build(msg); // 메시지 불러오기
    container.execute(message); // 명령어 실행하기
});

// 명령어 함수
function 명령어이름 () {
    // 명령어 코드
}
container.register(명령어이름); // 명령어 등록
```  

---
# Message class
```js
// 기본 코드

var { Message } = require("CommandHandler")
var message = new Message();
```
### Methods
- [build](#build)
- [setPrefix](#setPrefix)


## build
```js
Message.build(msg)
```
`msg` 를 가공합니다.  

Parameter | Type
---|---
`msg` | `Message`(CommandHandler의 Message가 아닌 API2의 Message)

## setPrefix
```js
Message.setPrefix(prefix)
```
명령어 접두사로 활용될 `prefix` 를 지정합니다.

Parameter | Type
---|---
`prefix` | `String`

---

# Container class
```js
// 기본 코드

var { Container } = require("CommandHandler")
var container = new Container();
```
### Methods
- [register](#register)
- [execute](#execute)


## register
```js
Container.register(command, ...types)
```
`command` 를 container에 등록합니다. `...types` 로 각각의 인자 타입을 지정해줄 수 있습니다. 또한 return한 값의 타입은 `Command` 입니다.

Parameter | Type
---|---
`command` | `Function`
`...types` | `Class[]`

## execute
```js
Container.execute(message)
```
`message` 을 이용해 등록되었던 명령어들을 실행합니다.  

Parameter | Type
---|---
`message` | `Message`

---

# Command class
### Methods
- [aliase](#aliase)
- [option](#option)


## aliase
```js
Container.register(command, ...).aliase(aliase)
```
`command` 명령어의 이름을 대신해줄 `aliase`를 지정합니다.

Parameter | Type
---|---
`aliase` | `String`

## option
```js
Container.register(command, ...).option(config)
```
`command` 명령어의 속성을 지정합니다.

Property | Type | Description
---|---|---
`many` | `Boolean` | `command` 명령어의 가변인자 허용 유무를 결정합니다.

Parameter | Type
---|---
`config` | `Object`

#### example
```js
function command(...) {
    ...
}
Container.register(command, ...).option({ many: true });
```