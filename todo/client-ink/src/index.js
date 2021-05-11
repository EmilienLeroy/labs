const { config } = require('dotenv');
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');

config();

const app = importJsx('./App');

render(React.createElement(app));
