var Emitter = require('events').EventEmitter;

module.exports = function setup(options, imports, register) {
    "use strict"

    var serialport = imports['serialport'],
        emitter = new Emitter,

        playingTimeout,
        isOccupied = false,
        gameState = {
            teamOne : {
                smallPoints : 0,
                bigPoints: 0
            },
            teamTwo : {
                smallPoints : 0,
                bigPoints: 0
            }
        };

    function resetScore() {
        gameState.teamOne.smallPoints = 0;
        gameState.teamOne.bigPoints = 0;
        gameState.teamTwo.smallPoints = 0;
        gameState.teamTwo.bigPoints = 0;

        emitter.emit('scoreChanged', gameState);
    }

    function addPoint(team) {
        if(++team.smallPoints === 5) {
            if(++team.bigPoints === 3) {
                emitter.emit('endMatch', gameState);
                resetScore();
            } else {
               team.smallPoints = 0;
               emitter.emit('scoreChanged', gameState);
            }
        }
     }

    function exemptTable() {
        isOccupied = false;
    }

    function prolongPlaying() {
            clearTimeout(playingTimeout);
            playingTimeout = setTimeout(exemptTable, 60000);
    }

    serialport.on('data', function(data) {
        var tmpTeam;

        switch(data) {

            case "reset":
                resetScore();
                break;

            case "point-1":
                tmpTeam = ((gameState.teamOne.bigPoints + gameState.teamTwo.bigPoints) % 2 === 0 ) ? gameState.teamOne : gameState.teamTwo;
                addPoint(tmpTeam);
                break;

            case "point-2":
                tmpTeam = ((gameState.teamOne.bigPoints + gameState.teamTwo.bigPoints) % 2 === 0 ) ? gameState.teamTwo : gameState.teamOne;
                addPoint(tmpTeam);
                break;
        }

        if(!isOccupied) {
            isOccupied = true;
            emitter.emit('foosballManager::tableOccupied');
        }

        prolongPlaying();
    });

    register(null, {
        foosballManager : {
            on : emitter.on
        }
    });
}