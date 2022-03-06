const { connect, connection } = require('mongoose');

connect('mongodb://localhost/userandthoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
