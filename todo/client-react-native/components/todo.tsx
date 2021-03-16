import React from 'react';
import { View, Text, Switch } from 'react-native';

const Todo = (props: { id: number, title: string, check: boolean }) => {
  return (
    <View>
      <Switch></Switch>
      <Text>{ props.title }</Text>
    </View>
  )
}

export default Todo;
