module.exports = function setup(options, imports, register) {
    "use strict";

    var dataChannel = imports.data,
        socketClient = imports.socketClient,
        logger = imports.logger;

    init();

    function init() {
        var socket = socketClient.connect(options.tableAddress);

        updateDataChannel({});

        socket.on('foosballTableConnected', function(data) {
            logger.info('WebSocket connection with foosball table established');

            data.eventList.forEach(function(event){
               socket.on(event, updateDataChannel);
            });

            updateDataChannel(data.tableState);
        });

    }

    function updateDataChannel(data) {
        dataChannel.set('foosballState', data);
    }

    register(null, {});
};