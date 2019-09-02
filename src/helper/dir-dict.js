export const populateDirNames = (path) => {
  const pathSplit = path.split('/').filter(x => x !== '');

  return pathSplit.map((x, i) => {
    const p = pathSplit.slice(0, i + 1);
    return `/${p.join('/')}/`;
  });
};

export default (files) => {
  let paths = ['/'];

  files.forEach(x => {
    paths = [...paths, ...populateDirNames(x.parent).filter(x => !paths.includes(x))]
  });

  const m = {};

  paths.forEach(x => {
    m[x] = {'folders': [], 'files': []};

    m[x]['folders'] = paths.filter(y => {
      if (y.indexOf(x) === -1) {
        return
      }

      return y.replace(x).split('/').length === 2
    });

    m[x]['files'] = files.filter(y => {
      return y.parent === x
    });
  });

  return m;
};