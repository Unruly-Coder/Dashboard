module.exports = [

    /*
     * Services
     * ****************************************************************************
     */

    {
        packagePath: './services/eventbus'
    },
    {
        packagePath: './services/logger',
        transports: [
            {
                type: 'console',
                colorize: true
            },

            {
                type: 'file',
                filename: './logs/log.txt'
            }
        ]
    },
    {
        packagePath: './services/data'
    },
    {
        packagePath: './services/database',
        path: 'mongodb://localhost/dashboard'
    },
    {
        packagePath: './services/serialport',
        path: '/dev/ttyACM0',
        baudRate: 9600,
        parser: 'readline'
    },
    {
        packagePath: './services/webserver',
        views: './views',
        port: 3000,
        favicon: './client/public/favicon.ico',
        statics: ['./client/public']
    },
    {
        packagePath: './services/websocket'
    },

    /*
     * Application modules
     * ****************************************************************************
     */
    {
        packagePath: './modules/foosballManager'
    },
    {
        packagePath: './modules/foosballStats'
    },
    {
        packagePath: './modules/informant'
    },
    {
        packagePath: './modules/routes/page',
        path: './client/public/views/index.html'
    },
    {
        packagePath: './modules/routes/api'
    }
];