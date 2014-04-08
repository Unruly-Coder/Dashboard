module.exports = function setup(options, imports, register) {

    var data, _,  dataService, servicehub;

    dataService = imports.data;
    servicehub  = imports.servicehub;
    _ = require('underscore');

    function parseJson(jsonString) {
        var  name, surname, account, birthday, data, newData, canAdd, office;

        data = JSON.parse(jsonString);
        newData = [];

        _.each(data, function(item) {
            canAdd = false;
            _.each(item, function(property) {

                switch(property.Key) {
                    case "makingwavesemployeebirthdate":
                        canAdd = true;
                        birthday = new Date(parseInt(/^\/Date\((.+)\+0\d00\)\//.exec(property.Value)[1],10));
                        break;
                    case "givenname":
                        name = property.Value;
                        break;
                    case "sn":
                        surname = property.Value;
                        break;
                    case "samaccountname":
                        account = property.Value;
                        break;
                    case "co":
                        office =  property.Value;
                        break;
                }
            });

            if(canAdd) {
                newData.push({
                    name: name,
                    surname: surname,
                    account: account,
                    birthday: birthday,
                    office: office
                });
            }
        });

        return newData
    }

    function getBirthdayPeople(data) {
        var birthdayPeople = [],
            today = new Date();

        _.each(data, function(item) {
            if(item.birthday.getDate() === today.getDate() && item.birthday.getMonth() === today.getMonth()) {
                birthdayPeople.push(item);
            }
        });

        return birthdayPeople;
    }

    servicehub.getData(options.url).then(function(jsonData) {
        dataService.set('birthday', getBirthdayPeople(parseJson(jsonData)));
    });

    register(null, {});
};