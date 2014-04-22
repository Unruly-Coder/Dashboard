module.exports = function setup(options, imports, register) {

    var _,  dataService, servicehub, logger, CronJob, job;

    dataService = imports.data;
    servicehub  = imports.servicehub;
    logger = imports.logger;
    _ = require('underscore');
    CronJob = require('cron').CronJob;


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

        return newData;
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

    function updateData() {
        servicehub.getData(options.url).then(function(jsonData) {
            logger.info('Birthday data updated - ' + new Date());
            dataService.set('birthday', getBirthdayPeople(parseJson(jsonData)));
        }, function(error) {
            logger.error('Can not update birthday data - ' + error);
        });
    }

    updateData();
    job = new CronJob({
        cronTime: '00 00 01 * * *',
        onTick: updateData,
        start: true
    });

    register(null, {});
};