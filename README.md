# halite

encrypt and decrypt UTF-8 strings with tweetnacl

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

## api

### halte.keypair()

generate a keypair

### halite.pk(kp)

get the public key of a keypair `kp`

### halite.sk(kp)

get the secret key of a keypair `kp`

### halite.makenonce()

generate a nonce

### halite.encrypt(str, nonce, pubkey, secretkey)

returns encrypted message as a Uint8Array

### halite.encrypt(arr, nonce, pubkey, secretkey)

returns a string. arr should be a Unit8Array

## developing

to run the tests

    npm test

when developing, you can watch for changes and re-run tests automatically

    npm run watch

## license

BSD
