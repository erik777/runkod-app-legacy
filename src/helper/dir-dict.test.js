import dirDict, {
  populateDirNames
} from "./dir-dict"

it('1- populate dir names', () => {
  const input = '/static/media/fonts/';
  const result = populateDirNames(input);
  expect(result).toMatchSnapshot();
});

it('2- populate dir names', () => {
  const input = '/';
  const result = populateDirNames(input);
  expect(result).toMatchSnapshot();
});


it('3- populate dir names', () => {
  const input = '/images/';
  const result = populateDirNames(input);
  expect(result).toMatchSnapshot();
});


it('4- dirDict', () => {
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

  const result = dirDict(files);
  expect(result).toMatchSnapshot();
});


it('5- dirDict 2', () => {
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

  const result = dirDict(files);
  expect(result).toMatchSnapshot();
});
