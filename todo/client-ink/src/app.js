const React = require('react');
const importJsx = require('import-jsx');
const {Box} = require('ink');
const Menu = importJsx('./components/Menu');

const App = () => (
	<Box>
		<Menu></Menu>
	</Box>
);

module.exports = App;
