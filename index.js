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
  const response = [];
  const current = Object.fromEntries((await create(pattern, algorithm)).map(([a,b])=>[b,a]));
  for (const [sum, file] of previous){
    response.push([file, sum==current[file]?true:false])
  }
  return response;
}

async function create(pattern, algorithm){
  const response = [];
  for (const item of await files(pattern)) {
    response.push([await checksum(item, algorithm), item ]);
  }
  return response;
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
