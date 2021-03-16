import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';

export interface TodoState {
  id: number, 
  title: string, 
  check: boolean,
}

const Todo = (props: TodoState) => {
  const [isCheck, setCheck] = useState(props.check);
  const toggleSwitch = () => setCheck(previousState => !previousState);

  return (
    <View style={{ flexDirection: 'row', margin: 15 }}>
      <Switch onValueChange={ toggleSwitch } value={ isCheck }  />
      <Text style={{ marginHorizontal: 20 }}>{ props.title }</Text>
    </View>
  )
}

export default Todo;
