# sha256sum
Compute and check SHA256 message digest.

This sha256sum is crafted to work somewhat like the UNIX command, it supports globs and it will return arrays for examination.

It is a modern module (ESM) that you can use in the latest node, usage is as simple as ```await sha256sum('test/*.txt')```

## Installation

```shell
npm i sha256sum
```

## Usage

```JavaScript
import sha256sum from 'sha256sum';
```

## Example

```JavaScript
import sha256sum from 'sha256sum';

const checksums = await sha256sum('test/*.txt');

// checksums contents
[
  [ '9032e85656eab8979cba962cbecc64ea99244bcc3698ae3442df0faa883a35c0', 'test/test1.txt' ],
  [ '87106b9ca82423f800241955769074ae2e5b42645493699c7f7b6036ca5ca587', 'test/test2.txt' ]
]

const verification = await sha256sum('test/*.txt', checksums); // NOTE: 2nd argument that contains previously sampled chacksums

// verification contents
[
  ['test/test1.txt', true ],
  ['test/test2.txt', true ] // false if it fails
];

```

## Sub Directories

You can match sub-directories by using "\*\*" in a path fragment alone: ```const response = await sha256sum('test/**/*.txt');```

This will result in the following entry:

```javascript
[
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  'test/subdir/test3.txt'
]
```

## Advanced

For your convenience you can customize the algorithm without switching libraries.
If sha256sum collisions are a concern, I recommend you fork the repository and customize it.

```JavaScript
await sha256sum('test/*.txt', null, 'sha512');
await sha256sum('test/*.txt', checksums , 'sha512')
```

The algorithm is dependent on the available algorithms supported by the version of OpenSSL on the platform. Examples are 'sha256', 'sha512', etc. On recent releases of OpenSSL, openssl list -digest-algorithms (openssl list-message-digest-algorithms for older versions of OpenSSL) will display the available digest algorithms. See [crypto.createHash](https://nodejs.org/en/docs/)

## Testing

```shell

npm run test

```
