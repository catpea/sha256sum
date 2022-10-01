import glob from 'glob';
import { argv } from 'process';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
export default main;

async function main(pattern, checksums, algorithm='sha256'){
  if(checksums){
    return await verify(pattern, checksums, algorithm);
  }else{
    return await create(pattern, algorithm);
  }
}

async function verify(pattern, previous, algorithm){
  const current = Object.fromEntries((await create(pattern, algorithm)).map(([a,b])=>[b,a]));
  return previous.map(([sum, file])=>([[file, sum==current[file]?true:false]])).flat(1)
}

async function create(pattern, algorithm){
  return await Promise.all((await files(pattern)).map(async item=>[await checksum(item, algorithm), item ]));
}

function checksum(location, algorithm){
  return new Promise(function(resolve, reject){
    const hash = createHash(algorithm);
    const input = createReadStream(location);
    input.on('readable', () => {
      const data = input.read();
      if (data) {
        hash.update(data);
      } else {
        resolve(hash.digest('hex'))
      }
    });
  })
}

function files(pattern){
  return new Promise(function(resolve, reject){
    glob(pattern, {}, function (err, files) {
      if(err) return reject(err);
      resolve(files);
    })
  })
}
