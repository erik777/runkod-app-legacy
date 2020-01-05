import {cssTransform} from './transform'

it('css transform - 1', () => {
  const input = `
  .login-page{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    background-image: url(../img/bg-login.jpg);
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: auto;
  }`;

  const result = cssTransform(input,
    '/themes/light/assets/css/',
    'https://testphase.runkodapps.com');

  const expected = `
  .login-page{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    background-image: url('https://testphase.runkodapps.com/themes/light/assets/img/bg-login.jpg');
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: auto;
  }`;
  expect(result).toBe(expected);
});

it('css transform 2', () => {
  const input = 'background:#D5D5D5 url(../images/bg.jpg) no-repeat center}';
  const result = cssTransform(input, '/css/', 'https://foo.com');
  const expected = "background:#D5D5D5 url('https://foo.com/images/bg.jpg') no-repeat center}";
  expect(result).toBe(expected);
});

it('css transform 3', () => {
  const input = 'background-image:url(images/bg.jpg)}';
  const result = cssTransform(input, '/docs/', 'https://foo.com');
  const expected = "background-image:url('https://foo.com/docs/images/bg.jpg')}";
  expect(result).toBe(expected);
});

it('css transform 4', () => {
  const input = 'background-image:url(/images/bg.jpg)}';
  const result = cssTransform(input, '/', 'https://foo.com');
  const expected = "background-image:url('https://foo.com/images/bg.jpg')}";
  expect(result).toBe(expected);
});


it('css transform 5', () => {
  const input = `
  @font-face{
    font-family:Roboto;
    font-style:normal;
    font-weight:100;
    src:url(../fonts/KFOkCnqEu92Fr1MmgVxIIzQ.5cb7edfc.woff) format("woff")
  }
  @font-face{
    font-family:Roboto;
    font-style:normal;
    font-weight:300;
    src:url(../fonts/KFOlCnqEu92Fr1MmSU5fBBc-.b00849e0.woff) format("woff")
  }
  @font-face{
    font-family:Roboto;
    font-style:normal;
    font-weight:400;
    src:url(../fonts/KFOmCnqEu92Fr1Mu4mxM.60fa3c06.woff) format("woff")
  }
  @font-face{
    font-family:Material Icons;
    font-style:normal;
    font-weight:400;
    src:url(../fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.0509ab09.woff2) format("woff2"),
       url(../fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.29b882f0.svg#fontawesomeregular) format("woff")
  }`;
  const result = cssTransform(input, '/css/', 'https://webby-daily.runkodapps.com');
  const expected = `
  @font-face{
    font-family:Roboto;
    font-style:normal;
    font-weight:100;
    src:url('https://webby-daily.runkodapps.com/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.5cb7edfc.woff') format("woff")
  }
  @font-face{
    font-family:Roboto;
    font-style:normal;
    font-weight:300;
    src:url('https://webby-daily.runkodapps.com/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.b00849e0.woff') format("woff")
  }
  @font-face{
    font-family:Roboto;
    font-style:normal;
    font-weight:400;
    src:url('https://webby-daily.runkodapps.com/fonts/KFOmCnqEu92Fr1Mu4mxM.60fa3c06.woff') format("woff")
  }
  @font-face{
    font-family:Material Icons;
    font-style:normal;
    font-weight:400;
    src:url('https://webby-daily.runkodapps.com/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.0509ab09.woff2') format("woff2"),
       url('https://webby-daily.runkodapps.com/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.29b882f0.svg#fontawesomeregular') format("woff")
  }`;

  expect(result).toBe(expected);
});


it('css transform 6', () => {
  const input = `
  .header-bg{
    background:#fff;
    background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED7")!important
  }`;
  const result = cssTransform(input, '/css/', 'https://foo.com');
  const expected = `
  .header-bg{
    background:#fff;
    background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED7")!important
  }`;
  expect(result).toBe(expected);
});
/*

 */
