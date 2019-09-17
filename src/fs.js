import {PATH_SEPARATOR, BASE_PATH} from './constants';


const arrToPath = (arr) => `${PATH_SEPARATOR}${arr.join(PATH_SEPARATOR)}${PATH_SEPARATOR}`;

const pathToArr = (path) => path.split(PATH_SEPARATOR).filter((x) => x !== '');

const isPath = (st) => st.startsWith(BASE_PATH);

const generatePaths = (path) => {
  /*
  Generates all possible paths from a path

  Example:
    "/static/media/fonts/"
    returns:
    "/static/",
    "/static/media/",
    "/static/media/fonts/"
  */

  const paths = pathToArr(path);

  // Walk on the array and return paths consecutively
  return paths.map((x, i) => {
    const p = paths.slice(0, i + 1);
    return arrToPath(p);
  });
};

const buildPathMap = (files) => {
  let paths = [BASE_PATH];

  files.forEach(x => {
    paths = [...paths, ...generatePaths(x.parent).filter(x => !paths.includes(x))]
  });

  const m = {};

  paths.forEach(x => {
    m[x] = {'folders': [], 'files': []};

    m[x]['folders'] = paths.filter(y => {
      if (y.indexOf(x) !== 0) {
        return false;
      }

      return y.replace(x).split('/').length === 2
    });

    m[x]['files'] = files.filter(y => {
      return y.parent === x
    });
  });

  return m;
};

const pathLabel = (path) => {
  /*
  Returns label of a path

  Example:
    "/static/media/fonts/"
    returns:
    fonts
  */
  return pathToArr(path).slice(-1);
};

const parentPath = (path) => {
  /*
    Returns parent path of a path

    Example:
      "/static/media/fonts/"
      returns:
      /static/media/
    */

  if (path === BASE_PATH) {
    return null
  }

  const parentArr = pathToArr(path).slice(0, -1);
  return parentArr.length === 0 ? BASE_PATH : arrToPath(parentArr);
};

const pathWalk = (map, path, rv) => {
  for (let folder of map[path]['folders']) { // eslint-disable-line no-unused-vars
    rv.push(folder);
    pathWalk(map, folder, rv)
  }
};


const getFilesUnderPath = (map, path) => {
  /*
    Returns all files under a path with a dict list.

    Example output:
      [{
        "name": "index.json",
        "parent": "/cars/",
      },
       {
        "name": "amg.json",
        "parent": "/cars/sport/mercedes/",
      },
      {
        "name": "s300.json",
        "parent": "/cars/sport/mercedes/",
      }]
   */

  let folders = [path];
  let files = [];
  pathWalk(map, path, folders);

  folders.forEach(x => {
    files = [...files, ...map[x]['files']]
  });

  return files
};

export default {
  arrToPath,
  pathToArr,
  isPath,
  generatePaths,
  buildPathMap,
  pathLabel,
  parentPath,
  pathWalk,
  getFilesUnderPath
};