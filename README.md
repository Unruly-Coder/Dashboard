#Dashboard



## Requirements

- [node.js]

## Installation
Copy or clone repository, install dependencies, build project and run server

#### Download dependencies

```bash
$ [sudo] npm install
```

#### Build project (compile js, css, copy views)

```bash
$ npm run build
```

#### Run a server

```bash
$ npm start
```

#### Watch .js and .sass files (development mode)

```bash
$ npm run development
```

---

## Development

#### Widgets - FE

Dashboard wouldn't be really useful without widgets. Lucky it is not really hard to create one. We can create our widget by following a simple series of steps.

+ Create a directory for widget files.
+ Create a configuration file.
+ Create a html markup for the widget.
+ Create a controller file for business logic if needed.
+ Create a style file.

**Create a directory for widget files.**

For each new widget we should create a directory in ```client/app/widgets```. There is no restriction to the name of the directory.
It is a good practice if name corresponds somehow to the data that exposes.
For example if our widget will show sale scores, we should name our directory ```'saleScoresWidget'``` :).

**Create a configuration file.**

Configurable options:

+ ```sizex``` - required -
+ ```sizey``` - required -
+ ```template``` - required -
+ ```editTemplate``` - optional -
+ ```color``` - optional -
+ ```dataBind``` - optional -

Example:

```
angular.module('widget')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('buildserver', {
            sizex: 2,
            sizey: 2,
            color: '#63c3b5',
            template: 'buildserver/buildserver.html',
            editTemplate: 'buildserver/buildserverEdit.html',
            dataBind: {
                type: 'internal',
                source: '/api/buildserver'
            }
        });
    });
```


**Create a html markup for the widget.**

**Create a controller file for business logic if needed.**

**Create a style file.**


---

#### Modules - BE

#### Services - BE

[node.js]:http://nodejs.org/

---

Bugs and Features
-----------------

If you found a bug or have a feature request, please create an issue here on GitHub.

https://github.com/Crazy-Ivan/Dashboard/issues


Author
------

**Paweł Bród**

+ https://github.com/Crazy-Ivan
+ http://www.linkedin.com/pub/pawe%C5%82-br%C3%B3d/98/4b6/37/en


License
-------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>