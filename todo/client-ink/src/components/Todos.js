const React = require('react');
const http = require('../config/http');
const importJsx = require('import-jsx');
const {Box} = require('ink');
const Todo = importJsx('./Todo');

const Todos = () => {
    const [todos, setTodos] = React.useState([]);
    
    React.useEffect(() => {
        (async () => {
            const { data } = await http.get('/todos');
            setTodos(data);
        })()
    }, [])

    return (
        <Box flexDirection="column">
            {
                todos.map((todo) => <Todo key={ todo.id } todo={ todo }></Todo>)
            }
        </Box>
    )
};

module.exports = Todos;
