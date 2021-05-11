const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');

const app = importJsx('./App');

render(React.createElement(app));
