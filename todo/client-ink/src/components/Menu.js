const React = require('react');
const {Box} = require('ink');
const importJsx = require('import-jsx');
const SelectInput = importJsx('ink-select-input').default;

const Menu = () => {
	const handleSelect = item => {
		// `item` = { label: 'First', value: 'first' }
	};

	const items = [
		{
			label: 'List',
			value: 'list'
		},
        {
			label: 'Add a todo',
			value: 'add'
		},
		{
			label: 'Update a todo',
			value: 'update'
		},
		{
			label: 'Exit',
			value: 'exit'
		}
	];

    return <SelectInput items={items} />;
};

module.exports = Menu;