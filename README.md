#Dashboard

Futures:
--------

## Requirements

- [node.js]

[node.js]:http://nodejs.org/

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
For example if our widget will show sale scores, we should name our directory ```saleScoresWidget``` :).

**Create a configuration file.**

To inject our widget into the dashboard application we need to create a configuration file. Name of this file is not important, however it would be nice if will be the same as directory.

Configurable options:

| key                | type    | required | description
| ------------------ | ------- | -------- | -----------
| ```sizex```        | integer | true     | The width of the widget in units
| ```sizey```        | integer | true     | The height of the widget in units
| ```template```     | string  | true     | The path to the front side template of widget
| ```editTemplate``` | integer | false    | The path to the back side template of widget. If not provided, the widget will have only one side.
| ```color```        | string  | false    | The color of the widget.
| ```dataBind```     | object  | false    | The data binding configuration.

Data binding:

| key                | type    | required    | description
| ------------------ | ------- | ----------- | -----------
| ```type```         | string  | true        | As for now there are available two types of data binding. We could choose between 'internal' and 'external'.
| ```source```       | string  | true        | The url to json data (if 'type' equals to 'external') or path to an internal data channel (if 'type' equals to 'internal')
| ```interval```     | integer | true/false  | **required** only if ```type``` equals to ```external``` - The time interval (in milliseconds) after which data from an external server will be refreshed

Data type explanation:

[TODO]

Example:

```JavaScript
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

The next step is creating a template file. The name of the file should corresponds to the name in the config file.
Each widget inherits his object model, which is connected to the ```$scope.widget```.

Widget model:

```JavaScript
widget: {
    data: {}, // this object contains data from external or internal source
    options: {  //widget definition data
        sizex: 2,
        sizey: 2,
        color: '#63c3b5',
        template: 'buildserver/buildserver.html',
        editTemplate: 'buildserver/buildserverEdit.html',
        dataBind: {
            type: 'internal',
            source: '/api/buildserver'
        }
    },
    getData: function(){} //perform a asynchronous http request to the data source. Return a promise.
    flip: function(){} //flip tile
    bindDataSource: function(){} //binds data
    unbindDataSource: function(){} //unbinds data
}
```


Template example:

```
<div class="foosball-table">
    <p class="state" ng-class="{occupied: widget.data.isOccupied}">
        <span ng-show="widget.data.isOccupied">occupied</span>
        <span ng-hide="widget.data.isOccupied">available</span>
    </p>
    <div class="small-points">
        {{ widget.data.game.teamOne.smallPoints }} : {{ widget.data.game.teamTwo.smallPoints }}
    </div>
    <div class="big-points">
        <p class="pull-left"> {{widget.data.game.teamOne.bigPoints}}</p>
        <p class="pull-right"> {{widget.data.game.teamTwo.bigPoints}}</p>
    </div>
    <p class="footer">FOOSBALL TABLE</p>
</div>
```

**Create a controller file for business logic if needed.**

**Create a style file.**


---

#### Modules - BE
[TODO]
#### Services - BE
[TODO]

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