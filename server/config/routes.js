const authRoutes = require('../routes/auth')
const BoxRoutes = require('../routes/box')
const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/', BoxRoutes)
  app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
}
