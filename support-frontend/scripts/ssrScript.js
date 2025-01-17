const { writeFileSync } = require('fs');
const { resolve } = require('path');
const jsdom = require('jsdom');

// ------------- Set up global state --------------
const { JSDOM } = jsdom;
const { window } = new JSDOM('...', { url: 'http://localhost/' });

global.URL = require('url').URL;
global.URLSearchParams = require('url').URLSearchParams;

global.window = window;
global.window.guardian = {
  settings: {},
};

global.localStorage = {
  getItem: () => '',
  setItem: () => {},
};
global.sessionStorage = global.localStorage;
global.document = window.document;
global.document.cookie = 'GU_TK=1.1553079258164';
global.navigator = {
  userAgent: 'node.js',
};

global.Image = function image() { return this; };

// -------------- Write pages to file ----------------

// eslint-disable-next-line
const { ssrPages } = require('../public/compiled-assets/javascripts/ssrPages').Support;

ssrPages.pages.forEach((page) => {
  const { filename, html } = page;
  console.log(`Writing ${filename}`);

  writeFileSync(
    resolve(__dirname, '..', 'conf/ssr-cache/', `${filename}`),
    html, 'utf8',
  );
  console.log(`Finished writing ${filename}`);
});

console.log('Done');
process.exit();

