module.exports = {
  ...require('./resolve'),
  ...require('./args'),
  ...require('./require'),
  registerTSNode: require('./register')
}
