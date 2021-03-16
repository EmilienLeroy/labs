import React from 'react';
import Todo from './todo';
import { View, Text, TextInput, StyleSheet, useWindowDimensions, TouchableOpacity  } from 'react-native';

const Todos = () => {
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
    console.log('ok')
  }

  return (
    <View style={ style.todos }>
      <View style={ style.content }>
        <Todo id={ 1 } title={ 'Le todo' } check={ false }></Todo>
      </View>
      <View style={ style.form }>
        <TextInput style={ style.input } placeholder='What I need to do ?'></TextInput>
        <TouchableOpacity style={ style.btn } onPress={ onPress } >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Todos;