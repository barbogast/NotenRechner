import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text1}>Hallo Welt</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 100,
  },
  text1: {
    fontSize: 16,
    color: 'green',
  }
})
