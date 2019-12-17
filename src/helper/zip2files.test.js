import zip2files from './zip2files.js';

const fs = require('fs');

it('1- zip2files',async () => {
  const input = fs.readFileSync('./public/files/runkod-placeholder-dist.zip', ).buffer;
  const result = await zip2files(input);
  expect(result).toMatchSnapshot();
});
