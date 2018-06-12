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
  @observable grades = [0, 0, 0]

  @computed
  get average() {
    return '?'
  }

  setGrade(grade, index) {
    this.grades[index] = parseInt(grade)
  }
}

const gradesStore = new GradeStore()


@observer
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Noten Rechner</Text>

          <View style={styles.row}>
            <Text>Note 1: </Text>
          </View>

          <View style={styles.row}>
            <Text>Note 2: </Text>
          </View>

          <View style={styles.row}>
            <Text>Note 3: </Text>
          </View>

          <View>
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
    // flexDirection: 'row',
    // alignItems: 'center',
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
})

//             <TextInput style={styles.gradeInput} onChangeText={text => gradesStore.setGrade(text, 2)} value={gradesStore.grades[2]} />

// average() {
//   const sum = this.grades[0] + this.grades[1] + this.grades[2]
//   return sum / 3
// }
