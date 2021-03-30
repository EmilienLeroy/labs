import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { http } from '../plugins/http';
import { todoComposable, TodoState } from '../composable/TodoComposable';

const Todo = (props: TodoState) => {
  const { getCheck } = todoComposable();
  const [isCheck, setCheck] = getCheck(props);
  const toggleSwitch = async () => {
    try {
      await http.put(`/todo/${props._id}`, { ...props, do: !isCheck });
      setCheck(!isCheck);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ 
      flexDirection: 'row', 
      marginHorizontal: 15,
      marginVertical: 5,
      padding: 15,
      elevation: 15,
      shadowColor: "#0000004a",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      borderRadius: 10
    }}>
      <Switch 
        onValueChange={ toggleSwitch } 
        value={ isCheck }
        trackColor={{ false: "#D0D0D0", true: "rgba(132, 94, 194, 0.3)" }}
        thumbColor={isCheck ? "#794BC4" : "#767577"} 
        activeThumbColor="#794BC4"
      />
      <Text style={{ marginHorizontal: 20 }}>{ props.name }</Text>
    </View>
  )
}

export default Todo;
