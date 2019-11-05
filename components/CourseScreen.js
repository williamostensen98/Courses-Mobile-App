import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView} from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class CourseScreen extends Component {

    static navigationOptions = {
        header: null  
    };


    render() {
        const course = this.props.navigation.getParam('course')
        return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}> {course.course_code} {course.norwegian_name} </Text>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
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
      padding: 0,
  
    },
    courseText : {
      color: "#FFFFFF"
    }
  });

const AppNavigator = createStackNavigator({
    Home: {
        screen: CourseScreen,
    },
});
  

export default createAppContainer(AppNavigator);


