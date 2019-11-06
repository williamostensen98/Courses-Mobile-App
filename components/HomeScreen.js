import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Header} from 'react-native';
import {Card} from "react-native-elements"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchBar from './SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HomeScreen extends Component {
   
    static navigationOptions = {
      
      };

    state = {
        query: '',
        courses: null,
        limit: 10,
        total: 0,
        hasSearched: false,
      }
    
      fetchCourses = async (q="") => {
        const courses = await fetch("http://it2810-39.idi.ntnu.no:3001/courses?" + q)
        .then(res => res.json())
        .catch(err => console.log(err))
        // console.log("Type of courses: ", courses.docs)
        this.setState({
          courses: courses.docs, 
          limit: courses.limit,
          total: courses.total,
          hasSearched: true
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
    
      mapCoursesToCard() {
        if (this.state.courses != null) {
          let courseList = this.state.courses.map((course, index) => 
          <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate("Course", {
              course: course
          })} style={{width: "100%"}}>
            <Card 
              course={course} 
              key={index} 
              style={{width: "80%"}}
              containerStyle={{backgroundColor: "#3b3f4b", borderRadius: 15, borderColor: "#3b3f4b"}}
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
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: "row"}}>
          <Icon name="bar-chart" size={35} color={"#FFCE00"}/> 
          <Text h1 style={styles.header}>
          {""}Courses
          </Text>
          </View>
          <View style={{flexDirection: "row"}}>
            <Icon name="search" size={14} color={"#C0CCD8"} style={{top: 5}}/> 
            <Text style={styles.searchText}>
               SEARCH FOR COURSE NAMES OR CODES...
            </Text>
          </View>
           <SearchBar style={styles.searchbar} fetchCourses={this.fetchCourses} setQuery={this.setQuery}/>
        </View>
        <ScrollView 
          scrollEventThrottle={16} 
          onScroll={({nativeEvent}) => this.handleScroll(nativeEvent)} 
          contentContainerStyle={{alignItems: 'center', justifyContent: "space-between"}} 
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
    header: {
      fontSize: 30,
      textAlign: 'center',
      color: "#FFCE00",
      fontStyle: "italic"
    },
    searchText: {
      color: "#C0CCD8",
      fontSize: 14,
      margin: 5
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
    },
    searchContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%"
    },
    searchbar: {
      
    }
  });