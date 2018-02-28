# Шаблон серверного приложения

Шаблон серверного NodeJS приложения.

*Реализовано:*
1. **NodeJS** + **Express** кластер
2. Обработка **ошибок**
3. Настроен **linter**
4. Добавлено окружения для написания **тестов**
5. Добавлен базовый функционал для **логирования**

### 1. NodeJS + Express кластер

### 2. Обработка ошибок

### 3. Linter

В качестве стандарта оформления программного кода используются правила от [Airbnb](https://github.com/airbnb/javascript) ([Airbnb JavaScript в переводе Леонида Лебедева](https://github.com/leonidlebedev/javascript-airbnb))

Для проверки оформления программного кода на соответствие стандарту добавлен механизм:
1. проверка кода отельной командой:

``` bash
$ npm run lint
```

2. автоматическое исправление оформления кода (если это возможно или "Но это не точно!" :) ):

``` bash
$ npm run lint-fix
```

3. проверка перед запуском:

``` bash
$ npm start
```

##### Ссылки

1. Используется _linter_ [ESLint](https://eslint.org/)
2. Правила оформления кода [Airbnb](https://github.com/airbnb/javascript). С руководством на русском языке можно ознакомиться по ссылке [Airbnb JavaScript в переводе Леонида Лебедева](https://github.com/leonidlebedev/javascript-airbnb).
3. npm-пакет, который применяет правила Airbnb в ESLint [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)

### 4. Tests

### 5. Logging