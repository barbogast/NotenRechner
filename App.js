import React from 'react'
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

const Button = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default class App extends React.Component {
  constructor() {
    super()
    this.addGrade = this.addGrade.bind(this)
    this.calculate = this.calculate.bind(this)
    this.renderGradeRow = this.renderGradeRow.bind(this)
    this.setGrade = this.setGrade.bind(this)
    this.removeGrade = this.removeGrade.bind(this)

    this.state = {
      grades: [''],
      average: '',
    }
  }

  addGrade() {
    this.setState({
      ...this.state,
      grades: this.state.grades.concat(''),
    })
  }

  removeGrade(index) {
    this.setState({
      ...this.state,
      grades: this.state.grades.filter((grade, i) => i !== index),
    })
  }

  setGrade(grade, index) {
    this.setState({
      ...this.state,
      grades: this.state.grades.map((g, i) => (i === index ? grade : g)),
    })
  }

  calculate() {
    const sum = this.state.grades.reduce((prev, curr) => prev + parseInt(curr), 0)
    this.setState({
      ...this.state,
      average: sum / this.state.grades.length,
    })
  }

  renderGradeRow(grade, index) {
    return (
      <View style={styles.row} key={'graderow' + index}>
        <Text>Note {index + 1}:</Text>
        <TextInput
          style={styles.gradeInput}
          onChangeText={text => this.setGrade(text, index)}
          value={this.state.grades[index]}
        />
        <Button title="X" onPress={() => this.removeGrade(index)} />
        <Image source={smileys[grade]} style={styles.smiley} />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Noten Rechner</Text>

          {this.state.grades.map(this.renderGradeRow)}

          <Button title="Note hinzufügen" onPress={this.addGrade} />

          <View style={styles.average}>
            <Button title="Durchschnitt berechnen" onPress={this.calculate} />
            <Text>Durchschnitt: {this.state.average}</Text>
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
