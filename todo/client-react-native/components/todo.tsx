import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { http } from '../plugins/http';

export interface TodoState {
  _id: number, 
  name: string, 
  do: boolean,
}

const Todo = (props: TodoState) => {
  const [isCheck, setCheck] = useState(props.do);
  const toggleSwitch = async () => {
    try {
      await http.put(`/todo/${props._id}`, { ...props, do: !isCheck });
      setCheck(!isCheck);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flexDirection: 'row', margin: 15 }}>
      <Switch onValueChange={ toggleSwitch } value={ isCheck }  />
      <Text style={{ marginHorizontal: 20 }}>{ props.name }</Text>
    </View>
  )
}

export default Todo;
