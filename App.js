import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

class GradeStore {
  @observable grades = ['']

  @computed
  get average() {
    if(this.hasInvalidGrades()){
      return ''
    }

    let sum = 0
    this.grades.forEach(grade => {
      sum = sum + grade
    })

    return sum / this.grades.length
  }

  hasInvalidGrades() {
    return this.grades.find(grade => isNaN(parseInt(grade))) !== undefined
  }

  addGrade() {
    this.grades.push('')
  }

  setGrade(grade, index) {
    this.grades[index] = parseInt(grade)
  }
}

const gradesStore = new GradeStore()

const Button = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

@observer
export default class App extends React.Component {
  renderGradeRow(grade, index) {
    return (
      <View style={styles.row} key={'graderow' + index}>
        <Text>Note {index + 1}:</Text>
        <TextInput
          style={styles.gradeInput}
          onChangeText={text => gradesStore.setGrade(text, index)}
          value={String(gradesStore.grades[index])}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Noten Rechner</Text>

          {gradesStore.grades.map(this.renderGradeRow)}

          <Button title="Note hinzufügen" onPress={() => gradesStore.addGrade()} />

          <View style={styles.average}>
            <Text>Durchschnitt: {gradesStore.average}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '80%',
    paddingTop: 100,
  },
  innerContainer: {
    alignItems: 'flex-start',
  },
  heading: {
    marginVertical: 10,
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeInput: {
    width: 30,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 40,
    marginRight: 10,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    borderWidth: 1,
    padding: 3,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    marginVertical: 5,
  },
  average: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    marginTop: 20,
  },
  smiley: {
    marginLeft: 10,
    width: 25,
    height: 25,
  },
})
