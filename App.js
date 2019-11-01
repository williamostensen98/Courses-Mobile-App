import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {Card, ListItem, ThemeConsumer} from "react-native-elements"
import axios from "axios"
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SearchBar from './components/SearchBar'




const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {

  state = {
    courses: null,
    yOffset: null,
    xOffset: null,
    selectedCard: null,
    isCollapsed: false,
  }
  // ### TEST METHOD ###
  // handlePress = () => {
  //   Alert.alert(
  //     'You pressed a button!',
  //     'This is a secret',
  //     [
  //       {text: 'Jenny YU is a KU', onPress: () => console.log('EN KU')},
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},

  //     ],
  //     {cancelable: false}
  //   )
  // }

  fetchCourses = async (q="") => {
    const courses = await fetch("http://it2810-39.idi.ntnu.no:3001/courses?" + q)
    .then(res => res.json())
    .catch(err => console.log(err))
    // console.log("Type of courses: ", courses.docs)
    this.setState({courses: courses.docs})
    
  }

  handlePress (e) {
    console.log(e.target)
    // this.setState({
    //   selectedCard: e.target
    // })
  }
    

  componentDidMount() {
    this.fetchCourses()
    
  }
  componentDidUpdate() {

  }

  mapCoursesToCard() {
    if (this.state.courses != null) {
      let courseList = this.state.courses.map((course, index) => 
      <TouchableOpacity key={index} onPress={() => console.log("MØØØøøØøø JENnY!")} style={styles.courseContainer}>
        <Card 
          course={course} 
          key={index} 
          title={course.course_code + " - " + course.norwegian_name} 
          style={{color: "#3b3f4b"}}
        />
        </TouchableOpacity>
      )
    return courseList
    }
    return null
    
  }

  

  render() {
    let courseList = this.mapCoursesToCard()
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Courses
        </Text>
        <SearchBar fetchCourses={this.fetchCourses}/>
        <ScrollView>
          {courseList}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#484D5C',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: "#FFCE00"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#3b3f4b",
    width: "100%",
    padding: 0
  }
});
