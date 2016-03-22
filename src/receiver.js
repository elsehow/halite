'use strict';

var Kefir = require('kefir')

// helper functions -----------------------------------

function mtype (t) {
  return (message) => {
    return message.value.type === t
  }
}

function replyTo (key) {
  return (message) => {
    return message.value.replyTo === key
  }
}

function accum (acc, cur) {
  acc.push(cur)
  return acc
}

function threadReplies (threads, replies) {
  return threads.map(t => {
    var rs = replies.filter(replyTo(t.key))
    rs.push(t)
    return rs
  })
}

module.exports = (cb) => {

  // a ref to the function we return
  var add = null

  // a stream of all added messages
  var messageS = Kefir.stream(emitter => {
    add = (message) => {
      emitter.emit(message)
    }
  })

  // stream of lists of all threads
  var threadS = messageS
      .filter(mtype('new-thread'))
      .scan(accum, [])

  // stream of lists of all replies
  var replyS = messageS
      .filter(mtype('reply'))
      .scan(accum, [])

  threadS
    .combine(replyS, threadReplies)
    .onValue(cb)

  // return a function for adding messages
  return add
}
