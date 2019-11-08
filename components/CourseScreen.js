import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView, Button} from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Hr from "react-native-hr-component";


// CourseScreen component is the screen you are navigated to if you click a Course card from the HomeScreen. 
// Takes in a course-object as a props to render the course data correctly.

export default class CourseScreen extends Component {

// Calculates average difficulty for a course if there are any ratings. Otherwise returns no reviews yet to the screen.
    averageDifficulty() {
      const course = this.props.navigation.getParam('course')
      let length = course.difficulty.length;
      if (length > 0) {
        
        let total = course.difficulty.reduce((total, num) => total + num, 0)
        return (total/length).toFixed(2) + "/5"
      }
      return "No reviews yet"
      
    }


    render() {
        const course = this.props.navigation.getParam('course')
        return(
          <View style={styles.container}>
          <ScrollView >
              <Text style={styles.headline}> {course.norwegian_name} </Text>
              <Hr 
                text={" " + course.course_code + " "}
                textStyles={{color: "#C0CCD8", fontSize: 16}}
                lineColor={"#C0CCD8"}
              />
              <Text style={styles.text}>
                <Text style={{fontWeight: "bold"}}>
                  Credits: {""}
                </Text>
                {course.credits +"\n"} 
                <Text style={{fontWeight: "bold"}}>
                  Taught in: {""}
                </Text>
                {course.taught_in_autumn & course.taught_in_spring? "Fall & Spring \n" : course.taught_in_autumn ? "Fall \n" : "Spring \n"}
                
                <Text style={{fontWeight: "bold"}}>
                  Content: {""}
                </Text>
                {course.content + "\n"}
                <Text style={{fontWeight: "bold"}}>
                  Average difficulty: {""}
                </Text>
                {(this.averageDifficulty()) + "\n"}
              </Text>


          </ScrollView>
        </View>
        )
    }
}

// CSS for all components in this file

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3b3f4b',
      flexGrow: 1,
    },
    headline: {
      fontSize: 30,
      textAlign: 'center',
      fontWeight: "bold",
      margin: 15,
      color: "#FFCE00"
    },
    text: {
      color: "#C0CCD8",
      fontSize: 20,
      margin: 20

    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    card: {
      backgroundColor: "#3b3f4b",
      flex: 1,
      padding: 0,
  
    },
    courseText : {
      color: "#FFFFFF"
    }
  });

