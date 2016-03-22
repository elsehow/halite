'use strict';

// helper functions -----------------------------------

function encrypt (pubkey, json) {
}

function decrypt (privkey, ciphertext) {
}

// data structures -------------------------------------

function new_thread (cleartext, pubkey) {
  return {
    type: 'new-thread',
    cleartext: cleartext,
    pubkey: pubkey,
  }
}

function reply (thread_key, cleartext, my_pubkey, their_pubkey) {
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
module.exports = {
  new_thread: new_thread,
  reply: reply,
}
