#!/usr/bin/env node

import {equal, deepEqual} from 'assert';
import sha256sum from './index.js'

{
  const expected = [
    [ 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'test/subdir/test3.txt' ],
    [ '9032e85656eab8979cba962cbecc64ea99244bcc3698ae3442df0faa883a35c0', 'test/test1.txt' ],
    [ '87106b9ca82423f800241955769074ae2e5b42645493699c7f7b6036ca5ca587', 'test/test2.txt' ]
  ];
  const actual = await sha256sum('test/**/*.txt');
  deepEqual(actual, expected);
}

{
  const expected = [
    ['test/test1.txt', true ],
    ['test/test2.txt', true ]
  ];
  const checksums = [
    [ '9032e85656eab8979cba962cbecc64ea99244bcc3698ae3442df0faa883a35c0', 'test/test1.txt' ],
    [ '87106b9ca82423f800241955769074ae2e5b42645493699c7f7b6036ca5ca587', 'test/test2.txt' ]
  ];
  const actual = await sha256sum('test/**/*.txt', checksums);
  deepEqual(actual, expected);
}
