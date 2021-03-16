import React, { useState } from 'react';
import Todo, { TodoState } from './todo';
import { View, Text, TextInput, StyleSheet, useWindowDimensions, TouchableOpacity  } from 'react-native';

const Todos = () => {
  const [todos, setTodos] = useState<TodoState[]>([]);
  const [title, setTitle] = useState<string>('');
  const fullWidth = useWindowDimensions().width;
  const style = StyleSheet.create({
    todos: {
      flex: 1,
      width: fullWidth
    },
    content: {
      flex: 1,
    },
    input: {
      backgroundColor: 'rgba(132, 94, 194, 0.3)',
      borderRadius: 10,
      padding: 10,
      width: '100%'
    },
    form: {
      width: fullWidth, 
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    btn: {
      marginLeft: 10,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: "#845EC2",
      padding: 10
    }
  })

  const onPress = () => {
    setTodos(() => [
      ...todos, 
      { 
        id: todos.length, 
        title: title, 
        check: false 
      }
    ]);
  }

  return (
    <View style={ style.todos }>
      <View style={ style.content }>
        { 
          todos.map(todo => {
            return <Todo 
              key={ todo.id }
              id={ todo.id } 
              title={ todo.title } 
              check={ todo.check } 
            />
          }) 
        }
      </View>
      <View style={ style.form }>
        <TextInput 
          onChangeText={ setTitle }
          value={ title } 
          style={ style.input } 
          placeholder='What I need to do ?' 
        />
        <TouchableOpacity style={ style.btn } onPress={ onPress } >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Todos;