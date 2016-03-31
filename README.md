# halite

encrypt and decrypt UTF-8 strings with [tweetnacl](https://github.com/dchest/tweetnacl-js)

## usage 

```javascript
var halite = require('halite')

var message = 'hi guys'
// make a nonce
var n = halite.makenonce()
// generate two keypairs
var kp1 = halite.keypair()
var kp2 = halite.keypair()
// kp1 encrypts a message for kp2
var enc = halite.encrypt(message, n, halite.pk(kp2), halite.sk(kp1))
// kp2 decrypts the message with kp1's public key
var dec = halite.decrypt(enc, n, halite.pk(kp1), halite.sk(kp2))
console.log(dec)
// > 'hi guys'
```
 
## encrypt / decrypt api

### halte.keypair()

generate a keypair

### halite.makenonce()

generate a nonce

### halite.encrypt(str, nonce, pubkey, secretkey)

returns encrypted message as a Uint8Array

### halite.encrypt(arr, nonce, pubkey, secretkey)

returns a string. arr should be a Unit8Array

## sign / verify api

### halite.signKeypair()

generate a keypair for signing

### sign(str, sk)

returns signed message as a Uint8Array

### verify(arr, pk)

returns a clertext message if arr (a Uint8Arr) is signed from pk. returns `null` if validation fails.

### helper functions

### halite.pk(kp)

get the public key of a keypair `kp`

### halite.sk(kp)

get the secret key of a keypair `kp`

### halite.serialize(u8a) / halite.deserialize(arr)

converts u8a to str and back again. this is convenient for seding uint8arrays over the wire. e.g.,

```javascript
// this doesnt work!
var a= new Uint8Array([1, 2,3])
JSON.parse(JSON.stringify(a)) === a
// > false

// but this works!!
var overWire = JSON.stringify(halite.serialize(a)) 
halite.deserialize(JSON.parse(a)) === a
// > true
```
## developing

to run the tests

    npm test

when developing, you can watch for changes and re-run tests automatically

    npm run watch

## license

BSD
