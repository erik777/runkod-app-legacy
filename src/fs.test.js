import fs from "./fs"

it('1- generate paths', () => {
  const input = '/static/media/fonts/';
  const result = fs.generatePaths(input);
  expect(result).toMatchSnapshot();
});

it('2- generate paths', () => {
  const input = '/';
  const result = fs.generatePaths(input);
  expect(result).toMatchSnapshot();
});


it('3- generate paths', () => {
  const input = '/images/';
  const result = fs.generatePaths(input);
  expect(result).toMatchSnapshot();
});


it('4- buildPathMap', () => {
  const files = [
    {
      parent: '/',
      name: 'asset-manifest.json'
    },
    {
      parent: '/',
      name: 'index.html'
    },
    {
      parent: '/',
      name: 'manifest.json'
    },
    {
      parent: '/',
      name: 'precache-manifest.cbe4dd161c6842da089c5aea3c10c7de.js'
    },
    {
      parent: '/',
      name: 'service-worker.js'
    },
    {
      parent: '/images/',
      name: 'icon.png'
    },
    {
      parent: '/images/',
      name: 'og.jpg'
    },
    {
      parent: '/static/css/',
      name: '2.9a3ef949.chunk.css'
    },
    {
      parent: '/static/css/',
      name: '2.9a3ef949.chunk.css.map'
    },
    {
      parent: '/static/css/',
      name: 'main.61b1d037.chunk.css'
    },
    {
      parent: '/static/css/',
      name: 'main.61b1d037.chunk.css.map'
    },
    {
      parent: '/static/js/',
      name: '2.30431126.chunk.js'
    },
    {
      parent: '/static/js/',
      name: '2.30431126.chunk.js.map'
    },
    {
      parent: '/static/js/',
      name: 'main.8c32f0c4.chunk.js'
    },
    {
      parent: '/static/js/',
      name: 'main.8c32f0c4.chunk.js.map'
    },
    {
      parent: '/static/js/',
      name: 'runtime~main.c5541365.js'
    },
    {
      parent: '/static/js/',
      name: 'runtime~main.c5541365.js.map'
    },
    {
      parent: '/static/media/fonts/',
      name: 'm-plus-rounded-1c-latin-100.b9c1b5c3.woff'
    }
  ];

  const result = fs.buildPathMap(files);
  expect(result).toMatchSnapshot();
});


it('5- buildPathMap 2', () => {
  const files = [
    {
      parent: '/images/portrait/2019/06/',
      name: 'alice.png'
    },
    {
      parent: '/images/portrait/2019/07/',
      name: 'bob.png'
    },
    {
      parent: '/cv/2019/06/',
      name: 'alice.pdf'
    },
    {
      parent: '/cv/2019/07/',
      name: 'bob.pdf'
    }
  ];

  const result = fs.buildPathMap(files);
  expect(result).toMatchSnapshot();
});


it('6- path label', () => {
  const path = '/static/media/fonts/';

  const result = fs.pathLabel(path);
  expect(result).toMatchSnapshot();
});


it('7- path label', () => {
  const path = '/images/';

  const result = fs.pathLabel(path);
  expect(result).toMatchSnapshot();
});


it('8- parent path', () => {
  const path = '/static/media/fonts/foo/bar';

  const result = fs.parentPath(path);
  expect(result).toMatchSnapshot();
});


it('9- parent path', () => {
  const path = '/static/';

  const result = fs.parentPath(path);
  expect(result).toMatchSnapshot();
});


it('10- parent path', () => {
  const path = '/';

  const result = fs.parentPath(path);
  expect(result).toMatchSnapshot();
});


it('11- getFilesUnderPath', () => {

  const files = [
    {
      parent: '/cars/',
      name: 'index.json'
    },
    {
      parent: '/cars/sport/mercedes/',
      name: 'amg.json'
    },
    {
      parent: '/cars/sport/mercedes/',
      name: 's300.json'
    },
    {
      parent: '/cars/sport/mercedes/',
      name: 'e180.json'
    },

    {
      parent: '/cars/sport/bmw/',
      name: 'm3.json'
    },
    {
      parent: '/cars/sport/bmw/',
      name: 'm5.json'
    },
    {
      parent: '/bikes/sport/yamaha/',
      name: 'f1.json'
    },
    {
      parent: '/bikes/naked/yamaha/',
      name: 'fz8.json'
    }
  ];

  const map = fs.buildPathMap(files);

  let rv = [];
  const result = fs.getFilesUnderPath(map, '/cars/', rv);
  expect(result).toMatchSnapshot();


  const result2 = fs.getFilesUnderPath(map, '/cars/sport/mercedes/', rv);
  expect(result2).toMatchSnapshot();


  const result3 = fs.getFilesUnderPath(map, '/cars/sport/bmw/', rv);
  expect(result3).toMatchSnapshot();

  const result4 = fs.getFilesUnderPath(map, '/', rv);
  expect(result4).toMatchSnapshot();
});


it('11- isPath', () => {
  expect(fs.isPath('arandomtext')).toMatchSnapshot();
  expect(fs.isPath('/cars/')).toMatchSnapshot();
});