'use strict';

var partial = require('partial')

// helper functions -----------------------------------

function encrypt (pubkey, json) {
  return json
}

// data structures -------------------------------------

function new_thread (my_pubkey, title, cleartext) {
  return {
    type: 'new-thread',
    title: title,
    cleartext: cleartext,
    pubkey: my_pubkey,
  }
}

function reply (my_pubkey, their_pubkey, thread_key, cleartext) {
  // generate cipher text to ship
  let ciphertext = encrypt(their_pubkey, {
    cleartext: cleartext,
    my_pubkey: my_pubkey,
  })
  // return a message
  return {
    type: 'reply',
    ciphertext: ciphertext,
    replyTo: thread_key,
  }
}

// export 2 functions for generating messages
module.exports = (my_pubkey) => {
  return {
    new_thread: partial(new_thread, my_pubkey),
    reply: partial(reply, my_pubkey)
  }
}
