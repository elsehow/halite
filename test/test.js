'use strict';

var test = require('tape')
var keypair = require('keypair')
var nickslist = require('../src/index.js')

// helper fn for creating test messages
function msg (key, value) {
  return {
    key: key,
    value: value,
  }
}

// data for testing -----------------------------

var keypairs = [
  keypair({bits: 1024}),
  keypair({bits: 1024}),
]

var l = nickslist(_ => {})
var test_messages = [
  // a new thread
  msg('key1',
      l.generate.new_thread('hi', keypairs[0].public)),
  // a reply to the first thread
  msg('key2',
      l.generate.reply('key1', 'sup', keypairs[1].public, keypairs[0].public)),
]

// receive message functions ----------------

test('basic receive functions', (t) => {
  t.plan(2)
  t.ok(nickslist, 'imported lib ok')
  // we should see [] fired at first
  var l = nickslist(state => {
    t.deepEqual(state, [], 'we see an initial state of []')
  })
})

test('should be able to add threaded replies', (t) => {
  t.plan(3)
  var expected_states = [
    [],
    [[test_messages[0]]],
    [[test_messages[1], test_messages[0]]],
  ]
  var counter = 0
  var l = nickslist(state => {
    t.deepEqual(state, expected_states[counter], 'seeing the state we expected')
    counter+=1
  })
  // add 2 messages
  l.receive(test_messages[0])
  l.receive(test_messages[1])
})

test('threaded replies should work even when messages are added out of order', (t) => {
  t.plan(3)
  var expected_states = [
    [],
    [],
    [[test_messages[1], test_messages[0]]],
  ]
  var counter = 0
  var l = nickslist(state => {
    t.deepEqual(state, expected_states[counter], 'seeing the state we expected')
    counter+=1
  })
  // add 2 messages
  l.receive(test_messages[1])
  l.receive(test_messages[0])
})

// generate message functions ---------------

test('')
