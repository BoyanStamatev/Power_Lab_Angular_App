const mongoose = require('mongoose')
const User = require('../models/User')
const Power = require('../models/Power')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('MongoDB ready!')

    User.seedAdminUser()
    Power.seedPowers()
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
