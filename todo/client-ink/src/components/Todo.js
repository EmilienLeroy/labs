const React = require('react');
const {Text} = require('ink');

const Todo = (props) => {
    return (
        <Text>{ props.todo.name }</Text>
    )
};

module.exports = Todo;