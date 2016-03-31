'use strict';

var test = require('tape')
var nl = require('..')

// encrypt / decrypt functions ----------------

test('we can generate  keypair', t => {
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

test('we can encrypt + decrypt something', t => {
  var message = 'hi guys'
  var n = nl.makenonce()
  var kp1 = nl.keypair()
  var kp2 = nl.keypair()
  var enc = nl.encrypt(message, n, nl.pk(kp2), nl.sk(kp1))
  var dec = nl.decrypt(enc, n, nl.pk(kp1), nl.sk(kp2))
  t.deepEquals(dec, message, 'we encrypted and decrypted a message.')
  t.end()
})

test('we can sign + verify something', t => {
  var message = 'hi guys'
  var kp1 = nl.signKeypair()
  var kp2 = nl.signKeypair()
  var signed = nl.sign(message, nl.sk(kp1))
  var ver = nl.verify(signed, nl.pk(kp1))
  t.deepEqual(ver,message)
  t.end()
})
