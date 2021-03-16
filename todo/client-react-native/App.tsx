import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Todos } from './components';

export default function App() {
  return (
    <View style={styles.container}>
      <Todos />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
