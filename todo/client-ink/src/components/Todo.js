const React = require('react');
const {Text} = require('ink');

const Todo = (props) => {
    return (
        <Text>{ props.todo.title }</Text>
    )
};

module.exports = Todo;