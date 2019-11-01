import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {Card, ListItem, ThemeConsumer, Divider} from "react-native-elements"
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
    query: '',
    courses: null,
    yOffset: null,
    xOffset: null,
    selectedCard: null,
    isCollapsed: false,
    limit: 10,
    total: 0
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

  fetchCourses = async (q="a") => {
    const courses = await fetch("http://it2810-39.idi.ntnu.no:3001/courses?" + q)
    .then(res => res.json())
    .catch(err => console.log(err))
    // console.log("Type of courses: ", courses.docs)
    this.setState({
      courses: courses.docs, 
      limit: courses.limit,
      total: courses.total,
    })
  }

  setQuery = q => {
    this.setState({
      query: q
    })
  }


  componentDidMount() {
    this.fetchCourses()
  }
  componentDidUpdate() {

  }

  mapCoursesToCard() {
    if (this.state.courses != null) {
      let courseList = this.state.courses.map((course, index) => 
      <TouchableOpacity key={index} onPress={() => console.log("MØØØøøØøø JENnY!")} style={{width: 400}}>
        <Card 
          course={course} 
          key={index} 
          containerStyle={{backgroundColor: "#3b3f4b", 
                           borderRadius: 15, 
                           borderColor: "#3b3f4b"}
                          }
        >
          <Text style={{color: "#FFCE00", fontSize: 20, fontWeight: "bold"}}>
            {course.course_code + " " + course.norwegian_name}
          </Text>
        </Card>
        </TouchableOpacity>
      )
    return courseList
    }
    return null
    
  }

  handleScroll = nativeEvent => {
    if (this.isCloseToBottom(nativeEvent) && (this.state.limit < this.state.total)) {       
      this.setState(
        prevState => ({limit: prevState.limit+=10}))
        this.fetchCourses(this.state.query+'&limit='+this.state.limit)
    }
  }
  


  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {   
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  }
  

  render() {
    let courseList = this.mapCoursesToCard()
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
        </Text>
        <SearchBar fetchCourses={this.fetchCourses} setQuery={this.setQuery}/>
        <ScrollView 
          scrollEventThrottle={16}
          onScroll={({nativeEvent}) => this.handleScroll(nativeEvent)}
          styles={{alignItems: 'center'}}
        >
            {this.mapCoursesToCard()}
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
    flex: 1,
    width: "100%",
    padding: 0,

  },
  courseText : {
    color: "#FFFFFF"
  }
});
