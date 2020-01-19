import fs from './fs'

import {utf8encode} from 'jszip/lib/utf8'

// Not active. This will convert relative urls to absolute urls in css files
export const cssTransform = (contents: string, parentPath, domainName) => {
  const re = /url\((?!['"]?(?:data:|#|https?:|\/\/))(['"]?)([^'")]*)\1\)/;

  const parentPaths = fs.pathToArr(parentPath);

  return contents.replace(new RegExp(re, 'gm'), function (match) {
    const url = re.exec(match)[2];

    const paths = fs.pathToArr(url);

    let file = '';
    // pop filename from paths
    if (paths.reduceRight(a => a).indexOf('.') !== -1) {
      file = paths.pop()
    }

    // reduce parent paths
    paths.filter(x => x === '..').forEach(() => {
      parentPaths.pop();
    });

    const newPaths = [...parentPaths, ...paths.filter(x => x !== '..')];

    const newPathStr = `${fs.arrToPath(newPaths)}${file}`;

    // build full url
    return `url('${domainName}${newPathStr}')`;
  });
};


export default (buffer) => {

  // replace empty files with a space
  if (buffer.byteLength === 0) {
    return utf8encode(' ');
  }

  return buffer;
};
