import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView, Button} from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Hr from "react-native-hr-component";
import * as Font from 'expo-font';


// CourseScreen component is the screen you are navigated to if you click a Course card from the HomeScreen. 
// Takes in a course-object as a props to render the course data correctly.

export default class CourseScreen extends Component {

    state = {
      fontLoaded: false,
    }

    async componentDidMount() {
      await Font.loadAsync({ // loads the font 'oswald' (found in assest-folder) and sets the fontLoaded state to true when finished
        'oswald': require('./../assets/fonts/Oswald.ttf'),
        'lato': require('./../assets/fonts/Lato-Regular.ttf'),
        'lato-bold': require('./../assets/fonts/Lato-Bold.ttf'),  
      });
      this.setState({ fontLoaded: true });
    }
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
          {this.state.fontLoaded ? 
          <ScrollView >
          
              <Text style={styles.headline}> {course.norwegian_name} </Text>
              <Hr 
                text={" " + course.course_code + " "}
                textStyles={{color: "#C0CCD8", fontSize: 16}}
                lineColor={"#C0CCD8"}
              />
              
              <Text style={styles.text}>
                <Text style={{fontFamily: 'lato-bold'}}>
                  Credits: {""}
                  
                </Text>
                {course.credits  + "p" +"\n\n"} 
                <Text style={{fontFamily: 'lato-bold'}}>
                  
                  Taught in: {""}
                </Text>
                {course.taught_in_autumn & course.taught_in_spring? "Fall & Spring \n\n" : course.taught_in_autumn ? "Fall \n\n" : "Spring \n\n"}
                
                <Text style={{fontFamily: 'lato-bold'}}>
                  Content: {""}
                </Text>
                {"\n" + course.content + "\n\n"}
                <Text style={{fontFamily: 'lato-bold'}}>
                  Average difficulty: {""}
                </Text>
                {(this.averageDifficulty()) + "\n\n"}
              </Text>
              


          </ScrollView>: null }
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
      fontFamily: 'oswald',
      margin: 15,
      color: "#FFCE00"
    },
    text: {
      color: "#C0CCD8",
      fontSize: 20,
      margin: 20,
      fontFamily: 'lato'
      

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

