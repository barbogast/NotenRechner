import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import smiley1 from './assets/smileys_1.png'
import smiley2 from './assets/smileys_2.png'
import smiley3 from './assets/smileys_3.png'
import smiley4 from './assets/smileys_4.png'
import smiley5 from './assets/smileys_5.png'
import smiley6 from './assets/smileys_6.png'

const smileys = {
  1: smiley1,
  2: smiley2,
  3: smiley3,
  4: smiley4,
  5: smiley5,
  6: smiley6,
}

class GradeStore {
  @observable grades = ['']

  @computed
  get average() {
    const validGrades = this.grades.filter(grade => !isNaN(parseInt(grade)))
    if (validGrades.length === 0) {
      return ''
    }
    const sum = validGrades.reduce((prev, curr) => prev + parseInt(curr), 0)
    return sum / validGrades.length
  }

  addGrade() {
    this.grades.push('')
  }

  removeGrade(index) {
    this.grades.splice(index, 1)
  }

  setGrade(grade, index) {
    this.grades[index] = grade
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
          value={gradesStore.grades[index]}
        />
        <Button title="X" onPress={() => gradesStore.removeGrade(index)} />
        <Image source={smileys[grade]} style={styles.smiley} />
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
