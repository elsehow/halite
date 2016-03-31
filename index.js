'use strict';

var nacl         = require('tweetnacl')
nacl.util        = require('tweetnacl-util')
var jsonb        = require('json-buffer')
var toBuffer     = require('typedarray-to-buffer')

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

const signKeypair = nacl.sign.keyPair

const sign = (str, sk) => {
  var buff = nacl.util.decodeUTF8(str)
  return nacl.sign(buff, sk)
}

const verify = (buff, pk) => {
  var arr = nacl.sign.open(buff, pk)
  return nacl.util.encodeUTF8(arr)
}

const serialize = (u8a) => {
  return jsonb.stringify(toBuffer(u8a))
}

const deserialize = (str) => {
  return new Uint8Array(jsonb.parse(str))
}

module.exports = {
  // util
  pk: pk,
  sk: sk,
  serialize: serialize,
  deserialize: deserialize,
  // encrypt
  keypair: keypair,
  makenonce: makenonce,
  encrypt: encrypt,
  decrypt: decrypt,
  // sign
  signKeypair: signKeypair,
  sign: sign,
  verify: verify,
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
