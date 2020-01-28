const authRoutes = require('../routes/auth')
const powerRoutes = require('../routes/power')
const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')
const reviewRoutes = require('../routes/review')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/power', powerRoutes)
  app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
  app.use('/reviews', reviewRoutes)
}
