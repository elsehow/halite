'use strict';

var test = require('tape')
var nl = require('..')

// encrypt / decrypt functions ----------------

test('we can generate a keypair', t => {
  var kp = nl.keypair()
  t.ok(kp, 'keypair ok')
  t.ok(nl.sk(kp), 'has sk')
  t.ok(nl.pk(kp), 'has pk')
  t.end()
})

test('we can generate a nonce', t => {
  var n = nl.makenonce()
  t.ok(n, 'nonce exists')
  t.equal(n.length, 24, 'it\'s 24 long')
  t.end()
})

test('we can serialize + stringify => parse + deserialize uart buffers', t => {
  // this doesnt work!
  var a= new Uint8Array([1, 2,3])
  // but this works!!
  var overWire = JSON.stringify(nl.serialize(a))
  var received = nl.deserialize(JSON.parse(overWire))
  t.deepEqual(received, a, 'package does')
  t.end()
})



test('we can encrypt + decrypt a js object, stringified over the wire', t => {
  var message = {message: 'hi guys'}
  var mstr = JSON.stringify(message)
  var n = nl.makenonce()
  var kp1 = nl.keypair()
  var kp2 = nl.keypair()
  var enc = nl.encrypt(mstr, n, nl.pk(kp2), nl.sk(kp1))
  var dec = nl.decrypt(enc, n, nl.pk(kp1), nl.sk(kp2))
  var obj = JSON.parse(dec)
  t.deepEquals(obj, message, 'we encrypted and decrypted a message.')
  t.end()
})

test('we can sign + verify a js object, stringied over the wire', t => {
  var message = {message: 'hi guys'}
  var mstr = JSON.stringify(message)
  var kp1 = nl.signKeypair()
  var kp2 = nl.signKeypair()
  var signed = nl.sign(mstr, nl.sk(kp1))
  var ver = nl.verify(signed, nl.pk(kp1))
  var obj = JSON.parse(ver)
  t.deepEqual(obj,message)
  t.end()
})

