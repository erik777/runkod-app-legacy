import {PATH_SEPARATOR, BASE_PATH} from './constants';


const arrToPath = (arr) => `${PATH_SEPARATOR}${arr.join(PATH_SEPARATOR)}${PATH_SEPARATOR}`;

const pathToArr = (path) => path.split(PATH_SEPARATOR).filter((x) => x !== '');

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

  // Split path with path separator and remove empty items from array
  const pathSplit = path.split(PATH_SEPARATOR).filter(x => x !== '');

  // Walk on the array and return paths consecutively
  return pathSplit.map((x, i) => {
    const p = pathSplit.slice(0, i + 1);
    return arrToPath(p);
  });
};

export const buildPathMap = (files) => {
  let paths = [BASE_PATH];

  files.forEach(x => {
    paths = [...paths, ...generatePaths(x.parent).filter(x => !paths.includes(x))]
  });

  const m = {};

  paths.forEach(x => {
    m[x] = {'folders': [], 'files': []};

    m[x]['folders'] = paths.filter(y => {
      if (y.indexOf(x) === -1) {
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

export const pathLabel = (path) => {
  /*
  Returns label of a path

  Example:
    "/static/media/fonts/"
    returns:
    fonts
  */
  return pathToArr(path).slice(-1);
};

export const parentPath = (path) => {
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

export default {
  generatePaths,
  buildPathMap,
  pathLabel,
  parentPath
};