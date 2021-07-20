#!/usr/bin/env node

import sha256sum from 'sha256sum'

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
  ['test/test2.txt', true ]
];
 
