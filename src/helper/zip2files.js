import {DISABLED_FILES} from '../constants';

const JSZip = require('jszip');

const fileName = (path) => {
  const sp = path.split('/');

  return sp[sp.length - 1];
};

const fileType = (fileName) => {
  const sf = fileName.split('.');
  const ext = sf[sf.length - 1].toLowerCase();
  switch (ext) {
    case 'html':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'png':
      return 'image/png';
    case 'js':
      return 'application/javascript';
    default:
      return '';
  }
};

const extractFile = async (z, root) => {
  const buffer = await z.async('arraybuffer');

  const name = fileName(z.name);
  const path = z.name.split('/').filter(x => x !== root).filter(x => x !== name).filter((x) => x !== '').join('/');
  const type = fileType(name);

  return {path, name, type, size: buffer.byteLength, buffer}
};


export default async (buffer) => {
  const zip = await JSZip.loadAsync(buffer);

  const root = zip.filter((relativePath, file) => file.dir)[0].name.replace('/', '');

  const zipFiles = zip.filter(function (relativePath, file) {
    if (file.dir) {
      return false;
    }

    const fn = fileName(relativePath);

    return !DISABLED_FILES.includes(fn);
  });

  return await Promise.all(zipFiles.map(z => extractFile(z, root)));
}
