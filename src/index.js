'use strict';

// export a function that takes a callback
// the callback is called on the new app state,
// whenever this app state is updated
// the function returns a method add() for adding new messages

module.exports = (cb) => {
  return {
    receive: require('./receiver.js')(cb),
    generate: require('./generator.js'),
  }
}
