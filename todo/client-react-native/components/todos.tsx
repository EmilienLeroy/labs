import React, { useEffect, useState } from 'react';
import Todo from './todo';
import { View, Text, TextInput, StyleSheet, useWindowDimensions, TouchableOpacity, ScrollView  } from 'react-native';
import { http } from '../plugins/http';
import { TodoState } from '../composable/TodoComposable';

const Todos = () => {
  const [todos, setTodos] = useState<TodoState[]>([]);
  const [title, setTitle] = useState<string>(''); 
  const style = StyleSheet.create({
    input: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      width: '100%',
    },
    form: {
      position: 'absolute',
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      bottom: 0,
      backgroundColor: '#3CBEA9',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    btn: {
      marginLeft: 10,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: "#845EC2",
      padding: 10
    }
  })

  useEffect(() => {
    (async () => {
      const { data } = await http.get<TodoState[]>('/todo');
      setTodos(data.reverse());
    })()
  },[])

  const onPress = async () => {
    try {
      const { data } = await http.post('/todo', { name: title })
      setTodos([data, ...todos]); 
      setTitle('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <ScrollView style={{ height: useWindowDimensions().height }}>
        { 
          todos.map(todo => {
            return <Todo 
              key={ todo._id }
              _id={ todo._id } 
              name={ todo.name } 
              do={ todo.do } 
            />
          }) 
        }
      </ScrollView>
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