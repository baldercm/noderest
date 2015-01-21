var loggerConfig, mongooseConfig, expressConfig, app, morgan

require('coffee-script/register')

require('./lib/config')

loggerConfig = require('./lib/loggerConfig')

mongooseConfig = require('./lib/mongooseConfig')
mongooseConfig.bootstrap()

expressConfig = require('./lib/expressConfig')
expressConfig.bootstrap()
app = expressConfig.app

morgan = require('morgan')
app.use(morgan('dev', {
  'stream': loggerConfig.stream
}))
