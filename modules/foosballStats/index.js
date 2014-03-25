module.exports = function setup(options, imports, register) {

    var foosballManager = imports.foosballManager,
        database = imports.database,
        data = imports.data;

    foosballManager.on('endMatch', function(gameState) {

    });

    register(null, {});
};