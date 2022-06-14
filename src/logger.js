const { createLogger,  transports } = require('winston');


const logger = createLogger({
    transports: [
        new transports.File({filename: 'info.log'}),
        new transports.Console()
    ]
})

module.exports = logger