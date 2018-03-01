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

В качестве стандарта оформления программного кода используются правила от [Airbnb](https://github.com/airbnb/javascript) ([Airbnb JavaScript в переводе Леонида Лебедева](https://github.com/leonidlebedev/javascript-airbnb)).
Кроме указанных выше правил применяются [правила ESLint](https://eslint.org/docs/rules/).

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
2. Правила оформления кода [Airbnb](https://github.com/airbnb/javascript) и [правила ESLint](https://eslint.org/docs/rules/). С руководством **Airbnb** на русском языке можно ознакомиться по ссылке [Airbnb JavaScript в переводе Леонида Лебедева](https://github.com/leonidlebedev/javascript-airbnb). 
3. *npm*-пакет, который применяет правила **Airbnb** в **ESLint** [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)

### 4. Tests

### 5. Logging

Для логирования используется *обертка* модуля **winston** [ссылка](https://github.com/winstonjs/winston).
Обертка определена в модуле проекта `server/utils/log`. 

Добавлены три *транспорта*:
1. **Консоль** - ввыодит сообщения в стандартный поток вывода
2. **Файл** - выводит сообщения в файл (по умолчанию `server/server.log`)
3. **MongoDB** - выводит сообщения в базу данных _MongoDB_ (по умолчанию в `mongodb://localhost:27017/log`, коллекцию `logs`)

Настройки логирования (путь к файлу, строка подключения, имя коллекции) задаются в файле `server/config/configs/log.config.js` или при помощи переменных окружения, которые описаны в соответствующем [разделе](#переменные-окружения)

Модуль `log` определен как глобальный, поэтому он доступен в любом файле серверного приложения. Подключение модуля командой `require` необязательно.

Примеры использования: 

``` javascript
log.info('log message'); 
// > "2018.02.28 11:51:54.411 - info: log message"
log.info('log message', 'with additional params'); 
// > "2018.02.28 11:51:03.093 - info: log message with additional params"
log.info('info message', { author: 'Ni40lay' }); 
// > "2018.02.28 11:48:05.834 - info: info message author=Ni40lay"
log.info('info message', { author: 'Ni40lay' }, { a: 10 }); 
// > "2018.02.28 11:58:51.063 - info: info message { author: 'Ni40lay' } a=10"
log.warn('warning message'); 
// > "2018.02.28 11:52:34.454 - warn: warning message"
log.error('error message'); 
// > "2018.02.28 11:54:16.954 - error: error message"
```

В качестве второго (и последующих) параметра в методы вывода сообщений кроме строк можно передавать и объекты.

Характерным примером выступает случай логирования ошибок:

``` javascript
const error = new Error('Some error');
log.error('error message', error);
```

Вывод в консоль будет похожим на:

``` bash
2018.02.28 11:54:16.946 - error: error message Error: some error
    at Object.<anonymous> (/home/igor/Projects/ERI/blank-server/server/index.js:3:28)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:390:7)
    at startup (bootstrap_node.js:150:9)
    at bootstrap_node.js:505:3
```

# Переменные окружения

### Сервер
Используются в `server/config/configs.server.config.js`
- **SERVER_HOST** - хост серверного приложения (по умолчанию `'127.0.0.1'`)
- **SERVER_PORT** - порт, на котором запускается серверное приложение (по умолчанию `3000`)

### Логирование
Используются в `server/config/configs.log.config.js`
- **MONGO_LOG_CONNECTION_STRING** - строка подключения к базе данных MongoDB, в которой планируется сохранять записи лога (по умолчанию `'mongodb://localhost:27017/log'`). Переменная используется транспортом `MongoDBTransport` модуля `log`.
- **MONGO_LOG_COLLECTION_NAME** - имя коллекции, хранящей записи лога (по умолчанию `logs`). Переменная используется транспортом `MongoDBTransport` модуля `log`.
- **FILE_LOG_PATH** - абсолютный путь к файлу хранения записей лога (по умолчанию `<path to the project>/server/server.log`). Переменная используется транспортом `FileTransport` модуля `log`.