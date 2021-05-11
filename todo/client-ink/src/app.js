const React = require('react');
const importJsx = require('import-jsx');
const {Box} = require('ink');
const Todos = importJsx('./components/Todos');

const App = () => (
	<Box>
		<Todos></Todos>
	</Box>
);

module.exports = App;
