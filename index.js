'use strict';

var nacl         = require('tweetnacl')
nacl.util        = require('tweetnacl-util')

// generate a keypair
const keypair = nacl.box.keyPair

// public key of a keypair
const pk = (kp) => {
  return kp.publicKey
}

// secret key of a keypair
const sk = (kp) => {
  return kp.secretKey
}

// generate a nonce (buffer of length 24)
const makenonce = () => {
  return nacl.randomBytes(24)
}

const encrypt = (str, nonce, pk, sk) => {
  var buff = nacl.util.decodeUTF8(str)
  return nacl.box(buff, nonce, pk, sk)
}

const decrypt = (buff, nonce, pk, sk) => {
  var arr = nacl.box.open(buff, nonce, pk, sk)
  return nacl.util.encodeUTF8(arr)
}

module.exports = {
  keypair: keypair,
  pk: pk,
  sk: sk,
  makenonce: makenonce,
  encrypt: encrypt,
  decrypt: decrypt,
}

//module.exports = (log, cb) => {
//
//  return {
//    post: (pubkey, title, body, cb) => {
//    },
//
//    reply: (to, keypair, reply, cb) => {
//    },
//  }
//}
