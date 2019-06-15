module.exports = {
  ...require('./resolve'),
  ...require('./args'),
  registerTSNode: require('./register'),
  setupTSConfig: require('./setup')
}
